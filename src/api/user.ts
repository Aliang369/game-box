import { http } from '@/http/http'

// ============ 类型定义 ============

/** 上传头像响应 */
export interface IUploadAvatarRes {
  avatarUrl: string
}

/** 用户资料（他人） */
export interface IUserProfile {
  userId: number
  username: string
  nickname: string
  avatar: string
  bio: string
  gender: string
  birthday: string
}

/** 用户统计数据 */
export interface IUserStats {
  followCount: number
  fansCount: number
  favoriteCount: number
  postCount: number
}

/** 发送验证码参数 */
export interface ISendCodeParams {
  email: string
  type: 'bind' | 'reset'
}

/** 绑定邮箱参数 */
export interface IBindEmailParams {
  email: string
  code: string
}

/** 更新资料参数 */
export interface IUpdateProfileParams {
  nickname?: string
  bio?: string
  gender?: string
  birthday?: string
}

/** 浏览历史项 */
export interface IHistoryItem {
  id: string
  type: 'game' | 'post'
  targetId: string
  title: string
  image: string
  time: string
}

// ============ 接口函数 ============

/**
 * 上传头像
 */
export function uploadAvatar(filePath: string): Promise<IUploadAvatarRes> {
  return new Promise((resolve, reject) => {
    uni.uploadFile({
      url: `${import.meta.env.VITE_SERVER_BASEURL}/user/uploadAvatar`,
      filePath,
      name: 'file',
      success: (res) => {
        if (res.statusCode === 200) {
          const data = JSON.parse(res.data)
          resolve(data.data)
        }
        else {
          reject(new Error('上传失败'))
        }
      },
      fail: err => reject(err),
    })
  })
}

/**
 * 获取他人资料
 */
export function getUserProfile(userId: number) {
  return http.get<IUserProfile>(`/user/profile/${userId}`)
}

/**
 * 获取用户统计数据
 */
export function getUserStats(userId: number) {
  return http.get<IUserStats>(`/user/stats/${userId}`)
}

/**
 * 更新个人资料
 */
export function updateProfile(data: IUpdateProfileParams) {
  return http.post<void>('/user/updateProfile', data)
}

/**
 * 发送邮箱验证码
 */
export function sendEmailCode(params: ISendCodeParams) {
  return http.post<void>('/user/sendEmailCode', params)
}

/**
 * 绑定邮箱
 */
export function bindEmail(params: IBindEmailParams) {
  return http.post<void>('/user/bindEmail', params)
}

/**
 * 获取浏览历史
 */
export function getHistory(params?: { page?: number, pageSize?: number }) {
  return http.get<IHistoryItem[]>('/user/history', params)
}
