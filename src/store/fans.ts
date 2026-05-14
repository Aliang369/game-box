import { defineStore } from 'pinia'

export interface FanUser {
  id: string
  nickname: string
  avatar: string
  description?: string
  followedBack: boolean // 是否已回关
}

export const useFansStore = defineStore('fans', () => {
  // 粉丝列表
  const fansList = ref<FanUser[]>([])

  // 粉丝数量
  const fansCount = computed(() => fansList.value.length)

  // 判断是否是粉丝
  function isFan(userId: string): boolean {
    return fansList.value.some(user => user.id === userId)
  }

  // 切换回关状态
  function toggleFollowBack(userId: string) {
    const fan = fansList.value.find(u => u.id === userId)
    if (fan) {
      fan.followedBack = !fan.followedBack
    }
  }

  // 添加粉丝（模拟）
  function addFan(user: FanUser) {
    if (!fansList.value.some(u => u.id === user.id)) {
      fansList.value.push(user)
    }
  }

  // 移除粉丝
  function removeFan(userId: string) {
    const index = fansList.value.findIndex(u => u.id === userId)
    if (index > -1) {
      fansList.value.splice(index, 1)
    }
  }

  return {
    fansList,
    fansCount,
    isFan,
    toggleFollowBack,
    addFan,
    removeFan,
  }
}, {
  persist: true,
})
