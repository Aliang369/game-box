<script lang="ts" setup>
import { useFollowStore } from '@/store/follow'
import type { FollowUser } from '@/store/follow'
import { storeToRefs } from 'pinia'

definePage({
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '我的关注',
  },
})

const followStore = useFollowStore()
const { followList } = storeToRefs(followStore)

// 确认弹窗
const confirmPopupRef = ref()
const pendingUnfollowUser = ref<FollowUser | null>(null)

function handleUnfollow(user: FollowUser) {
  pendingUnfollowUser.value = user
  confirmPopupRef.value?.open()
}

function confirmUnfollow() {
  if (pendingUnfollowUser.value) {
    followStore.unfollow(pendingUnfollowUser.value.id)
    uni.showToast({ title: '已取消关注', icon: 'none' })
    pendingUnfollowUser.value = null
  }
}

function cancelUnfollow() {
  pendingUnfollowUser.value = null
}

function goBack() {
  uni.navigateBack()
}
</script>

<template>
  <view class="follow-page min-h-100vh bg-[#F7F7FA]">
    <!-- 顶部导航栏 -->
    <view class="fixed left-0 right-0 top-0 z-50 bg-white/90 backdrop-blur-10px" style="padding-top: env(safe-area-inset-top)">
      <view class="flex h-44px items-center justify-between px-15px">
        <view class="flex h-32px w-32px items-center justify-center" @click="goBack">
          <view class="i-carbon-chevron-left h-30px w-30px text-[#272E3B]" />
        </view>
        <text class="text-20px text-[#272E3B] font-600">我的关注</text>
        <view class="h-32px w-32px" />
      </view>
    </view>

    <!-- 内容区域 -->
    <view class="pt-safe" style="padding-top: calc(44px + env(safe-area-inset-top))">
      <!-- 关注列表 -->
      <view v-if="followList.length > 0" class="mx-15px mt-12px rounded-16px bg-white overflow-hidden" style="box-shadow: 0 2px 12px rgba(53, 64, 90, 0.05)">
        <view
          v-for="(user, index) in followList"
          :key="user.id"
          class="follow-item"
        >
          <view class="flex items-center justify-between px-16px py-14px">
            <!-- 用户信息 -->
            <view class="flex flex-1 items-center gap-12px overflow-hidden">
              <view class="h-46px w-46px flex-shrink-0 overflow-hidden rounded-full" style="box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08)">
                <image :src="user.avatar" mode="aspectFill" class="h-full w-full" />
              </view>
              <view class="flex flex-1 flex-col overflow-hidden">
                <text class="text-15px text-[#272E3B] font-500 truncate">{{ user.nickname }}</text>
                <text v-if="user.description" class="mt-4px text-12px text-[#8F96A3] truncate">{{ user.description }}</text>
                <text v-else class="mt-4px text-12px text-[#C0C4CC]">暂无简介</text>
              </view>
            </view>

            <!-- 取消关注按钮 -->
            <view
              class="flex h-32px w-72px flex-shrink-0 items-center justify-center rounded-30px bg-[#F5F5F5] ml-12px"
              @click="handleUnfollow(user)"
            >
              <text class="text-13px text-[#8F96A3] font-500">已关注</text>
            </view>
          </view>

          <!-- 分割线 -->
          <view v-if="index < followList.length - 1" class="mx-74px h-1px bg-[#F2F2F2]" />
        </view>
      </view>

      <!-- 空状态 -->
      <view v-else class="flex flex-col items-center justify-center pt-100px">
        <view class="flex h-80px w-80px items-center justify-center rounded-full bg-[#F0FAFB]">
          <view class="i-carbon-user-favorite h-40px w-40px text-[#C0E8F0]" />
        </view>
        <text class="mt-20px text-15px text-[#8F96A3]">还没有关注任何人</text>
        <text class="mt-8px text-13px text-[#C0C4CC]">去圈子发现感兴趣的用户吧</text>
        <view
          class="mt-24px flex h-38px w-120px items-center justify-center rounded-30px bg-[#E5F9FF]"
          @click="uni.switchTab({ url: '/pages/circle/circle' })"
        >
          <text class="text-14px text-[#3AAFDC] font-500">去看看</text>
        </view>
      </view>
    </view>

    <!-- 取消关注确认弹窗 -->
    <ConfirmPopup
      ref="confirmPopupRef"
      title="取消关注"
      :content="`确定取消关注「${pendingUnfollowUser?.nickname || ''}」吗？`"
      confirm-text="取消关注"
      cancel-text="再想想"
      confirm-color="linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)"
      icon-type="warning"
      @confirm="confirmUnfollow"
      @cancel="cancelUnfollow"
    />
  </view>
</template>

<style scoped>
.follow-item {
  transition: background-color 0.2s ease;
}
.follow-item:active {
  background-color: #f8f8f8;
}
</style>
