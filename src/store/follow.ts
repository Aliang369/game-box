import { defineStore } from 'pinia'
import { followUser, getFollowList, unfollowUser } from '@/api/social'

export interface FollowUser {
  id: string
  nickname: string
  avatar: string
  description?: string
}

export const useFollowStore = defineStore('follow', () => {
  // 关注的用户列表
  const followList = ref<FollowUser[]>([])

  // 关注数量
  const followCount = computed(() => followList.value.length)

  // 判断是否已关注
  function isFollowed(userId: string): boolean {
    return followList.value.some(user => user.id === userId)
  }

  // 切换关注状态
  function toggleFollow(user: FollowUser): boolean {
    const index = followList.value.findIndex(u => u.id === user.id)
    if (index > -1) {
      followList.value.splice(index, 1)
      // 同步到后端
      unfollowUser(Number(user.id)).catch(() => {})
      return false // 取消关注
    }
    else {
      followList.value.push(user)
      // 同步到后端
      followUser(Number(user.id)).catch(() => {})
      return true // 添加关注
    }
  }

  // 取消关注
  function unfollow(userId: string) {
    const index = followList.value.findIndex(u => u.id === userId)
    if (index > -1) {
      followList.value.splice(index, 1)
      unfollowUser(Number(userId)).catch(() => {})
    }
  }

  /**
   * 从后端加载关注列表
   */
  async function fetchFollowList() {
    try {
      const res = await getFollowList()
      if (res && Array.isArray(res)) {
        followList.value = res.map(item => ({
          id: String(item.userId),
          nickname: item.nickname,
          avatar: item.avatar,
          description: item.bio,
        }))
      }
    }
    catch (error) {
      console.warn('[FollowStore] 加载关注列表失败，使用本地数据', error)
    }
  }

  return {
    followList,
    followCount,
    isFollowed,
    toggleFollow,
    unfollow,
    fetchFollowList,
  }
}, {
  persist: true,
})
