<script lang="ts" setup>
definePage({
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '登录',
  },
  excludeLoginPath: true,
})

import { useToast } from 'wot-design-uni'
import { useTokenStore } from '@/store/token'
import { register } from '@/api/login'

type AuthMode = 'login' | 'register'

const toast = useToast('auth-toast')
const tokenStore = useTokenStore()
const authMode = ref<AuthMode>('login')
const loading = ref(false)
const loginForm = ref({
  account: '',
  password: '',
})
const registerForm = ref({
  nickname: '',
  account: '',
  password: '',
  confirmPassword: '',
})

const isLogin = computed(() => authMode.value === 'login')
const actionText = computed(() => isLogin.value ? '立即登录' : '立即注册')
const switchHint = computed(() => isLogin.value ? '还没有账号？' : '已有账号？')
const switchText = computed(() => isLogin.value ? '去注册' : '去登录')

function switchMode(mode: AuthMode) {
  authMode.value = mode
}

function leftClick() {
  const pages = getCurrentPages()
  if (pages.length > 1) {
    uni.navigateBack({ delta: 1 })
  }
  else {
    uni.switchTab({ url: '/pages/index/index' })
  }
}

async function handleSubmit() {
  if (loading.value)
    return

  if (isLogin.value) {
    if (!loginForm.value.account.trim()) {
      toast.warning('请输入账号')
      return
    }
    if (!loginForm.value.password.trim()) {
      toast.warning('请输入登录密码')
      return
    }

    loading.value = true
    try {
      await tokenStore.login({
        username: loginForm.value.account.trim(),
        password: loginForm.value.password.trim(),
      })
      // 登录成功
      toast.success('登录成功')
      setTimeout(() => {
        const pages = getCurrentPages()
        if (pages.length > 1) {
          uni.navigateBack({ delta: 1 })
        }
        else {
          uni.switchTab({ url: '/pages/user/user' })
        }
      }, 500)
    }
    catch {
      toast.error('登录失败，请检查账号密码后重试')
    }
    finally {
      loading.value = false
    }
    return
  }

  // 注册逻辑
  if (!registerForm.value.nickname.trim()) {
    toast.warning('请输入昵称')
    return
  }
  if (!registerForm.value.account.trim()) {
    toast.warning('请输入账号')
    return
  }
  if (!registerForm.value.password.trim()) {
    toast.warning('请输入密码')
    return
  }
  if (registerForm.value.password !== registerForm.value.confirmPassword) {
    toast.warning('两次密码不一致')
    return
  }
  try {
    await register({
      username: registerForm.value.account,
      password: registerForm.value.password,
      confirmPassword: registerForm.value.confirmPassword,
    })
    toast.success('注册成功')
    authMode.value = 'login'
  }
  catch {
    toast.warning('注册失败，请重试')
  }
}
</script>

<template>
  <view class="auth-page min-h-100vh bg-[#F7F7FA]">
    <view class="auth-header absolute left-0 top-0 z-1 w-full px-15px pb-28px pt-50px">
      <view class="h-34px flex items-center justify-between">
        <view class="h-34px w-34px flex items-center justify-center" @click="leftClick">
          <image src="/static/gamedetail/back_icon.png" mode="aspectFit" class="h-22px w-22px" />
        </view>
        <view class="text-18px text-[#272E3B] font-600">
          {{ isLogin ? '登录' : '注册' }}
        </view>
        <view class="h-34px w-34px" />
      </view>
    </view>

    <view class="auth-content min-h-100vh px-24px">
      <view class="auth-card mx-auto max-w-420px w-full">
        <view class="mb-26px">
          <view class="text-28px text-[#272E3B] font-700 leading-36px">
            {{ isLogin ? '欢迎回来' : '创建账号' }}
          </view>
          <view class="mt-8px text-14px text-[#8F96A3] leading-22px">
            {{ isLogin ? '登录后同步你的游戏资料与偏好' : '注册后开启你的专属游戏空间' }}
          </view>
        </view>

        <view v-if="isLogin" class="auth-form">
          <view class="auth-field">
            <wd-input
              v-model="loginForm.account"
              placeholder="请输入账号"
              no-border
              clearable
              custom-style="padding: 14px 15px; border-radius: 16px; background: #ffffff"
            />
          </view>
          <view class="auth-field">
            <wd-input
              v-model="loginForm.password"
              placeholder="请输入登录密码"
              no-border
              clearable
              show-password
              custom-style="padding: 14px 15px; border-radius: 16px; background: #ffffff"
            />
          </view>
        </view>

        <view v-else class="auth-form">
          <view class="auth-field">
            <view class="mb-8px text-13px text-[#6F7782]">
              昵称
            </view>
            <wd-input
              v-model="registerForm.nickname"
              placeholder="请输入昵称"
              no-border
              clearable
              custom-style="padding: 14px 15px; border-radius: 16px; background: #ffffff"
            />
          </view>
          <view class="auth-field">
            <view class="mb-8px text-13px text-[#6F7782]">
              账号
            </view>
            <wd-input
              v-model="registerForm.account"
              placeholder="请输入账号"
              no-border
              clearable
              custom-style="padding: 14px 15px; border-radius: 16px; background: #ffffff"
            />
          </view>
          <view class="auth-field">
            <view class="mb-8px text-13px text-[#6F7782]">
              密码
            </view>
            <wd-input
              v-model="registerForm.password"
              placeholder="设置登录密码"
              no-border
              clearable
              show-password
              custom-style="padding: 14px 15px; border-radius: 16px; background: #ffffff"
            />
          </view>
          <view class="auth-field">
            <view class="mb-8px text-13px text-[#6F7782]">
              确认密码
            </view>
            <wd-input
              v-model="registerForm.confirmPassword"
              placeholder="请再次输入密码"
              no-border
              clearable
              show-password
              custom-style="padding: 14px 15px; border-radius: 16px; background: #ffffff"
            />
          </view>
        </view>

        <view
          class="auth-main-btn mt-24px h-50px w-full flex items-center justify-center rounded-30px text-16px text-white font-700"
          :class="{ 'opacity-70': loading }"
          @click="handleSubmit"
        >
          <text v-if="!loading">{{ actionText }}</text>
          <view v-else class="flex items-center gap-8px">
            <view class="loading-spinner" />
            <text>{{ isLogin ? '登录中...' : '注册中...' }}</text>
          </view>
        </view>

        <view class="mt-18px flex items-center justify-center gap-6px text-12px text-[#8F96A3]">
          <text>{{ switchHint }}</text>
          <text class="text-[#2bc18a] font-600" @click="switchMode(isLogin ? 'register' : 'login')">
            {{ switchText }}
          </text>
        </view>
      </view>
    </view>
    <wd-toast selector="auth-toast" position="top" custom-class="auth-toast" />
  </view>
</template>

<style scoped lang="scss">
.auth-page {
  position: relative;
  overflow-x: hidden;
  background:
    radial-gradient(circle at 50% 18%, rgba(43, 193, 138, 0.14), transparent 30%),
    linear-gradient(180deg, #e5f9ff 0%, #f7f7fa 38%, #f7f7fa 100%);
}

.auth-header {
  background: transparent;
}

.auth-content {
  box-sizing: border-box;
  padding-top: 188px;
}

.auth-card {
  position: relative;
}

.auth-field {
  margin-bottom: 16px;
}

.auth-main-btn {
  background: linear-gradient(95deg, #2bc18a, #5ad88c);
  box-shadow: 0 8px 18px rgba(43, 193, 138, 0.24);
}

.auth-field :deep(.wd-input__inner),
.auth-field :deep(.uni-input-wrapper),
.auth-field :deep(.uni-input-input),
.auth-field :deep(.wd-input__placeholder) {
  background: transparent !important;
}

.auth-field :deep(.wd-input__inner) {
  min-height: 22px;
}

:deep(.auth-toast) {
  margin-top: calc(env(safe-area-inset-top) + 72px);
}

.loading-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: #ffffff;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
