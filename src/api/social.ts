import { http } from '@/http/http'

// ============ 类型定义 ============

/** 关注/粉丝用户项 */
export interface ISocialUserItem {
  userId: number
  nickname: string
  avatar: string
  bio?: string
  isFollowed: boolean
}

/** 收藏项 */
export interface IFavoriteItem {
  id: string
  type: 'game' | 'post'
  targetId: string
  title: string
  image: string
  createdAt: string
}

// ============ 接口函数 ============

/**
 * 获取关注列表
 */
export function getFollowList(params?: { page?: number, pageSize?: number }) {
  return http.get<ISocialUserItem[]>('/user/follow/list', params)
}

/**
 * 关注用户
 */
export function followUser(targetUserId: number) {
  return http.post<void>('/user/follow', { targetUserId })
}

/**
 * 取消关注
 */
export function unfollowUser(targetUserId: number) {
  return http.delete<void>('/user/follow', { targetUserId })
}

/**
 * 获取粉丝列表
 */
export function getFansList(params?: { page?: number, pageSize?: number }) {
  return http.get<ISocialUserItem[]>('/user/fans/list', params)
}

/**
 * 获取收藏列表
 */
export function getFavoriteList(params?: { page?: number, pageSize?: number, type?: 'game' | 'post' }) {
  return http.get<IFavoriteItem[]>('/user/favorite/list', params)
}

/**
 * 收藏
 */
export function addFavorite(targetId: string, type: 'game' | 'post') {
  return http.post<void>('/user/favorite', { targetId, type })
}

/**
 * 取消收藏
 */
export function removeFavorite(targetId: string, type: 'game' | 'post') {
  return http.delete<void>('/user/favorite', { targetId, type })
}
