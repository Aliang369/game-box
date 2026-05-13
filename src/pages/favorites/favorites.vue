<script lang="ts" setup>
import { useGameStore } from '@/store/game'
import { useFavoriteStore } from '@/store/favorite'
import type { Game } from '@/types/game.d'

definePage({
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '我的收藏',
  },
})

const gameStore = useGameStore()
const favoriteStore = useFavoriteStore()

// 进入页面时快照收藏列表，退出时才真正刷新
const snapshotIds = ref<string[]>([])

onLoad(() => {
  snapshotIds.value = [...favoriteStore.favoriteIds]
})

// 基于快照的游戏列表（不会因取消收藏而消失）
const favoriteGames = computed<Game[]>(() => {
  return snapshotIds.value
    .map(id => gameStore.findGame(id))
    .filter((game): game is Game => !!game)
})

function goToDetail(gameid: string) {
  uni.navigateTo({ url: `/pages/gamedetail/gamedetail?gameid=${gameid}` })
}

function toggleFavorite(gameid: string) {
  const added = favoriteStore.toggleFavorite(gameid)
  uni.showToast({ title: added ? '已收藏' : '已取消收藏', icon: 'none' })
}

function leftClick() {
  const pages = getCurrentPages()
  if (pages.length > 1) {
    uni.navigateBack({ delta: 1 })
  }
}
</script>

<template>
  <view class="min-h-100vh bg-[#F7F6FB]">
    <!-- 固定导航栏 -->
    <view
      class="fixed top-0 left-0 w-full z-2 h-90px flex items-center"
      style="background: linear-gradient(180deg, #E5F9FF 0%, #F7F6FB 100%)"
    >
      <view class="flex flex-row w-full h-25px pt-20px text-[#272E3B] text-18px justify-between mx-15px">
        <view @click="leftClick">
          <image src="/static/gamedetail/back_icon.png" mode="aspectFit" class="w-25px h-25px" />
        </view>
        <view class="leading-25px font-500">我的收藏</view>
        <view class="w-25px" />
      </view>
    </view>

    <!-- 收藏列表 -->
    <view class="pt-100px px-15px pb-30px">
      <!-- 空状态 -->
      <view v-if="favoriteGames.length === 0" class="flex flex-col items-center justify-center pt-100px">
        <view class="i-carbon-favorite w-60px h-60px text-[#ccc]" />
        <text class="text-14px text-[#999] mt-16px">暂无收藏的游戏</text>
        <text class="text-12px text-[#bbb] mt-8px">去游戏详情页点击收藏吧</text>
      </view>

      <!-- 游戏列表 -->
      <view v-else class="flex flex-col gap-12px">
        <view
          v-for="game in favoriteGames"
          :key="game.gameid"
          class="bg-white rounded-16px px-15px py-14px flex items-center gap-12px"
          @click="goToDetail(game.gameid)"
        >
          <!-- 游戏图标 -->
          <view class="w-60px h-60px rounded-12px overflow-hidden flex-shrink-0">
            <image :src="game.gameIcon" mode="aspectFill" class="w-full h-full" />
          </view>

          <!-- 游戏信息 -->
          <view class="flex-1 min-w-0">
            <view class="text-15px font-500 text-[#272E3B] truncate leading-22px">{{ game.gameName }}</view>
            <view class="flex gap-6px mt-4px items-center">
              <text v-if="game.gameType" class="text-11px text-[#12cdb0]">{{ game.gameType }}</text>
              <text
                v-for="tag in game.gameTags?.slice(0, 2)"
                :key="tag"
                class="text-11px text-[#A7A8A7]"
              >{{ tag }}</text>
            </view>
            <view class="text-12px text-[#7A7D7A] mt-4px leading-18px">{{ game.gameCount }}人在玩</view>
          </view>

          <!-- 收藏切换按钮 -->
          <view
            class="w-32px h-32px flex items-center justify-center flex-shrink-0"
            @click.stop="toggleFavorite(game.gameid)"
          >
            <view
              v-if="favoriteStore.isFavorite(game.gameid)"
              class="i-carbon-favorite-filled w-20px h-20px text-[#ff6b6b] transition-all duration-200"
            />
            <view
              v-else
              class="i-carbon-favorite w-20px h-20px text-[#ccc] transition-all duration-200"
            />
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
