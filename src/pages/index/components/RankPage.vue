<script lang="ts" setup>
import { useGameStore } from '@/store/game'
import type { Game } from '@/types/game.d'

const gameStore = useGameStore()

// 排行榜列表：按 gameCount 降序排列，取前50
const rankList = computed(() => {
  return [...gameStore.visibleGameList]
    .sort((a, b) => b.gameCount - a.gameCount)
    .slice(0, 50)
})

function handleClick(item: Game) {
  gameStore.incrementGameCount(item.gameid)
  uni.navigateTo({ url: `/pages/gamedetail/gamedetail?gameid=${item.gameid}` })
}
</script>

<template>
  <view>
    <view class="text-center text-12px text-[#a1a1b2] py-10px">
      -- 根据本周在玩人数计算 --
    </view>

    <view class="mt-10px">
      <view
        v-for="(item, index) in rankList"
        :key="item.gameid"
        class="flex items-center gap-10px my-10px"
        @click="handleClick(item)"
      >
        <!-- 排名数字 -->
        <view
          class="w-24px h-24px rounded-full flex justify-center items-center text-14px font-bold text-[#666] bg-[#f0f0f0] flex-shrink-0"
          :class="{
            'text-white': index < 3,
          }"
          :style="index === 0
            ? 'background: linear-gradient(135deg, #FFD700, #FFA500)'
            : index === 1
              ? 'background: linear-gradient(135deg, #C0C0C0, #A0A0A0)'
              : index === 2
                ? 'background: linear-gradient(135deg, #CD7F32, #B87333)'
                : ''
          "
        >
          {{ index + 1 }}
        </view>

        <!-- 游戏图标 -->
        <image :src="item.gameIcon" mode="aspectFill" class="w-60px h-60px rounded-12px flex-shrink-0" />

        <!-- 游戏信息 -->
        <view class="flex-1 min-w-0">
          <view class="text-16px font-600 truncate leading-22px">{{ item.gameName }}</view>
          <view class="flex gap-6px mt-4px items-center">
            <text class="inline-flex items-center h-16px leading-none text-11px text-[#12cdb0] rounded-4px">{{ item.gameType }}</text>
            <text
              v-for="tag in item.gameTags"
              :key="tag"
              class="inline-flex items-center h-16px leading-none text-11px text-[#A7A8A7] rounded-4px"
            >{{ tag }}</text>
          </view>
          <view class="text-12px text-[#999] mt-4px leading-17px">{{ item.gameCount }}人在玩</view>
        </view>

        <!-- 下载按钮 -->
        <button
          class="w-70px h-35px rounded-30px flex justify-center items-center text-white text-15px flex-shrink-0 border-none p-0"
          style="background: linear-gradient(95deg, #2bc18a, #5ad88c)"
          hover-class="opacity-70"
        >
          下载
        </button>
      </view>
    </view>

    <view class="bottom-text">没有更多了</view>
  </view>
</template>
