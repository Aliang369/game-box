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

// Tab 切换
const currentTab = ref('games')
const tabs = [
  { key: 'games', label: '游戏' },
  { key: 'posts', label: '帖子' },
]

function switchTab(key: string) {
  currentTab.value = key
}

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

// 模拟收藏的帖子数据
const favoritePosts = ref([
  {
    id: 1,
    title: '黑神话悟空第三章通关心得',
    author: '一念',
    avatar: '/static/logo.png',
    content: '刚通关了《黑神话：悟空》第三章，boss战太震撼了！',
    comments: 32,
    likes: 128,
    views: 356,
    time: '2小时前',
    favorited: true,
  },
  {
    id: 2,
    title: '宝藏独立游戏推荐',
    author: '游戏达人',
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cute%20cartoon%20girl%20gamer%20avatar%20pink%20hair%20purple%20background&image_size=square',
    content: '推荐一款最近发现的独立游戏，画风超赞，玩法也很有创意',
    comments: 12,
    likes: 56,
    views: 203,
    time: '5小时前',
    favorited: true,
  },
  {
    id: 3,
    title: '平民阵容搭配思路分享',
    author: '云玩家',
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=mysterious%20hooded%20character%20avatar%20dark%20fantasy%20style%20orange%20background&image_size=square',
    content: '今天的日常任务终于肝完了，分享一下我的阵容搭配思路',
    comments: 21,
    likes: 89,
    views: 412,
    time: '昨天',
    favorited: true,
  },
])

function goToDetail(gameid: string) {
  uni.navigateTo({ url: `/pages/gamedetail/gamedetail?gameid=${gameid}` })
}

function goToPostDetail(postId: number) {
  uni.navigateTo({ url: `/pages/circle/detail?id=${postId}` })
}

function toggleFavorite(gameid: string) {
  const added = favoriteStore.toggleFavorite(gameid)
  uni.showToast({ title: added ? '已收藏' : '已取消收藏', icon: 'none' })
}

function togglePostFavorite(post: typeof favoritePosts.value[0]) {
  post.favorited = !post.favorited
  uni.showToast({ title: post.favorited ? '已收藏' : '已取消收藏', icon: 'none' })
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
      <view class="flex flex-row w-full pt-20px mx-15px items-center justify-between">
        <view class="flex-2 min-w-0" @click="leftClick">
          <image src="/static/gamedetail/back_icon.png" mode="aspectFit" class="w-25px h-25px" />
        </view>
        <view class="flex-2 min-w-0 text-center text-18px text-[#272E3B] font-500">我的收藏</view>
        <view class="flex-2 min-w-0" />
      </view>
    </view>

    <!-- Tab 切换 -->
    <view class="fixed top-90px left-0 w-full z-2 bg-[#F7F6FB] px-20px pb-6px pt-4px">
      <view class="flex items-center gap-24px">
        <view
          v-for="tab in tabs"
          :key="tab.key"
          class="tab-item relative pb-10px"
          @click="switchTab(tab.key)"
        >
          <text
            class="font-500"
            :class="currentTab === tab.key ? 'text-16px text-[#272E3B] font-700' : 'text-15px text-[#8F96A3]'"
          >{{ tab.label }}</text>
          <view
            v-if="currentTab === tab.key"
            class="absolute bottom-0 left-50% h-3px w-20px rounded-2px -translate-x-50%"
            style="background: linear-gradient(90deg, #2bc18a, #12cdb0)"
          />
        </view>
      </view>
    </view>

    <!-- 内容区域 -->
    <view class="pt-140px px-15px pb-30px">
      <!-- 游戏收藏 -->
      <template v-if="currentTab === 'games'">
        <!-- 空状态 -->
        <view v-if="favoriteGames.length === 0" class="flex flex-col items-center justify-center pt-80px">
          <view class="h-64px w-64px flex items-center justify-center rounded-full bg-[#F0FAFB]">
            <view class="i-carbon-favorite w-32px h-32px text-[#C0E8F0]" />
          </view>
          <text class="mt-16px text-14px text-[#8F96A3]">暂无收藏的游戏</text>
          <text class="mt-8px text-12px text-[#C0C4CC]">去游戏详情页点击收藏吧</text>
        </view>

        <!-- 游戏列表 -->
        <view v-else class="flex flex-col gap-10px">
          <view
            v-for="game in favoriteGames"
            :key="game.gameid"
            class="bg-white rounded-16px px-15px py-14px flex items-center gap-12px"
            style="box-shadow: 0 2px 8px rgba(53, 64, 90, 0.04)"
            @click="goToDetail(game.gameid)"
          >
            <!-- 游戏图标 -->
            <view class="w-56px h-56px rounded-12px overflow-hidden flex-shrink-0">
              <image :src="game.gameIcon" mode="aspectFill" class="w-full h-full" />
            </view>

            <!-- 游戏信息 -->
            <view class="flex-1 min-w-0">
              <text class="text-15px font-500 text-[#272E3B] truncate leading-20px">{{ game.gameName }}</text>
              <view class="flex gap-6px items-center">
                <text class="inline-flex items-center h-16px leading-none text-11px text-[#12cdb0] rounded-4px">{{ game.gameType }}</text>
                <text
                  v-for="tag in game.gameTags?.slice(0, 2)"
                  :key="tag"
                  class="inline-flex items-center h-16px leading-none text-11px text-[#A7A8A7] rounded-4px"
                >{{ tag }}</text>
              </view>
              <text class="text-12px text-[#7A7D7A] leading-16px">{{ game.gameCount }}人在玩</text>
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
      </template>

      <!-- 帖子收藏 -->
      <template v-if="currentTab === 'posts'">
        <!-- 空状态 -->
        <view v-if="favoritePosts.length === 0" class="flex flex-col items-center justify-center pt-80px">
          <view class="h-64px w-64px flex items-center justify-center rounded-full bg-[#F0FAFB]">
            <view class="i-carbon-favorite w-32px h-32px text-[#C0E8F0]" />
          </view>
          <text class="mt-16px text-14px text-[#8F96A3]">暂无收藏的帖子</text>
          <text class="mt-8px text-12px text-[#C0C4CC]">去圈子收藏感兴趣的帖子吧</text>
        </view>

        <!-- 帖子列表 -->
        <view v-else class="flex flex-col gap-10px">
          <view
            v-for="post in favoritePosts"
            :key="post.id"
            class="bg-white rounded-16px px-15px py-14px flex items-center gap-12px"
            style="box-shadow: 0 2px 8px rgba(53, 64, 90, 0.04)"
            @click="goToPostDetail(post.id)"
          >
            <!-- 作者头像 -->
            <view class="w-42px h-42px rounded-full overflow-hidden flex-shrink-0">
              <image :src="post.avatar" mode="aspectFill" class="w-full h-full" />
            </view>

            <!-- 帖子信息 -->
            <view class="flex-1 min-w-0">
              <text class="block text-15px font-500 text-[#272E3B] truncate leading-22px">{{ post.title || post.content }}</text>
              <view class="flex items-center gap-8px mt-4px">
                <text class="text-12px text-[#8F96A3]">{{ post.author }}</text>
                <text class="text-12px text-[#C0C4CC]">·</text>
                <text class="text-11px text-[#C0C4CC]">{{ post.time }}</text>
              </view>
              <view class="flex items-center gap-12px mt-4px">
                <view class="flex items-center gap-3px">
                  <view class="i-carbon-view h-12px w-12px text-[#C0C4CC]" />
                  <text class="text-11px text-[#8F96A3]">{{ post.views }}</text>
                </view>
                <view class="flex items-center gap-3px">
                  <view class="i-carbon-chat h-12px w-12px text-[#C0C4CC]" />
                  <text class="text-11px text-[#8F96A3]">{{ post.comments }}</text>
                </view>
                <view class="flex items-center gap-3px">
                  <view class="i-carbon-thumbs-up h-12px w-12px text-[#C0C4CC]" />
                  <text class="text-11px text-[#8F96A3]">{{ post.likes }}</text>
                </view>
              </view>
            </view>

            <!-- 收藏切换按钮 -->
            <view
              class="w-32px h-32px flex items-center justify-center flex-shrink-0"
              @click.stop="togglePostFavorite(post)"
            >
              <view
                v-if="post.favorited"
                class="i-carbon-favorite-filled w-20px h-20px text-[#ff6b6b] transition-all duration-200"
              />
              <view
                v-else
                class="i-carbon-favorite w-20px h-20px text-[#ccc] transition-all duration-200"
              />
            </view>
          </view>
        </view>
      </template>
    </view>
  </view>
</template>

<style scoped>
.tab-item {
  transition: all 0.2s ease;
}
</style>
