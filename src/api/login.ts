import type { IAuthLoginRes, ICaptcha, IDoubleTokenRes, IUpdateInfo, IUpdatePassword, IUserInfoRes } from './types/login'
import { http } from '@/http/http'

// 是否启用 Mock 模式（开发环境自动开启，生产环境走真实接口）
const isMockEnabled = import.meta.env.DEV

/**
 * 登录表单
 */
export interface ILoginForm {
  username: string
  password: string
}

/**
 * 获取验证码
 * @returns ICaptcha 验证码
 */
export function getCode() {
  return http.get<ICaptcha>('/user/getCode')
}

/**
 * 用户登录
 * @param loginForm 登录表单
 */
export function login(loginForm: ILoginForm) {
  if (isMockEnabled) {
    return mockLogin(loginForm)
  }
  return http.post<IAuthLoginRes>('/auth/login', loginForm)
}

/**
 * 刷新token
 * @param refreshToken 刷新token
 */
export function refreshToken(refreshToken: string) {
  return http.post<IDoubleTokenRes>('/auth/refreshToken', { refreshToken })
}

/**
 * 获取用户信息
 */
export function getUserInfo() {
  if (isMockEnabled) {
    return mockGetUserInfo()
  }
  return http.get<IUserInfoRes>('/user/info')
}

/**
 * 退出登录
 */
export function logout() {
  if (isMockEnabled) {
    return Promise.resolve()
  }
  return http.get<void>('/auth/logout')
}

/**
 * 修改用户信息
 */
export function updateInfo(data: IUpdateInfo) {
  return http.post('/user/updateInfo', data)
}

/**
 * 修改用户密码
 */
export function updateUserPassword(data: IUpdatePassword) {
  return http.post('/user/updatePassword', data)
}

/**
 * 获取微信登录凭证
 * @returns Promise 包含微信登录凭证(code)
 */
export function getWxCode() {
  return new Promise<UniApp.LoginRes>((resolve, reject) => {
    uni.login({
      provider: 'weixin',
      success: res => resolve(res),
      fail: err => reject(new Error(err)),
    })
  })
}

/**
 * 微信登录
 * @param params 微信登录参数，包含code
 * @returns Promise 包含登录结果
 */
export function wxLogin(data: { code: string }) {
  return http.post<IAuthLoginRes>('/auth/wxLogin', data)
}

// ============ Mock 实现 ============

function mockLogin(_loginForm: ILoginForm): Promise<IAuthLoginRes> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        token: `mock_token_${Date.now()}`,
        expiresIn: 7200, // 2小时
      })
    }, 500)
  })
}

function mockGetUserInfo(): Promise<IUserInfoRes> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        userId: 10001,
        username: 'test_user',
        nickname: '一念',
        avatar: '/static/logo.png',
      })
    }, 200)
  })
}
