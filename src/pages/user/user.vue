<script lang="ts" setup>
import { useFansStore } from '@/store/fans'
import { useFavoriteStore } from '@/store/favorite'
import { useFollowStore } from '@/store/follow'
import { useGameStore } from '@/store/game'
import { useTokenStore } from '@/store/token'

definePage({
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '我的',
  },
})

const gameStore = useGameStore()
const favoriteStore = useFavoriteStore()
const followStore = useFollowStore()
const fansStore = useFansStore()
const tokenStore = useTokenStore()

const isLoggedIn = computed(() => tokenStore.hasLogin)

// 格式化收藏数量
const formattedFavoriteCount = computed(() => {
  const count = favoriteStore.favoriteCount
  return `${count}`
})

// 格式化关注数量
const formattedFollowCount = computed(() => {
  const count = followStore.followCount
  return `${count}`
})

// 格式化粉丝数量
const formattedFansCount = computed(() => {
  const count = fansStore.fansCount
  return `${count}`
})

// 弹窗 ref
const newgamePopupRef = ref()
const feedbackPopupRef = ref()

function openNewGame() {
  newgamePopupRef.value?.open()
}

function openFeedback() {
  feedbackPopupRef.value?.open()
}

function goToDownload() {
  uni.navigateTo({ url: '/pages/download/download' })
}

function goToSettings() {
  uni.navigateTo({ url: '/pages/settings/settings' })
}

function goToFavorites() {
  uni.navigateTo({ url: '/pages/favorites/favorites' })
}

function goToFollowList() {
  uni.navigateTo({ url: '/pages/follow/follow' })
}

function goToFansList() {
  uni.navigateTo({ url: '/pages/fans/fans' })
}

function goToLogin() {
  uni.navigateTo({ url: '/pages/login/index' })
}

function goToProfile() {
  uni.navigateTo({ url: '/pages/profile/profile' })
}

function copyId() {
  const user = gameStore.currentUser
  if (!user)
    return
  const idText = `ID：${user.id}`
  uni.setClipboardData({
    data: idText,
    success: () => {
      uni.showToast({ title: 'ID复制成功', icon: 'none' })
    },
    fail: () => {
      uni.showToast({ title: 'ID复制失败', icon: 'none' })
    },
  })
}
</script>

<template>
  <view class="user-page min-h-100vh bg-[#F7F7FA]">
    <!-- ========== 已登录状态 ========== -->
    <template v-if="isLoggedIn">
      <view class="user-header relative overflow-hidden pb-16px pt-60px" style="background: linear-gradient(180deg, #E5F9FF 0%, #d4f5ee 50%, #F7F7FA 100%)">
        <view class="flex flex-col items-center mt-10px">
          <view class="h-80px w-80px overflow-hidden rounded-full shadow-lg" style="box-shadow: 0 8px 24px rgba(18, 205, 176, 0.2)">
            <image :src="gameStore.currentUser?.picture || '/static/user/UserNull.svg'" mode="aspectFill" class="h-full w-full" />
          </view>

          <view class="mt-12px flex items-center gap-6px" @click="goToProfile">
            <text class="text-22px text-[#272E3B] font-bold">{{ gameStore.currentUser?.Nickname || '用户' }}</text>
            <image src="/static/user/edit.png" class="h-16px w-16px opacity-60" />
          </view>

          <view class="mt-6px flex items-center gap-6px" @click="copyId">
            <text class="text-13px text-[#8F92A1]">@ID {{ gameStore.currentUser?.id || '---' }}</text>
            <image src="/static/user/copy.png" class="h-14px w-14px opacity-50" />
          </view>
        </view>

        <view class="mx-20px mt-20px rounded-16px bg-white px-10px py-16px" style="box-shadow: 0 4px 20px rgba(53, 64, 90, 0.08)">
          <view class="flex items-center justify-around">
            <view class="flex flex-col items-center" @click="goToFollowList">
              <text class="text-22px text-[#272E3B] font-bold">{{ formattedFollowCount }}</text>
              <text class="mt-4px text-12px text-[#8F92A1]">关注</text>
            </view>
            <view class="h-30px w-1px bg-[#E8E8E8]" />
            <view class="flex flex-col items-center" @click="goToFansList">
              <text class="text-22px text-[#272E3B] font-bold">{{ formattedFansCount }}</text>
              <text class="mt-4px text-12px text-[#8F92A1]">粉丝</text>
            </view>
            <view class="h-30px w-1px bg-[#E8E8E8]" />
            <view class="flex flex-col items-center" @click="goToFavorites">
              <text class="text-22px text-[#272E3B] font-bold">{{ formattedFavoriteCount }}</text>
              <text class="mt-4px text-12px text-[#8F92A1]">收藏</text>
            </view>
          </view>
        </view>
      </view>

      <view class="mx-15px mt-10px rounded-16px bg-white overflow-hidden" style="box-shadow: 0 2px 12px rgba(53, 64, 90, 0.05)">
        <view class="menu-item flex items-center justify-between px-20px py-16px" @click="goToFavorites">
          <view class="flex items-center gap-14px">
            <view class="h-30px w-30px flex items-center justify-center">
              <view class="i-carbon-favorite w-24px h-24px text-[#666]" />
            </view>
            <text class="text-15px text-[#272E3B]">我的收藏</text>
          </view>
          <image src="/static/user/right_icon.png" class="h-16px w-16px opacity-40" />
        </view>

        <view class="mx-20px h-1px bg-[#F2F2F2]" />

        <view class="menu-item flex items-center justify-between px-20px py-16px" @click="openNewGame">
          <view class="flex items-center gap-14px">
            <image src="/static/user/NewGame.png" class="h-30px w-30px" />
            <text class="text-15px text-[#272E3B]">新游申请</text>
          </view>
          <image src="/static/user/right_icon.png" class="h-16px w-16px opacity-40" />
        </view>

        <view class="mx-20px h-1px bg-[#F2F2F2]" />

        <view class="menu-item flex items-center justify-between px-20px py-16px" @click="openFeedback">
          <view class="flex items-center gap-14px">
            <image src="/static/user/Feedback.png" class="h-30px w-30px" />
            <text class="text-15px text-[#272E3B]">意见反馈</text>
          </view>
          <image src="/static/user/right_icon.png" class="h-16px w-16px opacity-40" />
        </view>

        <view class="mx-20px h-1px bg-[#F2F2F2]" />

        <view class="menu-item flex items-center justify-between px-20px py-16px" @click="goToDownload">
          <view class="flex items-center gap-14px">
            <image src="/static/gamedetail/download.png" class="h-30px w-30px" />
            <text class="text-15px text-[#272E3B]">下载中心</text>
          </view>
          <image src="/static/user/right_icon.png" class="h-16px w-16px opacity-40" />
        </view>

        <view class="mx-20px h-1px bg-[#F2F2F2]" />

        <view class="menu-item flex items-center justify-between px-20px py-16px" @click="goToSettings">
          <view class="flex items-center gap-14px">
            <image src="/static/user/Settings.png" class="h-30px w-30px" />
            <text class="text-15px text-[#272E3B]">设置</text>
          </view>
          <image src="/static/user/right_icon.png" class="h-16px w-16px opacity-40" />
        </view>
      </view>
    </template>

    <!-- ========== 未登录状态 ========== -->
    <template v-else>
      <view class="user-header relative overflow-hidden pb-16px pt-60px" style="background: linear-gradient(180deg, #E5F9FF 0%, #d4f5ee 50%, #F7F7FA 100%)">
        <view class="flex flex-col items-center mt-10px">
          <view class="h-80px w-80px overflow-hidden rounded-full" style="box-shadow: 0 8px 24px rgba(18, 205, 176, 0.12); background: #f0f0f0" @click="goToLogin">
            <image src="/static/user/UserNull.svg" mode="aspectFill" class="h-full w-full" />
          </view>

          <view class="mt-14px flex items-center gap-4px" @click="goToLogin">
            <text class="text-20px text-[#272E3B] font-bold">点击登录</text>
            <image src="/static/user/right_icon.png" class="h-14px w-14px opacity-50" />
          </view>

          <view class="mt-8px">
            <text class="text-13px text-[#8F96A3]">登录后同步你的游戏资料与偏好</text>
          </view>
        </view>

        <view class="mx-20px mt-20px rounded-16px bg-white px-10px py-16px" style="box-shadow: 0 4px 20px rgba(53, 64, 90, 0.08)">
          <view class="flex items-center justify-around">
            <view class="flex flex-col items-center">
              <text class="text-22px text-[#C0C4CC] font-bold">--</text>
              <text class="mt-4px text-12px text-[#8F92A1]">关注</text>
            </view>
            <view class="h-30px w-1px bg-[#E8E8E8]" />
            <view class="flex flex-col items-center">
              <text class="text-22px text-[#C0C4CC] font-bold">--</text>
              <text class="mt-4px text-12px text-[#8F92A1]">粉丝</text>
            </view>
            <view class="h-30px w-1px bg-[#E8E8E8]" />
            <view class="flex flex-col items-center">
              <text class="text-22px text-[#C0C4CC] font-bold">--</text>
              <text class="mt-4px text-12px text-[#8F92A1]">收藏</text>
            </view>
          </view>
        </view>
      </view>

      <view class="mx-15px mt-10px rounded-16px bg-white overflow-hidden" style="box-shadow: 0 2px 12px rgba(53, 64, 90, 0.05)">
        <view class="menu-item flex items-center justify-between px-20px py-16px" @click="goToLogin">
          <view class="flex items-center gap-14px">
            <view class="h-30px w-30px flex items-center justify-center">
              <view class="i-carbon-favorite w-24px h-24px text-[#666]" />
            </view>
            <text class="text-15px text-[#272E3B]">我的收藏</text>
          </view>
          <image src="/static/user/right_icon.png" class="h-16px w-16px opacity-40" />
        </view>

        <view class="mx-20px h-1px bg-[#F2F2F2]" />

        <view class="menu-item flex items-center justify-between px-20px py-16px" @click="openNewGame">
          <view class="flex items-center gap-14px">
            <image src="/static/user/NewGame.png" class="h-30px w-30px" />
            <text class="text-15px text-[#272E3B]">新游申请</text>
          </view>
          <image src="/static/user/right_icon.png" class="h-16px w-16px opacity-40" />
        </view>

        <view class="mx-20px h-1px bg-[#F2F2F2]" />

        <view class="menu-item flex items-center justify-between px-20px py-16px" @click="openFeedback">
          <view class="flex items-center gap-14px">
            <image src="/static/user/Feedback.png" class="h-30px w-30px" />
            <text class="text-15px text-[#272E3B]">意见反馈</text>
          </view>
          <image src="/static/user/right_icon.png" class="h-16px w-16px opacity-40" />
        </view>

        <view class="mx-20px h-1px bg-[#F2F2F2]" />

        <view class="menu-item flex items-center justify-between px-20px py-16px" @click="goToDownload">
          <view class="flex items-center gap-14px">
            <image src="/static/gamedetail/download.png" class="h-30px w-30px" />
            <text class="text-15px text-[#272E3B]">下载中心</text>
          </view>
          <image src="/static/user/right_icon.png" class="h-16px w-16px opacity-40" />
        </view>

        <view class="mx-20px h-1px bg-[#F2F2F2]" />

        <view class="menu-item flex items-center justify-between px-20px py-16px" @click="goToSettings">
          <view class="flex items-center gap-14px">
            <image src="/static/user/Settings.png" class="h-30px w-30px" />
            <text class="text-15px text-[#272E3B]">设置</text>
          </view>
          <image src="/static/user/right_icon.png" class="h-16px w-16px opacity-40" />
        </view>
      </view>
    </template>

    <!-- 底部版本信息 -->
    <view class="mt-40px pb-30px text-center">
      <text class="text-12px text-[#C0C0C0]">酷鸭手游 v1.0</text>
    </view>

    <!-- 弹窗组件 -->
    <NewgamePopup ref="newgamePopupRef" />
    <FeedbackPopup ref="feedbackPopupRef" />
  </view>
</template>

<style scoped>
.menu-item {
  transition: background-color 0.2s ease;
}
.menu-item:active {
  background-color: #f8f8f8;
}
</style>
