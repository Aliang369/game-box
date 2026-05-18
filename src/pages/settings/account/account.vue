<script lang="ts" setup>
definePage({
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '账号与安全',
  },
})

import { useUserStore } from '@/store/user'
import { updateUserPassword } from '@/api/login'
import { sendEmailCode as sendEmailCodeApi, bindEmail as bindEmailApi } from '@/api/user'

const userStore = useUserStore()

// 当前账号（不可修改）
const accountName = computed(() => userStore.userInfo.username || '未登录')

function leftClick() {
  const pages = getCurrentPages()
  if (pages.length > 1) {
    uni.navigateBack({ delta: 1 })
  }
}

// 修改密码
const showPasswordPopup = ref(false)
const passwordForm = ref({
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
})
const showOldPwd = ref(false)
const showNewPwd = ref(false)
const showConfirmPwd = ref(false)

function openChangePassword() {
  passwordForm.value = { oldPassword: '', newPassword: '', confirmPassword: '' }
  showPasswordPopup.value = true
}

function confirmChangePassword() {
  const { oldPassword, newPassword, confirmPassword } = passwordForm.value
  if (!oldPassword) {
    uni.showToast({ title: '请输入原密码', icon: 'none' })
    return
  }
  if (!newPassword) {
    uni.showToast({ title: '请输入新密码', icon: 'none' })
    return
  }
  if (newPassword.length < 6) {
    uni.showToast({ title: '新密码至少6位', icon: 'none' })
    return
  }
  if (newPassword !== confirmPassword) {
    uni.showToast({ title: '两次密码不一致', icon: 'none' })
    return
  }
  try {
    await updateUserPassword({
      id: userStore.userInfo.userId,
      oldPassword,
      newPassword,
      confirmPassword,
    })
    uni.showToast({ title: '密码修改成功', icon: 'success' })
    showPasswordPopup.value = false
  }
  catch {
    uni.showToast({ title: '密码修改失败', icon: 'none' })
  }
}

// 绑定邮箱
const showEmailPopup = ref(false)
const emailForm = ref({
  email: '',
  code: '',
})
const countdown = ref(0)
let countdownTimer: ReturnType<typeof setInterval> | null = null

function openBindEmail() {
  emailForm.value = { email: '', code: '' }
  countdown.value = 0
  showEmailPopup.value = true
}

function sendEmailCode() {
  const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailForm.value.email) {
    uni.showToast({ title: '请输入邮箱地址', icon: 'none' })
    return
  }
  if (!emailReg.test(emailForm.value.email)) {
    uni.showToast({ title: '邮箱格式不正确', icon: 'none' })
    return
  }
  try {
    await sendEmailCodeApi({ email: emailForm.value.email, type: 'bind' })
    uni.showToast({ title: '验证码已发送', icon: 'none' })
  }
  catch {
    uni.showToast({ title: '发送失败，请重试', icon: 'none' })
    return
  }
  countdown.value = 60
  countdownTimer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      clearInterval(countdownTimer!)
      countdownTimer = null
    }
  }, 1000)
}

function confirmBindEmail() {
  if (!emailForm.value.email) {
    uni.showToast({ title: '请输入邮箱地址', icon: 'none' })
    return
  }
  if (!emailForm.value.code) {
    uni.showToast({ title: '请输入验证码', icon: 'none' })
    return
  }
  try {
    await bindEmailApi({ email: emailForm.value.email, code: emailForm.value.code })
    uni.showToast({ title: '邮箱绑定成功', icon: 'success' })
    showEmailPopup.value = false
  }
  catch {
    uni.showToast({ title: '绑定失败，请重试', icon: 'none' })
  }
}

onUnmounted(() => {
  if (countdownTimer) {
    clearInterval(countdownTimer)
  }
})
</script>

<template>
  <view class="account-page min-h-100vh bg-[#F7F7FA]">
    <!-- 导航栏 -->
    <view
      class="fixed top-0 left-0 w-full z-2 h-90px flex items-center"
      style="background: linear-gradient(180deg, #E5F9FF 0%, #F7F6FB 100%)"
    >
      <view class="flex flex-row flex-nowrap w-full pt-20px mx-15px items-center justify-between">
        <view class="flex-2 min-w-0">
          <view @click="leftClick">
            <image src="/static/gamedetail/back_icon.png" mode="aspectFit" class="w-25px h-25px" />
          </view>
        </view>
        <view class="flex-2 min-w-0 text-center text-18px text-[#272E3B]">账号与安全</view>
        <view class="flex-2 min-w-0" />
      </view>
    </view>

    <!-- 内容区域 -->
    <view class="pt-100px px-15px">
      <!-- 账号信息卡片 -->
      <view class="rounded-20px bg-white px-20px py-20px" style="box-shadow: 0 2px 12px rgba(53, 64, 90, 0.05)">
        <view class="text-16px text-[#272E3B] font-600 mb-16px">账号信息</view>

        <!-- 账号（不可更改） -->
        <view class="flex items-center justify-between py-14px border-b border-[#f5f5f5]">
          <view class="flex items-center gap-14px">
            <view class="h-30px w-30px flex items-center justify-center">
              <view class="i-carbon-user w-24px h-24px text-[#666]" />
            </view>
            <view>
              <view class="text-14px text-[#272E3B] font-500">账号</view>
              <view class="text-12px text-[#C0C4CC] mt-2px">账号注册后不可更改</view>
            </view>
          </view>
          <view class="text-14px text-[#C0C4CC]">{{ accountName }}</view>
        </view>

        <!-- 修改密码 -->
        <view class="flex items-center justify-between py-14px border-b border-[#f5f5f5]" @click="openChangePassword">
          <view class="flex items-center gap-14px">
            <view class="h-30px w-30px flex items-center justify-center">
              <view class="i-carbon-locked w-24px h-24px text-[#666]" />
            </view>
            <view>
              <view class="text-14px text-[#272E3B] font-500">修改密码</view>
              <view class="text-12px text-[#8F96A3] mt-2px">定期修改密码保障账号安全</view>
            </view>
          </view>
          <image src="/static/user/right_icon.png" class="h-16px w-16px opacity-40" />
        </view>

        <!-- 绑定邮箱 -->
        <view class="flex items-center justify-between py-14px" @click="openBindEmail">
          <view class="flex items-center gap-14px">
            <view class="h-30px w-30px flex items-center justify-center">
              <view class="i-carbon-email w-24px h-24px text-[#666]" />
            </view>
            <view>
              <view class="text-14px text-[#272E3B] font-500">绑定邮箱</view>
              <view class="text-12px text-[#8F96A3] mt-2px">绑定邮箱可用于找回密码</view>
            </view>
          </view>
          <image src="/static/user/right_icon.png" class="h-16px w-16px opacity-40" />
        </view>
      </view>

      <!-- 安全提示 -->
      <view class="mt-20px px-5px">
        <view class="text-12px text-[#C0C4CC] leading-20px text-center">
          为保障您的账号安全，建议定期修改密码并绑定邮箱
        </view>
      </view>
    </view>

    <!-- 修改密码弹窗 -->
    <wd-popup v-model="showPasswordPopup" position="bottom" :z-index="1200" custom-style="border-radius: 20px 20px 0 0; overflow: hidden">
      <view class="px-24px pt-24px pb-34px bg-white">
        <!-- 标题栏 -->
        <view class="flex items-center justify-between mb-20px">
          <text class="text-18px text-[#272E3B] font-700">修改密码</text>
          <view class="w-28px h-28px flex items-center justify-center" @click="showPasswordPopup = false">
            <text class="text-20px text-[#C0C4CC]">×</text>
          </view>
        </view>

        <!-- 原密码 -->
        <view class="mb-14px">
          <text class="text-13px text-[#5A6070] mb-6px block">原密码</text>
          <view class="flex items-center rounded-12px bg-[#F7F7FA] px-14px h-44px" style="border: 1px solid rgba(6,2,32,0.05)">
            <input
              v-model="passwordForm.oldPassword"
              :password="!showOldPwd"
              placeholder="请输入原密码"
              class="flex-1 text-14px text-[#272E3B]"
              placeholder-class="text-[#C0C4CC]"
            />
            <view class="ml-10px w-20px h-20px flex items-center justify-center" @click="showOldPwd = !showOldPwd">
              <view class="w-18px h-18px text-[#8F96A3]" :class="showOldPwd ? 'i-carbon-view' : 'i-carbon-view-off'" />
            </view>
          </view>
        </view>

        <!-- 新密码 -->
        <view class="mb-14px">
          <text class="text-13px text-[#5A6070] mb-6px block">新密码</text>
          <view class="flex items-center rounded-12px bg-[#F7F7FA] px-14px h-44px" style="border: 1px solid rgba(6,2,32,0.05)">
            <input
              v-model="passwordForm.newPassword"
              :password="!showNewPwd"
              placeholder="请输入新密码（至少6位）"
              class="flex-1 text-14px text-[#272E3B]"
              placeholder-class="text-[#C0C4CC]"
            />
            <view class="ml-10px w-20px h-20px flex items-center justify-center" @click="showNewPwd = !showNewPwd">
              <view class="w-18px h-18px text-[#8F96A3]" :class="showNewPwd ? 'i-carbon-view' : 'i-carbon-view-off'" />
            </view>
          </view>
        </view>

        <!-- 确认密码 -->
        <view class="mb-24px">
          <text class="text-13px text-[#5A6070] mb-6px block">确认密码</text>
          <view class="flex items-center rounded-12px bg-[#F7F7FA] px-14px h-44px" style="border: 1px solid rgba(6,2,32,0.05)">
            <input
              v-model="passwordForm.confirmPassword"
              :password="!showConfirmPwd"
              placeholder="请再次输入新密码"
              class="flex-1 text-14px text-[#272E3B]"
              placeholder-class="text-[#C0C4CC]"
            />
            <view class="ml-10px w-20px h-20px flex items-center justify-center" @click="showConfirmPwd = !showConfirmPwd">
              <view class="w-18px h-18px text-[#8F96A3]" :class="showConfirmPwd ? 'i-carbon-view' : 'i-carbon-view-off'" />
            </view>
          </view>
        </view>

        <!-- 确认按钮 -->
        <view
          class="h-48px flex items-center justify-center rounded-30px text-16px text-white font-600"
          style="background: linear-gradient(95deg, #2bc18a, #5ad88c); box-shadow: 0 6px 16px rgba(43, 193, 138, 0.2)"
          @click="confirmChangePassword"
        >
          确认修改
        </view>
      </view>
    </wd-popup>

    <!-- 绑定邮箱弹窗 -->
    <wd-popup v-model="showEmailPopup" position="bottom" :z-index="1200" custom-style="border-radius: 20px 20px 0 0; overflow: hidden">
      <view class="px-24px pt-24px pb-34px bg-white">
        <!-- 标题栏 -->
        <view class="flex items-center justify-between mb-20px">
          <text class="text-18px text-[#272E3B] font-700">绑定邮箱</text>
          <view class="w-28px h-28px flex items-center justify-center" @click="showEmailPopup = false">
            <text class="text-20px text-[#C0C4CC]">×</text>
          </view>
        </view>

        <!-- 邮箱输入 -->
        <view class="mb-14px">
          <text class="text-13px text-[#5A6070] mb-6px block">邮箱地址</text>
          <view class="flex items-center rounded-12px bg-[#F7F7FA] px-14px h-44px" style="border: 1px solid rgba(6,2,32,0.05)">
            <input
              v-model="emailForm.email"
              type="text"
              placeholder="请输入邮箱地址"
              class="flex-1 text-14px text-[#272E3B]"
              placeholder-class="text-[#C0C4CC]"
            />
          </view>
        </view>

        <!-- 验证码 -->
        <view class="mb-24px">
          <text class="text-13px text-[#5A6070] mb-6px block">验证码</text>
          <view class="flex items-center gap-10px">
            <view class="flex-1 flex items-center rounded-12px bg-[#F7F7FA] px-14px h-44px" style="border: 1px solid rgba(6,2,32,0.05)">
              <input
                v-model="emailForm.code"
                type="number"
                placeholder="请输入验证码"
                :maxlength="6"
                class="flex-1 text-14px text-[#272E3B]"
                placeholder-class="text-[#C0C4CC]"
              />
            </view>
            <view
              class="h-44px px-16px flex items-center justify-center rounded-12px flex-shrink-0"
              :style="{
                background: countdown > 0 ? '#F5F6F8' : 'linear-gradient(95deg, #2bc18a, #5ad88c)',
              }"
              @click="countdown <= 0 && sendEmailCode()"
            >
              <text
                class="text-13px font-500"
                :class="countdown > 0 ? 'text-[#C0C4CC]' : 'text-white'"
              >
                {{ countdown > 0 ? `${countdown}s` : '获取验证码' }}
              </text>
            </view>
          </view>
        </view>

        <!-- 确认按钮 -->
        <view
          class="h-48px flex items-center justify-center rounded-30px text-16px text-white font-600"
          style="background: linear-gradient(95deg, #2bc18a, #5ad88c); box-shadow: 0 6px 16px rgba(43, 193, 138, 0.2)"
          @click="confirmBindEmail"
        >
          确认绑定
        </view>
      </view>
    </wd-popup>
  </view>
</template>
