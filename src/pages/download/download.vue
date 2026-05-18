<script lang="ts" setup>
import { useDownloadStore } from '@/store/download'
import type { DownloadTask } from '@/store/download'

definePage({
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '下载中心',
  },
})

const downloadStore = useDownloadStore()

function leftClick() {
  const pages = getCurrentPages()
  if (pages.length > 1) {
    uni.navigateBack({ delta: 1 })
  }
}

/** 格式化文件大小 */
function formatSize(bytes: number): string {
  if (bytes <= 0) return '0B'
  const units = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return `${(bytes / 1024 ** i).toFixed(1)}${units[i]}`
}

/** 获取状态文本 */
function getStatusText(task: DownloadTask): string {
  switch (task.status) {
    case 'waiting': return '等待中'
    case 'downloading': return `${task.progress}%`
    case 'paused': return '已暂停'
    case 'completed': return '已完成'
    case 'failed': return '下载失败'
    default: return ''
  }
}

/** 操作按钮点击 */
function handleAction(task: DownloadTask) {
  switch (task.status) {
    case 'downloading':
      downloadStore.pauseDownload(task.gameid)
      break
    case 'paused':
    case 'failed':
      downloadStore.retryDownload(task.gameid)
      break
    case 'completed':
      downloadStore.installApk(task.gameid)
      break
  }
}

/** 获取操作按钮文本 */
function getActionText(task: DownloadTask): string {
  switch (task.status) {
    case 'waiting': return '等待'
    case 'downloading': return '取消'
    case 'paused': return '重下'
    case 'completed': return '安装'
    case 'failed': return '重试'
    default: return ''
  }
}

// 删除确认弹窗
const deletePopupRef = ref()
const pendingDeleteGameid = ref('')
const pendingDeleteName = ref('')

function handleDelete(task: DownloadTask) {
  pendingDeleteGameid.value = task.gameid
  pendingDeleteName.value = task.gameName
  deletePopupRef.value?.open()
}

function confirmDelete() {
  if (pendingDeleteGameid.value) {
    downloadStore.removeTask(pendingDeleteGameid.value)
    pendingDeleteGameid.value = ''
    pendingDeleteName.value = ''
  }
}

// 清除已完成确认弹窗
const clearPopupRef = ref()

function handleClearCompleted() {
  if (downloadStore.completedTasks.length === 0) return
  clearPopupRef.value?.open()
}

function confirmClear() {
  downloadStore.clearCompleted()
}

const hasAnyTask = computed(() => downloadStore.tasks.length > 0)
</script>

<template>
  <view>
    <!-- 导航栏 -->
    <view
      class="fixed top-0 left-0 w-full z-2 h-90px flex items-center"
      style="background: linear-gradient(180deg, #E5F9FF 0%, #F7F6FB 100%)"
    >
      <view class="flex flex-row w-full h-25px pt-20px text-[#272E3B] text-18px justify-between mx-15px">
        <view @click="leftClick">
          <image src="/static/gamedetail/back_icon.png" mode="aspectFit" class="w-25px h-25px" />
        </view>
        <view>下载中心</view>
        <view class="w-25px h-25px flex items-center justify-center" @click="handleClearCompleted">
          <text v-if="downloadStore.completedTasks.length > 0" class="text-12px text-[#12cdb0]">清除</text>
          <view v-else class="w-25px" />
        </view>
      </view>
    </view>

    <view class="pt-100px px-15px">
      <!-- 空状态 -->
      <view v-if="!hasAnyTask" class="text-center text-14px text-[#999] mt-50px">
        暂无下载记录
      </view>

      <!-- 下载中/等待中/暂停 -->
      <view v-if="downloadStore.downloadingTasks.length > 0" class="mb-20px">
        <view class="text-16px font-600 text-[#272E3B] mb-10px">下载中</view>
        <view
          v-for="task in downloadStore.downloadingTasks"
          :key="task.gameid"
          class="flex items-center gap-10px py-12px border-b border-[#f0f0f0]"
        >
          <!-- 游戏图标 -->
          <image :src="task.gameIcon" mode="aspectFill" class="w-50px h-50px rounded-10px flex-shrink-0" />

          <!-- 信息区 -->
          <view class="flex-1 min-w-0">
            <view class="text-14px font-500 truncate leading-20px">{{ task.gameName }}</view>
            <!-- 进度条 -->
            <view class="mt-6px h-4px bg-[#f0f0f0] rounded-2px overflow-hidden">
              <view
                class="h-full rounded-2px transition-all duration-300"
                style="background: linear-gradient(95deg, #2bc18a, #5ad88c)"
                :style="{ width: `${task.progress}%` }"
              />
            </view>
            <view class="flex justify-between mt-4px">
              <text class="text-11px text-[#999]">{{ getStatusText(task) }}</text>
              <text v-if="task.totalSize > 0" class="text-11px text-[#999]">
                {{ formatSize(task.downloadedSize) }}/{{ formatSize(task.totalSize) }}
              </text>
            </view>
          </view>

          <!-- 操作按钮 -->
          <view class="flex items-center gap-8px flex-shrink-0">
            <view
              class="w-56px h-28px rounded-14px flex justify-center items-center text-12px text-white"
              style="background: linear-gradient(95deg, #2bc18a, #5ad88c)"
              @click="handleAction(task)"
            >
              {{ getActionText(task) }}
            </view>
            <view
              class="w-28px h-28px rounded-full flex justify-center items-center bg-[#f5f5f5]"
              @click="handleDelete(task)"
            >
              <text class="text-14px text-[#999]">×</text>
            </view>
          </view>
        </view>
      </view>

      <!-- 已完成 -->
      <view v-if="downloadStore.completedTasks.length > 0" class="mb-20px">
        <view class="text-16px font-600 text-[#272E3B] mb-10px">已完成</view>
        <view
          v-for="task in downloadStore.completedTasks"
          :key="task.gameid"
          class="flex items-center gap-10px py-12px border-b border-[#f0f0f0]"
        >
          <image :src="task.gameIcon" mode="aspectFill" class="w-50px h-50px rounded-10px flex-shrink-0" />
          <view class="flex-1 min-w-0">
            <view class="text-14px font-500 truncate leading-20px">{{ task.gameName }}</view>
            <text class="text-11px text-[#12cdb0] mt-4px">下载完成</text>
          </view>
          <view class="flex items-center gap-8px flex-shrink-0">
            <view
              class="w-56px h-28px rounded-14px flex justify-center items-center text-12px text-white"
              style="background: linear-gradient(95deg, #2bc18a, #5ad88c)"
              @click="handleAction(task)"
            >
              安装
            </view>
            <view
              class="w-28px h-28px rounded-full flex justify-center items-center bg-[#f5f5f5]"
              @click="handleDelete(task)"
            >
              <text class="text-14px text-[#999]">×</text>
            </view>
          </view>
        </view>
      </view>

      <!-- 下载失败 -->
      <view v-if="downloadStore.failedTasks.length > 0" class="mb-20px">
        <view class="text-16px font-600 text-[#272E3B] mb-10px">下载失败</view>
        <view
          v-for="task in downloadStore.failedTasks"
          :key="task.gameid"
          class="flex items-center gap-10px py-12px border-b border-[#f0f0f0]"
        >
          <image :src="task.gameIcon" mode="aspectFill" class="w-50px h-50px rounded-10px flex-shrink-0" />
          <view class="flex-1 min-w-0">
            <view class="text-14px font-500 truncate leading-20px">{{ task.gameName }}</view>
            <text class="text-11px text-[#ff6b6b] mt-4px">下载失败</text>
          </view>
          <view class="flex items-center gap-8px flex-shrink-0">
            <view
              class="w-56px h-28px rounded-14px flex justify-center items-center text-12px text-white bg-[#ff6b6b]"
              @click="handleAction(task)"
            >
              重试
            </view>
            <view
              class="w-28px h-28px rounded-full flex justify-center items-center bg-[#f5f5f5]"
              @click="handleDelete(task)"
            >
              <text class="text-14px text-[#999]">×</text>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 删除确认弹窗 -->
    <ConfirmPopup
      ref="deletePopupRef"
      title="删除下载"
      :content="`确定删除「${pendingDeleteName}」的下载记录吗？`"
      confirm-text="删除"
      cancel-text="取消"
      confirm-color="linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)"
      icon-type="warning"
      @confirm="confirmDelete"
    />

    <!-- 清除已完成确认弹窗 -->
    <ConfirmPopup
      ref="clearPopupRef"
      title="清除记录"
      content="确定清除所有已完成的下载记录吗？"
      confirm-text="清除"
      cancel-text="取消"
      confirm-color="linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)"
      icon-type="warning"
      @confirm="confirmClear"
    />
  </view>
</template>
