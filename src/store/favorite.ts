import { defineStore } from 'pinia'

export const useFavoriteStore = defineStore('favorite', () => {
  // 收藏的游戏ID列表
  const favoriteIds = ref<string[]>([])

  // 判断是否已收藏
  function isFavorite(gameid: string): boolean {
    return favoriteIds.value.includes(gameid)
  }

  // 切换收藏状态，返回操作结果
  function toggleFavorite(gameid: string): boolean {
    const index = favoriteIds.value.indexOf(gameid)
    if (index > -1) {
      favoriteIds.value.splice(index, 1)
      return false // 取消收藏
    }
    else {
      favoriteIds.value.push(gameid)
      return true // 添加收藏
    }
  }

  // 收藏数量
  const favoriteCount = computed(() => favoriteIds.value.length)

  return {
    favoriteIds,
    isFavorite,
    toggleFavorite,
    favoriteCount,
  }
}, {
  persist: true,
})
