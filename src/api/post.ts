import { http } from '@/http/http'

// ============ 类型定义 ============

/** 帖子项 */
export interface IPostItem {
  id: string
  userId: number
  nickname: string
  avatar: string
  content: string
  images: string[]
  likeCount: number
  commentCount: number
  isLiked: boolean
  createdAt: string
  sectionId?: string
  sectionTitle?: string
  /** 帖子类型：text=纯文字, image=图文, article=富文本 */
  type: 'text' | 'image' | 'article'
}

/** 帖子详情 */
export interface IPostDetail extends IPostItem {
  htmlContent?: string
}

/** 评论项 */
export interface ICommentItem {
  id: string
  postId: string
  userId: number
  nickname: string
  avatar: string
  content: string
  likeCount: number
  isLiked: boolean
  createdAt: string
  replyTo?: {
    userId: number
    nickname: string
  }
}

/** 论坛板块 */
export interface IForumSection {
  id: string
  title: string
  icon: string
  color: string
  description: string
  postCount: number
  memberCount: number
}

/** 版主信息 */
export interface IModerator {
  userId: number
  nickname: string
  avatar: string
}

/** 发布帖子参数 */
export interface ICreatePostParams {
  content: string
  images?: string[]
  htmlContent?: string
  sectionId: string
  categoryId?: string
  type: 'text' | 'image' | 'article'
}

/** 发表评论参数 */
export interface ICreateCommentParams {
  postId: string
  content: string
  replyToUserId?: number
}

/** 分页参数 */
export interface IPostPageParams {
  page?: number
  pageSize?: number
  sectionId?: string
  categoryId?: string
  type?: 'recommend' | 'latest' | 'hot'
}

// ============ 接口函数 ============

/**
 * 获取帖子列表
 */
export function getPostList(params?: IPostPageParams) {
  return http.get<IPostItem[]>('/post/list', params)
}

/**
 * 获取帖子详情
 */
export function getPostDetail(postId: string) {
  return http.get<IPostDetail>(`/post/detail/${postId}`)
}

/**
 * 发布帖子
 */
export function createPost(data: ICreatePostParams) {
  return http.post<{ postId: string }>('/post/create', data)
}

/**
 * 点赞/取消点赞帖子
 */
export function togglePostLike(postId: string) {
  return http.post<{ isLiked: boolean }>(`/post/like/${postId}`)
}

/**
 * 获取评论列表
 */
export function getCommentList(postId: string, params?: { page?: number, pageSize?: number }) {
  return http.get<ICommentItem[]>(`/post/comments/${postId}`, params)
}

/**
 * 发表评论
 */
export function createComment(data: ICreateCommentParams) {
  return http.post<{ commentId: string }>('/post/comment', data)
}

/**
 * 获取论坛板块列表
 */
export function getForumSections() {
  return http.get<IForumSection[]>('/forum/sections')
}

/**
 * 获取板块帖子列表
 */
export function getForumPosts(sectionId: string, params?: { page?: number, pageSize?: number, categoryId?: string }) {
  return http.get<IPostItem[]>(`/forum/posts/${sectionId}`, params)
}

/**
 * 获取板块版主列表
 */
export function getForumModerators(sectionId: string) {
  return http.get<IModerator[]>(`/forum/moderators/${sectionId}`)
}

/**
 * 获取用户发布的帖子
 */
export function getUserPosts(userId: number, params?: { page?: number, pageSize?: number }) {
  return http.get<IPostItem[]>(`/user/posts/${userId}`, params)
}

/**
 * 获取用户的评论
 */
export function getUserComments(userId: number, params?: { page?: number, pageSize?: number }) {
  return http.get<ICommentItem[]>(`/user/comments/${userId}`, params)
}
