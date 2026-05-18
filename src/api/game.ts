import { http } from '@/http/http'

// ============ 类型定义 ============

/** 游戏信息 */
export interface IGameItem {
  gameid: string
  gameIcon: string
  gameName: string
  gameType: string
  gameTags: string[]
  gameScoreText: string
  gameCount: number
  cardList: { image: string }[]
  gameDescription: string
  versionInfo: { versionNumber: string, appRecordCode: string }
  gamedownload: string
  gameVisibleness: number
}

/** 轮播图 */
export interface ISwiperItem {
  swiperId: string
  gameid: string
  swiperImage: string
  SwiperVisibleness: number
}

/** 推荐游戏配置 */
export interface IRecommendGameConfig {
  gameid: string
  gameInfo: string
}

/** 福利活动 */
export interface IExploreItem {
  exploreId: string
  exploreState: number
  exploreDate: string
  exploreImage: string
  exploreVisibleness: number
  linkType: 'game' | 'h5' | 'post'
  linkTarget: string
}

/** 搜索热门 */
export interface ISearchHotItem {
  searchhotId: string
  gameid: string
  SearchhotVisibleness: number
}

/** 分页参数 */
export interface IPageParams {
  page?: number
  pageSize?: number
}

// ============ 接口函数 ============

/**
 * 获取游戏列表
 */
export function getGameList(params?: IPageParams) {
  return http.get<IGameItem[]>('/game/list', params)
}

/**
 * 获取游戏详情
 */
export function getGameDetail(gameid: string) {
  return http.get<IGameItem>(`/game/detail/${gameid}`)
}

/**
 * 获取轮播图列表
 */
export function getSwiperList() {
  return http.get<ISwiperItem[]>('/swiper/list')
}

/**
 * 获取推荐游戏配置
 */
export function getRecommendGame() {
  return http.get<IRecommendGameConfig[]>('/game/recommend')
}

/**
 * 获取福利活动列表
 */
export function getExploreList() {
  return http.get<IExploreItem[]>('/explore/list')
}

/**
 * 获取搜索热门列表
 */
export function getSearchHotList() {
  return http.get<ISearchHotItem[]>('/search/hot')
}

/**
 * 搜索游戏
 */
export function searchGame(keyword: string) {
  return http.get<IGameItem[]>('/game/search', { keyword })
}
