<script lang="ts" setup>
import { useAnnouncementStore } from '@/store/announcement'
import { useFollowStore } from '@/store/follow'
import { useTokenStore } from '@/store/token'

definePage({
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '圈子',
  },
})

const followStore = useFollowStore()
const tokenStore = useTokenStore()
const announcementStore = useAnnouncementStore()
const isLoggedIn = computed(() => tokenStore.hasLogin)

// Tab 切换
const currentTab = ref('recommend')
const currentIndex = ref(1) // 默认推荐 Tab（index 1）
const tabs = [
  { key: 'follow', label: '关注' },
  { key: 'recommend', label: '推荐' },
  { key: 'forum', label: '论坛' },
]

function switchTab(key: string) {
  currentTab.value = key
  currentIndex.value = tabs.findIndex(t => t.key === key)
}

function onSwiperChange(e: any) {
  const index = e.detail.current
  currentIndex.value = index
  currentTab.value = tabs[index].key
}

// ========== 推荐 Tab 数据 ==========
const posts = ref([
  {
    id: 1,
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=anime%20style%20male%20gamer%20avatar%20portrait%20with%20headphones%20blue%20background&image_size=square',
    nickname: '一念',
    time: '2小时前',
    title: '黑神话悟空第三章通关心得',
    content: '刚通关了《黑神话：悟空》第三章，boss战太震撼了！有没有人一起讨论下攻略？',
    images: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=black%20myth%20wukong%20epic%20boss%20battle%20scene%20chinese%20mythology%20dark%20fantasy%20game%20screenshot&image_size=landscape_16_9',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=black%20myth%20wukong%20monkey%20king%20fighting%20giant%20demon%20cinematic%20game%20art&image_size=landscape_16_9',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20mythology%20temple%20ruins%20dark%20atmosphere%20game%20environment%20concept%20art&image_size=landscape_16_9',
    ],
    imageDirection: 'horizontal',
    likes: 128,
    comments: 32,
    liked: false,
    followed: false,
    views: 356,
    lastReplyTime: Date.now() - 15 * 60 * 1000,
  },
  {
    id: 2,
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cute%20cartoon%20girl%20gamer%20avatar%20pink%20hair%20purple%20background&image_size=square',
    nickname: '游戏达人',
    time: '5小时前',
    title: '宝藏独立游戏推荐',
    content: '推荐一款最近发现的独立游戏，画风超赞，玩法也很有创意，周末可以试试看',
    images: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=indie%20game%20pixel%20art%20colorful%20fantasy%20world%20beautiful%20landscape%20screenshot&image_size=landscape_16_9',
    ],
    imageDirection: 'horizontal',
    likes: 56,
    comments: 12,
    liked: true,
    followed: true,
    views: 203,
    lastReplyTime: Date.now() - 3 * 60 * 60 * 1000,
  },
  {
    id: 3,
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cool%20robot%20mech%20avatar%20icon%20sci-fi%20neon%20green%20background&image_size=square',
    nickname: '像素猎人',
    time: '昨天',
    title: '周末组队打副本招人',
    content: '有人组队打副本吗？周末晚上8点，差一个奶妈位，来个治疗大佬带带我们！',
    images: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=mmorpg%20dungeon%20raid%20team%20battle%20fantasy%20warriors%20and%20healers%20epic%20game%20scene&image_size=landscape_16_9',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=fantasy%20game%20character%20selection%20screen%20healer%20class%20glowing%20magic&image_size=landscape_16_9',
    ],
    imageDirection: 'horizontal',
    likes: 23,
    comments: 45,
    liked: false,
    followed: false,
    views: 178,
    lastReplyTime: Date.now() - 26 * 60 * 60 * 1000,
  },
  {
    id: 4,
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=mysterious%20hooded%20character%20avatar%20dark%20fantasy%20style%20orange%20background&image_size=square',
    nickname: '云玩家',
    time: '昨天',
    title: '平民阵容搭配思路分享',
    content: '今天的日常任务终于肝完了，分享一下我的阵容搭配思路，希望对新手有帮助',
    images: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=gacha%20game%20team%20lineup%20strategy%20guide%20character%20cards%20arrangement%20mobile%20game&image_size=landscape_16_9',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=mobile%20game%20character%20stats%20screen%20RPG%20equipment%20upgrade%20interface&image_size=landscape_16_9',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=anime%20style%20game%20characters%20team%20composition%20five%20heroes%20standing%20together&image_size=landscape_16_9',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=game%20daily%20quest%20completion%20reward%20chest%20golden%20light%20celebration&image_size=landscape_16_9',
    ],
    imageDirection: 'horizontal',
    likes: 89,
    comments: 21,
    followed: false,
    liked: false,
    views: 412,
    lastReplyTime: Date.now() - 2 * 24 * 60 * 60 * 1000,
  },
  {
    id: 5,
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=fantasy%20elf%20character%20avatar%20green%20eyes%20magical%20forest%20background&image_size=square',
    nickname: '星辰大海',
    time: '3小时前',
    title: '新角色立绘壁纸分享',
    content: '新角色立绘也太好看了吧，直接设成壁纸了！',
    images: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=beautiful%20anime%20character%20full%20body%20illustration%20fantasy%20warrior%20princess%20vertical%20portrait&image_size=portrait_4_3',
    ],
    imageDirection: 'vertical',
    likes: 215,
    comments: 67,
    liked: false,
    followed: false,
    views: 890,
    lastReplyTime: Date.now() - 45 * 60 * 1000,
  },
])

// ========== 关注 Tab 数据 ==========
const followPosts = computed(() => {
  // 筛选已关注用户的帖子
  return posts.value.filter(post => followStore.isFollowed(String(post.id)))
})

// ========== 论坛 Tab 数据 ==========
const forumSections = ref([
  {
    id: 1,
    title: '综合讨论',
    description: '游戏相关的一切话题',
    icon: 'i-carbon-chat',
    color: '#3AAFDC',
    bgColor: '#E5F9FF',
    posts: 1256,
    today: 38,
  },
  {
    id: 2,
    title: '攻略专区',
    description: '通关攻略、角色养成、阵容推荐',
    icon: 'i-carbon-book',
    color: '#2BC18A',
    bgColor: '#E5FFF5',
    posts: 892,
    today: 24,
  },
  {
    id: 3,
    title: '组队招募',
    description: '找队友、开黑、副本组队',
    icon: 'i-carbon-group',
    color: '#FF9800',
    bgColor: '#FFF3E0',
    posts: 634,
    today: 56,
  },
  {
    id: 4,
    title: '游戏反馈',
    description: 'Bug反馈、建议、优化意见',
    icon: 'i-carbon-warning-alt',
    color: '#F44336',
    bgColor: '#FFEBEE',
    posts: 421,
    today: 12,
  },
  {
    id: 5,
    title: '创意工坊',
    description: '同人创作、壁纸分享、视频剪辑',
    icon: 'i-carbon-paint-brush',
    color: '#9C27B0',
    bgColor: '#F3E5F5',
    posts: 567,
    today: 19,
  },
  {
    id: 6,
    title: '交易市场',
    description: '账号交易、道具交换、代练服务',
    icon: 'i-carbon-shopping-cart',
    color: '#FF5722',
    bgColor: '#FBE9E7',
    posts: 345,
    today: 8,
  },
])

// ========== 通用方法 ==========
function toggleLike(post: typeof posts.value[0]) {
  post.liked = !post.liked
  post.likes += post.liked ? 1 : -1
}

function formatReplyTime(timestamp: number) {
  const diff = Date.now() - timestamp
  const minutes = Math.floor(diff / (60 * 1000))
  const hours = Math.floor(diff / (60 * 60 * 1000))
  const days = Math.floor(diff / (24 * 60 * 60 * 1000))
  const months = Math.floor(diff / (30 * 24 * 60 * 60 * 1000))
  const years = Math.floor(diff / (365 * 24 * 60 * 60 * 1000))
  if (minutes < 1) return '回复于 刚刚'
  if (minutes < 60) return `回复于 ${minutes}分钟前`
  if (hours < 24) return `回复于 ${hours}小时前`
  if (days < 30) return `回复于 ${days}天前`
  if (months < 12) return `回复于 ${months}个月前`
  return `回复于 ${years}年前`
}

function goDetail(post: typeof posts.value[0]) {
  uni.navigateTo({
    url: `/pages/circle/detail?id=${post.id}`,
  })
}

function formatCount(count: number) {
  if (count >= 10000) return `${(count / 10000).toFixed(1)}w`
  if (count >= 1000) return `${(count / 1000).toFixed(1)}k`
  return `${count}`
}

function goForum(section: typeof forumSections.value[0]) {
  uni.navigateTo({
    url: `/pages/forum/forum?id=${section.id}&title=${encodeURIComponent(section.title)}&color=${encodeURIComponent(section.color)}`,
  })
}
</script>

<template>
  <view class="circle-page min-h-100vh bg-[#F7F7FA]">
    <!-- 顶部 Tab -->
    <view class="circle-header" style="background: linear-gradient(180deg, #E5F9FF 0%, #F7F7FA 100%)">
      <!-- Tab 栏 -->
      <view class="flex items-center gap-28px px-20px pt-60px pb-6px">
        <view
          v-for="tab in tabs"
          :key="tab.key"
          class="tab-item relative pb-10px"
          :class="{ 'tab-active': currentTab === tab.key }"
          @click="switchTab(tab.key)"
        >
          <text
            class="font-500"
            :class="currentTab === tab.key ? 'text-20px text-[#272E3B] font-700' : 'text-16px text-[#8F96A3]'"
          >{{ tab.label }}</text>
          <!-- 下划线指示器 -->
          <view
            v-if="currentTab === tab.key"
            class="absolute bottom-0 left-50% h-3px w-20px rounded-2px -translate-x-50%"
            style="background: linear-gradient(90deg, #3AAFDC, #2BC18A)"
          />
        </view>
      </view>
    </view>

    <!-- Swiper 内容区域 -->
    <swiper
      class="tab-swiper"
      :current="currentIndex"
      :duration="250"
      @change="onSwiperChange"
    >
      <!-- ========== 关注 Tab ========== -->
      <swiper-item>
        <scroll-view scroll-y class="h-full">
          <!-- 未登录状态 -->
          <view v-if="!isLoggedIn" class="flex flex-col items-center justify-center pt-80px">
            <view class="flex h-72px w-72px items-center justify-center rounded-full bg-[#F0FAFB]">
              <view class="i-carbon-locked h-36px w-36px text-[#C0E8F0]" />
            </view>
            <text class="mt-18px text-15px text-[#8F96A3]">登录后查看关注内容</text>
            <text class="mt-8px text-13px text-[#C0C4CC]">登录后可以关注感兴趣的用户</text>
            <view
              class="mt-20px flex h-38px w-110px items-center justify-center rounded-30px"
              style="background: linear-gradient(135deg, #3AAFDC 0%, #2BC18A 100%)"
              @click="uni.navigateTo({ url: '/pages/login/index' })"
            >
              <text class="text-14px text-white font-500">去登录</text>
            </view>
          </view>

          <!-- 已登录 - 有关注内容 -->
          <view v-else-if="followPosts.length > 0" class="px-15px pb-120px">
            <view
              v-for="post in followPosts"
              :key="post.id"
              class="post-card mb-12px rounded-16px bg-white px-16px py-16px"
              style="box-shadow: 0 2px 8px rgba(53, 64, 90, 0.04)"
              @click="goDetail(post)"
            >
              <view class="flex items-center gap-10px">
                <view class="h-38px w-38px overflow-hidden rounded-full">
                  <image :src="post.avatar" mode="aspectFill" class="h-full w-full" />
                </view>
                <text class="flex-1 text-14px text-[#272E3B] font-600">{{ post.nickname }}</text>
              </view>
              <!-- 标题 -->
              <text v-if="post.title" class="mt-10px text-15px text-[#272E3B] font-600 leading-22px">{{ post.title }}</text>
              <!-- 正文 -->
              <view class="mt-8px">
                <text class="text-14px text-[#3D3D3D] leading-22px">{{ post.content }}</text>
              </view>

              <!-- 图片 -->
              <view v-if="post.images.length === 1 && post.imageDirection === 'horizontal'" class="mt-12px">
                <view class="h-180px w-full overflow-hidden rounded-12px">
                  <image :src="post.images[0]" mode="aspectFill" class="h-full w-full" />
                </view>
              </view>
              <view v-else-if="post.images.length === 1 && post.imageDirection === 'vertical'" class="mt-12px">
                <view class="h-260px w-60% overflow-hidden rounded-12px">
                  <image :src="post.images[0]" mode="aspectFill" class="h-full w-full" />
                </view>
              </view>
              <view v-else-if="post.images.length === 2" class="mt-12px flex gap-6px">
                <view class="h-150px flex-1 overflow-hidden rounded-12px">
                  <image :src="post.images[0]" mode="aspectFill" class="h-full w-full" />
                </view>
                <view class="h-150px flex-1 overflow-hidden rounded-12px">
                  <image :src="post.images[1]" mode="aspectFill" class="h-full w-full" />
                </view>
              </view>
              <view v-else-if="post.images.length === 3" class="mt-12px flex gap-6px">
                <view class="flex-1 aspect-square overflow-hidden rounded-12px">
                  <image :src="post.images[0]" mode="aspectFill" class="h-full w-full" />
                </view>
                <view class="flex-1 aspect-square overflow-hidden rounded-12px">
                  <image :src="post.images[1]" mode="aspectFill" class="h-full w-full" />
                </view>
                <view class="flex-1 aspect-square overflow-hidden rounded-12px">
                  <image :src="post.images[2]" mode="aspectFill" class="h-full w-full" />
                </view>
              </view>
              <view v-else-if="post.images.length >= 4" class="relative mt-12px">
                <view class="h-180px w-full overflow-hidden rounded-12px">
                  <image :src="post.images[0]" mode="aspectFill" class="h-full w-full" />
                </view>
                <view class="absolute bottom-8px right-8px flex items-center gap-4px rounded-12px bg-black/50 px-8px py-4px">
                  <view class="i-carbon-image h-14px w-14px text-white" />
                  <text class="text-12px text-white font-500">{{ post.images.length }}</text>
                </view>
              </view>

              <!-- 互动栏 -->
              <view class="mt-14px flex items-center gap-24px">
                <text class="text-11px text-[#C0C4CC]">{{ formatReplyTime(post.lastReplyTime) }}</text>
                <view class="ml-auto flex items-center gap-24px">
                  <view class="flex items-center gap-4px">
                    <view class="i-carbon-view h-16px w-16px text-[#C0C4CC]" />
                    <text class="text-12px text-[#8F96A3]">{{ post.views }}</text>
                  </view>
                  <view class="flex items-center gap-4px">
                    <view class="i-carbon-chat h-16px w-16px text-[#C0C4CC]" />
                    <text class="text-12px text-[#8F96A3]">{{ post.comments }}</text>
                  </view>
                  <view class="flex items-center gap-4px" @click.stop="toggleLike(post)">
                    <view
                      class="h-18px w-18px"
                      :class="post.liked ? 'i-carbon-thumbs-up-filled text-[#3AAFDC]' : 'i-carbon-thumbs-up text-[#C0C4CC]'"
                    />
                    <text class="text-12px text-[#8F96A3]">{{ post.likes }}</text>
                  </view>
                </view>
              </view>
            </view>
          </view>

          <!-- 已登录 - 空状态 -->
          <view v-else class="flex flex-col items-center justify-center pt-80px">
            <view class="flex h-72px w-72px items-center justify-center rounded-full bg-[#F0FAFB]">
              <view class="i-carbon-user-favorite h-36px w-36px text-[#C0E8F0]" />
            </view>
            <text class="mt-18px text-15px text-[#8F96A3]">关注的人还没有发帖</text>
            <text class="mt-8px text-13px text-[#C0C4CC]">去推荐页发现更多有趣的人吧</text>
            <view
              class="mt-20px flex h-36px w-100px items-center justify-center rounded-30px bg-[#E5F9FF]"
              @click="switchTab('recommend')"
            >
              <text class="text-13px text-[#3AAFDC] font-500">去看看</text>
            </view>
          </view>
        </scroll-view>
      </swiper-item>

      <!-- ========== 推荐 Tab ========== -->
      <swiper-item>
        <scroll-view scroll-y class="h-full">
          <!-- 全局公告 -->
          <view v-if="announcementStore.globalAnnouncements.length > 0" class="mx-15px mt-8px mb-8px rounded-12px bg-white px-14px py-10px" style="box-shadow: 0 1px 4px rgba(53, 64, 90, 0.04)">
            <view
              v-for="item in announcementStore.globalAnnouncements"
              :key="item.id"
              class="flex items-center gap-8px py-6px"
            >
              <view
                class="flex h-18px flex-shrink-0 items-center rounded-4px px-5px"
                :class="{
                  'bg-[#E5F9FF]': item.tag === '公告',
                  'bg-[#FFF3E0]': item.tag === '活动',
                  'bg-[#FFEBEE]': item.tag === '维护',
                  'bg-[#E8F5E9]': item.tag === '更新',
                }"
              >
                <text
                  class="text-10px font-500"
                  :class="{
                    'text-[#3AAFDC]': item.tag === '公告',
                    'text-[#FF9800]': item.tag === '活动',
                    'text-[#F44336]': item.tag === '维护',
                    'text-[#4CAF50]': item.tag === '更新',
                  }"
                >{{ item.tag }}</text>
              </view>
              <text class="flex-1 text-13px text-[#272E3B] truncate">{{ item.title }}</text>
            </view>
          </view>

          <!-- 帖子列表 -->
          <view class="px-15px pb-120px">
            <view
              v-for="post in posts"
              :key="post.id"
              class="post-card mb-12px rounded-16px bg-white px-16px py-16px"
              style="box-shadow: 0 2px 8px rgba(53, 64, 90, 0.04)"
              @click="goDetail(post)"
            >
              <!-- 用户信息 -->
              <view class="flex items-center gap-10px">
                <view class="h-38px w-38px overflow-hidden rounded-full">
                  <image :src="post.avatar" mode="aspectFill" class="h-full w-full" />
                </view>
                <text class="flex-1 text-14px text-[#272E3B] font-600">{{ post.nickname }}</text>
              </view>

              <!-- 内容 -->
              <text v-if="post.title" class="mt-10px text-15px text-[#272E3B] font-600 leading-22px">{{ post.title }}</text>
              <view class="mt-8px">
                <text class="text-14px text-[#3D3D3D] leading-22px">{{ post.content }}</text>
              </view>

              <!-- 图片 -->
              <view v-if="post.images.length === 1 && post.imageDirection === 'horizontal'" class="mt-12px">
                <view class="h-180px w-full overflow-hidden rounded-12px">
                  <image :src="post.images[0]" mode="aspectFill" class="h-full w-full" />
                </view>
              </view>
              <view v-else-if="post.images.length === 1 && post.imageDirection === 'vertical'" class="mt-12px">
                <view class="h-260px w-60% overflow-hidden rounded-12px">
                  <image :src="post.images[0]" mode="aspectFill" class="h-full w-full" />
                </view>
              </view>
              <view v-else-if="post.images.length === 2" class="mt-12px flex gap-6px">
                <view class="h-150px flex-1 overflow-hidden rounded-12px">
                  <image :src="post.images[0]" mode="aspectFill" class="h-full w-full" />
                </view>
                <view class="h-150px flex-1 overflow-hidden rounded-12px">
                  <image :src="post.images[1]" mode="aspectFill" class="h-full w-full" />
                </view>
              </view>
              <view v-else-if="post.images.length === 3" class="mt-12px flex gap-6px">
                <view class="flex-1 aspect-square overflow-hidden rounded-12px">
                  <image :src="post.images[0]" mode="aspectFill" class="h-full w-full" />
                </view>
                <view class="flex-1 aspect-square overflow-hidden rounded-12px">
                  <image :src="post.images[1]" mode="aspectFill" class="h-full w-full" />
                </view>
                <view class="flex-1 aspect-square overflow-hidden rounded-12px">
                  <image :src="post.images[2]" mode="aspectFill" class="h-full w-full" />
                </view>
              </view>
              <view v-else-if="post.images.length >= 4" class="relative mt-12px">
                <view class="h-180px w-full overflow-hidden rounded-12px">
                  <image :src="post.images[0]" mode="aspectFill" class="h-full w-full" />
                </view>
                <view class="absolute bottom-8px right-8px flex items-center gap-4px rounded-12px bg-black/50 px-8px py-4px">
                  <view class="i-carbon-image h-14px w-14px text-white" />
                  <text class="text-12px text-white font-500">{{ post.images.length }}</text>
                </view>
              </view>

              <!-- 互动栏 -->
              <view class="mt-14px flex items-center gap-24px">
                <text class="text-11px text-[#C0C4CC]">{{ formatReplyTime(post.lastReplyTime) }}</text>
                <view class="ml-auto flex items-center gap-24px">
                  <view class="flex items-center gap-4px">
                    <view class="i-carbon-view h-16px w-16px text-[#C0C4CC]" />
                    <text class="text-12px text-[#8F96A3]">{{ post.views }}</text>
                  </view>
                  <view class="flex items-center gap-4px">
                    <view class="i-carbon-chat h-16px w-16px text-[#C0C4CC]" />
                    <text class="text-12px text-[#8F96A3]">{{ post.comments }}</text>
                  </view>
                  <view class="flex items-center gap-4px" @click.stop="toggleLike(post)">
                    <view
                      class="h-18px w-18px"
                      :class="post.liked ? 'i-carbon-thumbs-up-filled text-[#3AAFDC]' : 'i-carbon-thumbs-up text-[#C0C4CC]'"
                    />
                    <text class="text-12px text-[#8F96A3]">{{ post.likes }}</text>
                  </view>
                </view>
              </view>
            </view>
          </view>
        </scroll-view>
      </swiper-item>

      <!-- ========== 论坛 Tab ========== -->
      <swiper-item>
        <scroll-view scroll-y class="h-full">
          <view class="px-15px pb-120px">
            <!-- 版块列表 -->
            <view
              v-for="section in forumSections"
              :key="section.id"
              class="forum-card mb-12px flex items-center gap-14px rounded-16px bg-white px-16px py-16px"
              style="box-shadow: 0 2px 8px rgba(53, 64, 90, 0.04)"
              @click="goForum(section)"
            >
              <!-- 图标 -->
              <view
                class="h-46px w-46px flex-shrink-0 flex items-center justify-center rounded-14px"
                :style="{ background: section.bgColor }"
              >
                <view class="h-24px w-24px" :class="section.icon" :style="{ color: section.color }" />
              </view>

              <!-- 信息 -->
              <view class="flex flex-1 flex-col overflow-hidden">
                <text class="text-15px text-[#272E3B] font-600">{{ section.title }}</text>
                <text class="mt-4px text-12px text-[#8F96A3] truncate">{{ section.description }}</text>
              </view>

              <!-- 数据 -->
              <view class="flex flex-shrink-0 flex-col items-end">
                <text class="text-12px text-[#8F96A3]">{{ formatCount(section.posts) }} 帖</text>
                <view class="mt-4px flex items-center gap-3px">
                  <view class="h-6px w-6px rounded-full bg-[#2BC18A]" />
                  <text class="text-11px text-[#2BC18A]">今日 {{ section.today }}</text>
                </view>
              </view>
            </view>
          </view>
        </scroll-view>
      </swiper-item>
    </swiper>
  </view>
</template>

<style scoped lang="scss">
.circle-page {
  position: relative;
}

.tab-swiper {
  height: calc(100vh - 110px);
}

.tab-item {
  transition: all 0.2s ease;
}

.forum-card {
  transition: background-color 0.2s ease;
}
.forum-card:active {
  background-color: #f8f8f8;
}
</style>
