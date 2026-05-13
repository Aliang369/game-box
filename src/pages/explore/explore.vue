<script lang="ts" setup>
import { useGameStore } from '@/store/game'

definePage({
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '探索',
  },
})

const gameStore = useGameStore()

// 根据状态码返回显示文本
function getStateText(state: number): string {
  switch (state) {
    case 0: return '进行中'
    case 1: return '待开始'
    case 2: return '已结束'
    default: return '未知状态'
  }
}

// 根据状态码返回渐变样式
function getStateStyle(state: number): string {
  switch (state) {
    case 0: return 'background: linear-gradient(95deg, #1AE0BA, #0DEEA3)'
    case 1: return 'background: linear-gradient(95deg, #A0A0A0, #D0D0D0); color: #333'
    case 2: return 'background: linear-gradient(95deg, #FF6B6B, #FF8787)'
    default: return ''
  }
}
</script>

<template>
  <view>
    <!-- 顶部标题 -->
    <view style="background: linear-gradient(180deg, #E5F9FF 0%, #F7F6FB 100%)">
      <view class="w-142px h-32px pt-70px px-15px pb-10px">
        <image src="/static/explore/newsTop-title.png" class="w-full h-full" />
      </view>
    </view>

    <!-- 探索列表 -->
    <view
      v-for="item in gameStore.visibleExploreList"
      :key="item.exploreId"
      class="mx-15px mb-20px h-210px bg-white rounded-15px overflow-hidden"
    >
      <view class="mx-15px my-10px flex items-center justify-between">
        <view
          class="w-80px h-25px leading-25px text-white font-600 rounded-30px text-center text-14px"
          :style="getStateStyle(item.exploreState)"
        >
          {{ getStateText(item.exploreState) }}
        </view>
        <view class="text-14px text-[#747474] leading-20px">{{ item.exploreDate }}</view>
      </view>
      <view class="h-150px mx-15px rounded-15px overflow-hidden">
        <image :src="item.exploreImage" mode="scaleToFill" class="w-full h-165px" />
      </view>
    </view>

    <view class="bottom-text">没有更多了</view>
  </view>
</template>
