<script lang="ts" setup>
import { useFansStore } from '@/store/fans'
import { useFollowStore } from '@/store/follow'
import { storeToRefs } from 'pinia'

definePage({
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '我的粉丝',
  },
})

const fansStore = useFansStore()
const followStore = useFollowStore()
const { fansList } = storeToRefs(fansStore)

// 初始化假数据（仅用于预览效果）
onMounted(() => {
  if (fansList.value.length === 0) {
    fansStore.addFan({
      id: 'fan_001',
      nickname: '游戏达人小明',
      avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cute%20cartoon%20boy%20gamer%20avatar%20blue%20hoodie%20yellow%20background&image_size=square',
      description: '每天分享游戏攻略，关注我不迷路',
      followedBack: false,
    })
    fansStore.addFan({
      id: 'fan_002',
      nickname: '像素少女',
      avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=anime%20girl%20avatar%20pink%20hair%20headphones%20pastel%20purple%20background&image_size=square',
      description: '独立游戏爱好者 | 像素画创作中',
      followedBack: false,
    })
  }
})

// 判断是否已关注该粉丝（互关状态）
function isFollowedBack(userId: string): boolean {
  return followStore.isFollowed(userId)
}

// 回关/取消回关
function handleToggleFollow(fan: typeof fansList.value[0]) {
  followStore.toggleFollow({
    id: fan.id,
    nickname: fan.nickname,
    avatar: fan.avatar,
    description: fan.description,
  })
}

function goBack() {
  uni.navigateBack()
}
</script>

<template>
  <view class="fans-page min-h-100vh bg-[#F7F7FA]">
    <!-- 顶部导航栏 -->
    <view class="fixed left-0 right-0 top-0 z-50 bg-white/90 backdrop-blur-10px" style="padding-top: env(safe-area-inset-top)">
      <view class="flex h-44px items-center justify-between px-15px">
        <view class="flex h-32px w-32px items-center justify-center" @click="goBack">
          <view class="i-carbon-chevron-left h-30px w-30px text-[#272E3B]" />
        </view>
        <text class="text-20px text-[#272E3B] font-600">我的粉丝</text>
        <view class="h-32px w-32px" />
      </view>
    </view>

    <!-- 内容区域 -->
    <view class="pt-safe" style="padding-top: calc(44px + env(safe-area-inset-top))">
      <!-- 粉丝列表 -->
      <view v-if="fansList.length > 0" class="mx-15px mt-12px rounded-16px bg-white overflow-hidden" style="box-shadow: 0 2px 12px rgba(53, 64, 90, 0.05)">
        <view
          v-for="(fan, index) in fansList"
          :key="fan.id"
          class="fan-item"
        >
          <view class="flex items-center justify-between px-16px py-14px">
            <!-- 用户信息 -->
            <view class="flex flex-1 items-center gap-12px overflow-hidden">
              <view class="h-46px w-46px flex-shrink-0 overflow-hidden rounded-full" style="box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08)">
                <image :src="fan.avatar" mode="aspectFill" class="h-full w-full" />
              </view>
              <view class="flex flex-1 flex-col overflow-hidden">
                <text class="text-15px text-[#272E3B] font-500 truncate">{{ fan.nickname }}</text>
                <text v-if="fan.description" class="mt-4px text-12px text-[#8F96A3] truncate">{{ fan.description }}</text>
                <text v-else class="mt-4px text-12px text-[#C0C4CC]">暂无简介</text>
              </view>
            </view>

            <!-- 关注/互关按钮 -->
            <view
              class="flex h-32px flex-shrink-0 items-center justify-center rounded-30px ml-12px px-14px"
              :class="isFollowedBack(fan.id) ? 'bg-[#F5F5F5]' : 'bg-[#E5F9FF]'"
              @click="handleToggleFollow(fan)"
            >
              <text
                class="text-13px font-500"
                :class="isFollowedBack(fan.id) ? 'text-[#8F96A3]' : 'text-[#3AAFDC]'"
              >{{ isFollowedBack(fan.id) ? '互相关注' : '回关' }}</text>
            </view>
          </view>

          <!-- 分割线 -->
          <view v-if="index < fansList.length - 1" class="mx-74px h-1px bg-[#F2F2F2]" />
        </view>
      </view>

      <!-- 空状态 -->
      <view v-else class="flex flex-col items-center justify-center pt-100px">
        <view class="flex h-80px w-80px items-center justify-center rounded-full bg-[#F0FAFB]">
          <view class="i-carbon-group h-40px w-40px text-[#C0E8F0]" />
        </view>
        <text class="mt-20px text-15px text-[#8F96A3]">还没有粉丝</text>
        <text class="mt-8px text-13px text-[#C0C4CC]">多发帖互动，吸引更多关注吧</text>
        <view
          class="mt-24px flex h-38px w-120px items-center justify-center rounded-30px bg-[#E5F9FF]"
          @click="uni.switchTab({ url: '/pages/circle/circle' })"
        >
          <text class="text-14px text-[#3AAFDC] font-500">去发帖</text>
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped>
.fan-item {
  transition: background-color 0.2s ease;
}
.fan-item:active {
  background-color: #f8f8f8;
}
</style>
