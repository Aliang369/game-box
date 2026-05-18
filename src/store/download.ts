import { defineStore } from 'pinia'
import { useGameStore } from './game'

/** 下载任务状态 */
export type DownloadStatus = 'waiting' | 'downloading' | 'paused' | 'completed' | 'failed'

/** 下载任务 */
export interface DownloadTask {
  /** 游戏ID */
  gameid: string
  /** 游戏名称 */
  gameName: string
  /** 游戏图标 */
  gameIcon: string
  /** 下载链接 */
  url: string
  /** 下载状态 */
  status: DownloadStatus
  /** 下载进度 0-100 */
  progress: number
  /** 已下载大小(bytes) */
  downloadedSize: number
  /** 文件总大小(bytes) */
  totalSize: number
  /** 本地保存路径(APP端) */
  savedPath: string
  /** 创建时间 */
  createdAt: number
}

export const useDownloadStore = defineStore('download', () => {
  // 下载任务列表
  const tasks = ref<DownloadTask[]>([])

  // 当前活跃的下载任务对象 (uni.downloadFile 返回的 task，不持久化)
  const activeTaskMap = new Map<string, UniApp.DownloadTask>()

  // 按状态分组的任务
  const downloadingTasks = computed(() =>
    tasks.value.filter(t => t.status === 'downloading' || t.status === 'waiting' || t.status === 'paused'),
  )

  const completedTasks = computed(() =>
    tasks.value.filter(t => t.status === 'completed'),
  )

  const failedTasks = computed(() =>
    tasks.value.filter(t => t.status === 'failed'),
  )

  /** 查找任务 */
  function findTask(gameid: string): DownloadTask | undefined {
    return tasks.value.find(t => t.gameid === gameid)
  }

  /** 获取游戏的下载状态 */
  function getGameDownloadStatus(gameid: string): DownloadStatus | null {
    const task = findTask(gameid)
    return task?.status ?? null
  }

  /** 开始下载游戏 */
  function startDownload(gameid: string) {
    const gameStore = useGameStore()
    const game = gameStore.findGame(gameid)
    if (!game) {
      uni.showToast({ title: '游戏信息不存在', icon: 'none' })
      return
    }

    if (!game.gamedownload) {
      uni.showToast({ title: '暂无下载地址', icon: 'none' })
      return
    }

    // 检查是否已有任务
    const existingTask = findTask(gameid)
    if (existingTask) {
      if (existingTask.status === 'completed') {
        uni.showToast({ title: '已下载完成', icon: 'none' })
        return
      }
      if (existingTask.status === 'downloading') {
        uni.showToast({ title: '正在下载中', icon: 'none' })
        return
      }
      // 失败或暂停的任务，重新下载
      existingTask.status = 'waiting'
      existingTask.progress = 0
      existingTask.downloadedSize = 0
      existingTask.savedPath = ''
      _executeDownload(existingTask)
      return
    }

    // 创建新任务
    const newTask: DownloadTask = {
      gameid,
      gameName: game.gameName,
      gameIcon: game.gameIcon,
      url: game.gamedownload,
      status: 'waiting',
      progress: 0,
      downloadedSize: 0,
      totalSize: 0,
      savedPath: '',
      createdAt: Date.now(),
    }
    tasks.value.unshift(newTask)
    _executeDownload(newTask)
  }

  /** 执行下载（平台适配） */
  function _executeDownload(task: DownloadTask) {
    // #ifdef APP-PLUS
    _downloadForApp(task)
    // #endif

    // #ifdef MP-WEIXIN
    _downloadForMiniProgram(task)
    // #endif

    // #ifdef H5
    _downloadForH5(task)
    // #endif

    // #ifndef APP-PLUS || MP-WEIXIN || H5
    task.status = 'failed'
    uni.showToast({ title: '当前平台暂不支持下载', icon: 'none' })
    // #endif
  }

  /** APP端下载 - 使用 uni.downloadFile */
  function _downloadForApp(task: DownloadTask) {
    task.status = 'downloading'

    const downloadTask = uni.downloadFile({
      url: task.url,
      success: (res) => {
        if (res.statusCode === 200) {
          task.status = 'completed'
          task.progress = 100
          task.savedPath = res.tempFilePath
          uni.showToast({ title: `${task.gameName} 下载完成`, icon: 'success' })
        }
        else {
          task.status = 'failed'
          uni.showToast({ title: '下载失败', icon: 'none' })
        }
        activeTaskMap.delete(task.gameid)
      },
      fail: () => {
        task.status = 'failed'
        uni.showToast({ title: '下载失败，请重试', icon: 'none' })
        activeTaskMap.delete(task.gameid)
      },
    })

    // 监听下载进度
    downloadTask.onProgressUpdate((res) => {
      task.progress = res.progress
      task.downloadedSize = res.totalBytesWritten
      task.totalSize = res.totalBytesExpectedToWrite
    })

    activeTaskMap.set(task.gameid, downloadTask)
  }

  /** 微信小程序端 - 复制链接引导用户到浏览器下载 */
  function _downloadForMiniProgram(task: DownloadTask) {
    uni.setClipboardData({
      data: task.url,
      success: () => {
        task.status = 'completed'
        task.progress = 100
        uni.showToast({
          title: '下载链接已复制，请在浏览器中粘贴下载',
          icon: 'none',
          duration: 3000,
        })
      },
      fail: () => {
        task.status = 'failed'
        uni.showToast({ title: '复制失败，请重试', icon: 'none' })
      },
    })
  }

  /** H5端 - 直接打开下载链接 */
  function _downloadForH5(task: DownloadTask) {
    try {
      window.open(task.url, '_blank')
      task.status = 'completed'
      task.progress = 100
    }
    catch {
      task.status = 'failed'
      uni.showToast({ title: '下载失败', icon: 'none' })
    }
  }

  /** 取消下载(仅APP端有效，abort后无法续传，需重新下载) */
  function pauseDownload(gameid: string) {
    const task = findTask(gameid)
    if (!task || task.status !== 'downloading') return

    const activeTask = activeTaskMap.get(gameid)
    if (activeTask) {
      activeTask.abort()
      activeTaskMap.delete(gameid)
    }
    task.status = 'paused'
  }

  /** 重试下载 */
  function retryDownload(gameid: string) {
    const task = findTask(gameid)
    if (!task) return
    task.status = 'waiting'
    task.progress = 0
    task.downloadedSize = 0
    _executeDownload(task)
  }

  /** 删除下载任务 */
  function removeTask(gameid: string) {
    // 如果正在下载，先中止
    const activeTask = activeTaskMap.get(gameid)
    if (activeTask) {
      activeTask.abort()
      activeTaskMap.delete(gameid)
    }
    const index = tasks.value.findIndex(t => t.gameid === gameid)
    if (index > -1) {
      tasks.value.splice(index, 1)
    }
  }

  /** 清除所有已完成的任务 */
  function clearCompleted() {
    tasks.value = tasks.value.filter(t => t.status !== 'completed')
  }

  /** 安装APK(仅Android) */
  function installApk(gameid: string) {
    const task = findTask(gameid)
    if (!task || task.status !== 'completed' || !task.savedPath) return

    // #ifdef APP-PLUS
    plus.runtime.install(task.savedPath, {}, () => {
      uni.showToast({ title: '安装启动成功', icon: 'success' })
    }, (err: any) => {
      uni.showToast({ title: `安装失败: ${err.message}`, icon: 'none' })
    })
    // #endif
  }

  return {
    tasks,
    downloadingTasks,
    completedTasks,
    failedTasks,
    findTask,
    getGameDownloadStatus,
    startDownload,
    pauseDownload,
    retryDownload,
    removeTask,
    clearCompleted,
    installApk,
  }
}, {
  persist: {
    pick: ['tasks'],
  },
})
