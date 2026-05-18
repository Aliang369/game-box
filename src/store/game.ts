import { defineStore } from 'pinia'
import type { ExploreItem, Game, RecommendGame, RecommendGameConfig, SearchHotItem, SwiperGameItem, SwiperItem, UserInfo } from '@/types/game.d'
import { getExploreList, getGameList, getRecommendGame, getSearchHotList, getSwiperList } from '@/api/game'
import gameListJson from '@/data/gameList.json'
import swiperListJson from '@/data/swiperList.json'
import recommendGameJson from '@/data/recommendGame.json'
import exploreListJson from '@/data/exploreList.json'
import searchhotListJson from '@/data/searchhotList.json'
import userListJson from '@/data/userList.json'

export const useGameStore = defineStore('game', () => {
  // 游戏列表
  const gameList = ref<Game[]>(gameListJson as Game[])

  // 轮播图列表
  const swiperList = ref<SwiperItem[]>(swiperListJson as unknown as SwiperItem[])

  // 推荐游戏配置
  const recommendGameConfig = ref<RecommendGameConfig[]>(recommendGameJson as RecommendGameConfig[])

  // 探索列表
  const exploreList = ref<ExploreItem[]>(exploreListJson as ExploreItem[])

  // 搜索热门列表
  const searchhotList = ref<SearchHotItem[]>(searchhotListJson as unknown as SearchHotItem[])

  // 用户列表
  const userList = ref<UserInfo[]>(userListJson as UserInfo[])

  // 数据加载状态
  const loading = ref(false)

  // 可见游戏列表
  const visibleGameList = computed<Game[]>(() => {
    return gameList.value.filter(item => item.gameVisibleness === 1)
  })

  // 轮播图关联游戏数据
  const activeSwiperList = computed<SwiperGameItem[]>(() => {
    return swiperList.value
      .filter(item => item.SwiperVisibleness === 1)
      .map(swiperItem => {
        const game = gameList.value.find(g => g.gameid === swiperItem.gameid)
        return {
          ...swiperItem,
          gameName: game?.gameName,
          gameType: game?.gameType,
          gameTags: game?.gameTags,
          gameScoreText: game?.gameScoreText,
        } as SwiperGameItem
      })
  })

  // 推荐游戏（合并后）
  const recommendGame = computed<RecommendGame | null>(() => {
    const config = recommendGameConfig.value[0]
    if (!config?.gameid) return null
    const game = gameList.value.find(item => item.gameid === config.gameid)
    if (!game) return null
    return { ...game, gameInfo: config.gameInfo }
  })

  // 可见探索列表
  const visibleExploreList = computed<ExploreItem[]>(() => {
    return exploreList.value.filter(item => item.exploreVisibleness === 0)
  })

  // 可见搜索热门
  const visibleSearchhotList = computed(() => {
    return searchhotList.value
      .filter(item => item.SearchhotVisibleness === 1)
      .map(item => {
        const game = gameList.value.find(g => g.gameid === item.gameid)
        return { ...item, game }
      })
  })

  // 当前用户
  const currentUser = computed<UserInfo | null>(() => {
    return userList.value[0] || null
  })

  // 根据 id 查找游戏
  function findGame(gameid: string): Game | undefined {
    return gameList.value.find(g => g.gameid === gameid)
  }

  // 增加游戏点击数
  function incrementGameCount(gameid: string) {
    const game = gameList.value.find(g => g.gameid === gameid)
    if (game) {
      game.gameCount++
    }
  }

  /**
   * 从后端API加载所有数据
   * 失败时保留本地JSON数据作为fallback
   */
  async function fetchAllData() {
    loading.value = true
    try {
      const [gamesRes, swiperRes, recommendRes, exploreRes, searchhotRes] = await Promise.allSettled([
        getGameList(),
        getSwiperList(),
        getRecommendGame(),
        getExploreList(),
        getSearchHotList(),
      ])

      if (gamesRes.status === 'fulfilled' && gamesRes.value) {
        gameList.value = gamesRes.value as unknown as Game[]
      }
      if (swiperRes.status === 'fulfilled' && swiperRes.value) {
        swiperList.value = swiperRes.value as unknown as SwiperItem[]
      }
      if (recommendRes.status === 'fulfilled' && recommendRes.value) {
        recommendGameConfig.value = recommendRes.value as unknown as RecommendGameConfig[]
      }
      if (exploreRes.status === 'fulfilled' && exploreRes.value) {
        exploreList.value = exploreRes.value as unknown as ExploreItem[]
      }
      if (searchhotRes.status === 'fulfilled' && searchhotRes.value) {
        searchhotList.value = searchhotRes.value as unknown as SearchHotItem[]
      }
    }
    catch (error) {
      console.warn('[GameStore] 从API加载数据失败，使用本地数据', error)
    }
    finally {
      loading.value = false
    }
  }

  return {
    gameList,
    swiperList,
    exploreList,
    searchhotList,
    userList,
    loading,
    visibleGameList,
    activeSwiperList,
    recommendGame,
    visibleExploreList,
    visibleSearchhotList,
    currentUser,
    findGame,
    incrementGameCount,
    fetchAllData,
  }
})
