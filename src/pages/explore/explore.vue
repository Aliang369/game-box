<script lang="ts" setup>
import { useGameStore } from '@/store/game'

definePage({
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '福利',
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

/** 卡片点击跳转 */
function handleCardClick(item: any) {
  const { linkType, linkTarget } = item
  if (!linkType || !linkTarget) return

  switch (linkType) {
    case 'game':
      // 跳转到游戏详情页
      uni.navigateTo({ url: `/pages/gamedetail/gamedetail?gameid=${linkTarget}` })
      break
    case 'h5':
      // 跳转到 H5 链接（使用 webview 或外部浏览器）
      // #ifdef H5
      window.open(linkTarget, '_blank')
      // #endif
      // #ifdef APP-PLUS
      plus.runtime.openURL(linkTarget)
      // #endif
      // #ifdef MP-WEIXIN
      uni.setClipboardData({
        data: linkTarget,
        success: () => {
          uni.showToast({ title: '链接已复制，请在浏览器中打开', icon: 'none', duration: 2500 })
        },
      })
      // #endif
      break
    case 'post':
      // 跳转到帖子详情页
      uni.navigateTo({ url: `/pages/circle/detail?id=${linkTarget}` })
      break
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

    <!-- 空状态 -->
    <view v-if="gameStore.visibleExploreList.length === 0" class="flex flex-col items-center justify-center pt-120px">
      <image src="/static/explore/newsTop-title.png" mode="aspectFit" class="w-80px h-80px opacity-20" />
      <text class="text-15px text-[#C0C4CC] mt-16px">暂无福利活动</text>
      <text class="text-13px text-[#D9D9D9] mt-8px">敬请期待，精彩活动即将上线</text>
    </view>

    <!-- 探索列表 -->
    <view
      v-for="item in gameStore.visibleExploreList"
      :key="item.exploreId"
      class="mx-15px mb-20px h-210px bg-white rounded-15px overflow-hidden"
      @click="handleCardClick(item)"
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

    <view v-if="gameStore.visibleExploreList.length > 0" class="bottom-text">没有更多了</view>
  </view>
</template>
