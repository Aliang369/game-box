<script lang="ts" setup>
import { useGameStore } from '@/store/game'

definePage({
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '浏览历史',
  },
})

const gameStore = useGameStore()

// Tab 切换
const currentTab = ref('games')
const tabs = [
  { key: 'games', label: '游戏' },
  { key: 'posts', label: '帖子' },
]

function switchTab(key: string) {
  currentTab.value = key
}

// 模拟游戏浏览历史（按时间分组）
const gameHistory = ref([
  {
    date: '今天',
    items: [
      { gameid: '1', time: '22:30' },
      { gameid: '2', time: '18:15' },
    ],
  },
  {
    date: '昨天',
    items: [
      { gameid: '3', time: '20:45' },
      { gameid: '4', time: '14:20' },
      { gameid: '5', time: '10:00' },
    ],
  },
  {
    date: '3天前',
    items: [
      { gameid: '1', time: '19:30' },
    ],
  },
])

// 模拟帖子浏览历史
const postHistory = ref([
  {
    date: '今天',
    items: [
      {
        id: 1,
        title: '黑神话悟空第三章通关心得',
        content: '刚通关了第三章，boss战太震撼了！',
        author: '一念',
        avatar: '/static/logo.png',
        time: '21:00',
        comments: 32,
        likes: 128,
        views: 356,
      },
      {
        id: 2,
        title: '',
        content: '推荐一款最近发现的独立游戏，画风超赞，玩法也很有创意',
        author: '游戏达人',
        avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cute%20cartoon%20girl%20gamer%20avatar%20pink%20hair%20purple%20background&image_size=square',
        time: '16:40',
        comments: 12,
        likes: 56,
        views: 203,
      },
    ],
  },
  {
    date: '昨天',
    items: [
      {
        id: 3,
        title: '周末组队打副本招人',
        content: '有人组队打副本吗？周末晚上8点',
        author: '像素猎人',
        avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cool%20robot%20mech%20avatar%20icon%20sci-fi%20neon%20green%20background&image_size=square',
        time: '22:10',
        comments: 45,
        likes: 23,
        views: 178,
      },
      {
        id: 4,
        title: '平民阵容搭配思路分享',
        content: '今天的日常任务终于肝完了，分享一下我的阵容搭配思路',
        author: '云玩家',
        avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=mysterious%20hooded%20character%20avatar%20dark%20fantasy%20style%20orange%20background&image_size=square',
        time: '15:30',
        comments: 21,
        likes: 89,
        views: 412,
      },
    ],
  },
])

// 根据 gameid 获取游戏信息
function getGame(gameid: string) {
  return gameStore.findGame(gameid)
}

function leftClick() {
  const pages = getCurrentPages()
  if (pages.length > 1) {
    uni.navigateBack({ delta: 1 })
  }
}

function goToGameDetail(gameid: string) {
  uni.navigateTo({ url: `/pages/gamedetail/gamedetail?gameid=${gameid}` })
}

function goToPostDetail(postId: number) {
  uni.navigateTo({ url: `/pages/circle/detail?id=${postId}` })
}

function clearHistory() {
  if (currentTab.value === 'games') {
    gameHistory.value = []
  }
  else {
    postHistory.value = []
  }
  uni.showToast({ title: '已清空', icon: 'none' })
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
        <view class="flex-2 min-w-0 text-center text-18px text-[#272E3B] font-500">浏览历史</view>
        <view class="flex-2 min-w-0 text-right">
          <text class="text-13px text-[#8F96A3]" @click="clearHistory">清空</text>
        </view>
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
      <!-- 游戏浏览历史 -->
      <template v-if="currentTab === 'games'">
        <!-- 空状态 -->
        <view v-if="gameHistory.length === 0" class="flex flex-col items-center justify-center pt-80px">
          <view class="h-64px w-64px flex items-center justify-center rounded-full bg-[#F0FAFB]">
            <view class="i-carbon-time h-32px w-32px text-[#C0E8F0]" />
          </view>
          <text class="mt-16px text-14px text-[#8F96A3]">暂无浏览记录</text>
          <text class="mt-8px text-12px text-[#C0C4CC]">去发现更多好玩的游戏吧</text>
        </view>

        <!-- 按日期分组 -->
        <view v-for="group in gameHistory" :key="group.date" class="mb-20px">
          <view class="flex items-center gap-8px mb-10px">
            <view class="h-4px w-4px rounded-full bg-[#12cdb0]" />
            <text class="text-13px text-[#8F96A3] font-500">{{ group.date }}</text>
          </view>

          <view class="flex flex-col gap-10px">
            <view
              v-for="item in group.items"
              :key="item.gameid + item.time"
              class="bg-white rounded-16px px-15px py-14px flex items-center gap-12px"
              style="box-shadow: 0 2px 8px rgba(53, 64, 90, 0.04)"
              @click="goToGameDetail(item.gameid)"
            >
              <!-- 游戏图标 -->
              <view class="w-56px h-56px rounded-12px overflow-hidden flex-shrink-0">
                <image :src="getGame(item.gameid)?.gameIcon" mode="aspectFill" class="w-full h-full" />
              </view>

              <!-- 游戏信息 -->
              <view class="flex-1 min-w-0">
                <text class="text-15px font-500 text-[#272E3B] truncate leading-20px">{{ getGame(item.gameid)?.gameName }}</text>
                <view class="flex gap-6px items-center">
                  <text class="inline-flex items-center h-16px leading-none text-11px text-[#12cdb0] rounded-4px">{{ getGame(item.gameid)?.gameType }}</text>
                  <text
                    v-for="tag in getGame(item.gameid)?.gameTags?.slice(0, 2)"
                    :key="tag"
                    class="inline-flex items-center h-16px leading-none text-11px text-[#A7A8A7] rounded-4px"
                  >{{ tag }}</text>
                </view>
                <text class="text-11px text-[#C0C4CC] leading-16px">{{ item.time }} 浏览</text>
              </view>

              <!-- 箭头 -->
              <image src="/static/user/right_icon.png" class="h-14px w-14px flex-shrink-0 opacity-40" />
            </view>
          </view>
        </view>
      </template>

      <!-- 帖子浏览历史 -->
      <template v-if="currentTab === 'posts'">
        <!-- 空状态 -->
        <view v-if="postHistory.length === 0" class="flex flex-col items-center justify-center pt-80px">
          <view class="h-64px w-64px flex items-center justify-center rounded-full bg-[#F0FAFB]">
            <view class="i-carbon-time h-32px w-32px text-[#C0E8F0]" />
          </view>
          <text class="mt-16px text-14px text-[#8F96A3]">暂无浏览记录</text>
          <text class="mt-8px text-12px text-[#C0C4CC]">去圈子看看大家在聊什么吧</text>
        </view>

        <!-- 按日期分组 -->
        <view v-for="group in postHistory" :key="group.date" class="mb-20px">
          <view class="flex items-center gap-8px mb-10px">
            <view class="h-4px w-4px rounded-full bg-[#12cdb0]" />
            <text class="text-13px text-[#8F96A3] font-500">{{ group.date }}</text>
          </view>

          <view class="flex flex-col gap-10px">
            <view
              v-for="item in group.items"
              :key="item.id"
              class="bg-white rounded-16px px-15px py-14px flex items-center gap-12px"
              style="box-shadow: 0 2px 8px rgba(53, 64, 90, 0.04)"
              @click="goToPostDetail(item.id)"
            >
              <!-- 作者头像 -->
              <view class="w-42px h-42px rounded-full overflow-hidden flex-shrink-0">
                <image :src="item.avatar" mode="aspectFill" class="w-full h-full" />
              </view>

              <!-- 帖子信息 -->
              <view class="flex-1 min-w-0">
                <text class="block text-15px font-500 text-[#272E3B] truncate leading-22px">{{ item.title || item.content }}</text>
                <view class="flex items-center gap-8px mt-4px">
                  <text class="text-12px text-[#8F96A3]">{{ item.author }}</text>
                  <text class="text-12px text-[#C0C4CC]">·</text>
                  <text class="text-11px text-[#C0C4CC]">{{ item.time }} 浏览</text>
                </view>
                <view class="flex items-center gap-12px mt-4px">
                  <view class="flex items-center gap-3px">
                    <view class="i-carbon-view h-12px w-12px text-[#C0C4CC]" />
                    <text class="text-11px text-[#8F96A3]">{{ item.views }}</text>
                  </view>
                  <view class="flex items-center gap-3px">
                    <view class="i-carbon-chat h-12px w-12px text-[#C0C4CC]" />
                    <text class="text-11px text-[#8F96A3]">{{ item.comments }}</text>
                  </view>
                  <view class="flex items-center gap-3px">
                    <view class="i-carbon-thumbs-up h-12px w-12px text-[#C0C4CC]" />
                    <text class="text-11px text-[#8F96A3]">{{ item.likes }}</text>
                  </view>
                </view>
              </view>

              <!-- 箭头 -->
              <image src="/static/user/right_icon.png" class="h-14px w-14px flex-shrink-0 opacity-40" />
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
