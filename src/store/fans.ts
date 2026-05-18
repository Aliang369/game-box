import { defineStore } from 'pinia'
import { getFansList } from '@/api/social'

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

  // 添加粉丝
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

  /**
   * 从后端加载粉丝列表
   */
  async function fetchFansList() {
    try {
      const res = await getFansList()
      if (res && Array.isArray(res)) {
        fansList.value = res.map(item => ({
          id: String(item.userId),
          nickname: item.nickname,
          avatar: item.avatar,
          description: item.bio,
          followedBack: item.isFollowed,
        }))
      }
    }
    catch (error) {
      console.warn('[FansStore] 加载粉丝列表失败，使用本地数据', error)
    }
  }

  return {
    fansList,
    fansCount,
    isFan,
    toggleFollowBack,
    addFan,
    removeFan,
    fetchFansList,
  }
}, {
  persist: true,
})
