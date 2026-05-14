import { defineStore } from 'pinia'

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
      return false // 取消关注
    }
    else {
      followList.value.push(user)
      return true // 添加关注
    }
  }

  // 取消关注
  function unfollow(userId: string) {
    const index = followList.value.findIndex(u => u.id === userId)
    if (index > -1) {
      followList.value.splice(index, 1)
    }
  }

  return {
    followList,
    followCount,
    isFollowed,
    toggleFollow,
    unfollow,
  }
}, {
  persist: true,
})
