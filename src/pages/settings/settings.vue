<script lang="ts" setup>
import { useTokenStore } from '@/store/token'

definePage({
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '设置',
  },
})

const tokenStore = useTokenStore()
const isLoggedIn = computed(() => tokenStore.hasLogin)

// 退出登录确认弹窗
const logoutPopupRef = ref()

function leftClick() {
  const pages = getCurrentPages()
  if (pages.length > 1) {
    uni.navigateBack({ delta: 1 })
  }
}

function goToPrivacy() {
  uni.navigateTo({ url: '/pages/settings/privacy/privacy' })
}

function handleLogout() {
  logoutPopupRef.value?.open()
}

async function confirmLogout() {
  try {
    await tokenStore.logout()
    uni.showToast({ title: '已退出登录', icon: 'success' })
    setTimeout(() => {
      uni.switchTab({ url: '/pages/user/user' })
    }, 500)
  }
  catch {
    uni.switchTab({ url: '/pages/user/user' })
  }
}
</script>

<template>
  <view>
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
        <view class="flex-2 min-w-0 text-center text-18px text-[#272E3B]">设置</view>
        <view class="flex-2 min-w-0" />
      </view>
    </view>

    <!-- 设置内容 -->
    <view class="mx-20px pt-90px">
      <!-- 账号 -->
      <view class="text-14px text-[#82898f] px-15px py-10px">账号</view>
      <view class="h-60px w-full rounded-20px bg-white flex items-center px-15px box-border">
        <view class="flex justify-between items-center w-full">
          <view>账号与安全</view>
          <view class="w-24px h-24px">
            <image src="/static/user/right_icon.png" class="w-full h-full" />
          </view>
        </view>
      </view>

      <!-- 关于 -->
      <view class="text-14px text-[#82898f] px-15px py-10px">关于</view>
      <view class="h-60px w-full rounded-20px bg-white flex items-center px-15px box-border" @click="goToPrivacy">
        <view class="flex justify-between items-center w-full">
          <view>隐私政策</view>
          <view class="w-24px h-24px">
            <image src="/static/user/right_icon.png" class="w-full h-full" />
          </view>
        </view>
      </view>

      <!-- 退出登录 -->
      <view v-if="isLoggedIn" class="h-50px w-full rounded-50px bg-white mt-35px flex items-center justify-center" @click="handleLogout">
        <text class="text-[#8b90a4] font-600 text-center">退出登录</text>
      </view>
    </view>

    <!-- 退出登录确认弹窗 -->
    <ConfirmPopup
      ref="logoutPopupRef"
      title="退出登录"
      content="确定要退出登录吗？退出后需要重新登录才能使用完整功能。"
      confirm-text="退出"
      cancel-text="取消"
      confirm-color="linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)"
      icon-type="warning"
      @confirm="confirmLogout"
    />
  </view>
</template>
