<script lang="ts" setup>
import { useAnnouncementStore } from '@/store/announcement'

definePage({
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '论坛',
  },
})

// 版块信息（sectionColor 必须为 6 位 hex 格式，如 #3AAFDC，用于拼接 alpha 后缀）
const sectionId = ref('')
const sectionTitle = ref('')
const sectionColor = ref('#3AAFDC')

onLoad((options) => {
  if (options?.id) sectionId.value = options.id
  if (options?.title) sectionTitle.value = decodeURIComponent(options.title)
  if (options?.color) sectionColor.value = decodeURIComponent(options.color)
})

const announcementStore = useAnnouncementStore()
const sectionAnnouncements = computed(() => announcementStore.getSectionAnnouncements(sectionId.value))

// 排序方式
const sortType = ref<'latest' | 'hot'>('latest')

// 版块详情弹窗
const showSectionDetail = ref(false)

// 版主数据
const moderators = ref([
  {
    id: 'mod1',
    nickname: '版主大大',
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20moderator%20avatar%20crown%20badge%20golden%20background&image_size=square',
    role: '版主',
  },
  {
    id: 'mod2',
    nickname: '小助手',
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=friendly%20helper%20avatar%20smile%20blue%20star%20background&image_size=square',
    role: '版主',
  },
])

const forumRules = [
  '发帖前请先搜索，避免重复提问',
  '标题需简洁明了，禁止纯符号或无意义标题',
  '禁止发布广告、引流、诈骗等违规内容',
  '尊重他人，禁止人身攻击和恶意辱骂',
  '禁止发布涉及政治、色情等违法内容',
  '转载内容请注明出处，尊重原创',
]

// 帖子列表
const posts = ref([
  {
    id: 1,
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cute%20duck%20cartoon%20avatar%20yellow%20background&image_size=square',
    nickname: '迷路的小鸭',
    time: '10分钟前',
    title: '萌新求助！第三章boss怎么打',
    content: '卡了两天了，试了各种阵容都过不去，有大佬能指点一下吗',
    images: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=game%20boss%20battle%20failed%20screen%20mobile%20game%20screenshot&image_size=landscape_16_9',
    ],
    imageDirection: 'horizontal',
    likes: 23,
    comments: 45,
    liked: false,
    views: 156,
    pinned: true,
    lastReplyTime: Date.now() - 10 * 60 * 1000,
  },
  {
    id: 2,
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=smart%20owl%20avatar%20glasses%20blue%20background&image_size=square',
    nickname: '数据帝',
    time: '1小时前',
    title: '全角色强度排行榜 v2.1 更新版',
    content: '这次加入了新角色的评测数据，供大家参考',
    images: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=game%20character%20tier%20list%20ranking%20chart%20colorful%20infographic&image_size=landscape_16_9',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=game%20character%20stats%20comparison%20table%20data%20visualization&image_size=landscape_16_9',
    ],
    imageDirection: 'horizontal',
    likes: 89,
    comments: 67,
    liked: true,
    views: 1203,
    pinned: true,
    lastReplyTime: Date.now() - 60 * 60 * 1000,
  },
  {
    id: 3,
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=anime%20style%20male%20gamer%20avatar%20portrait%20with%20headphones%20blue%20background&image_size=square',
    nickname: '一念',
    time: '2小时前',
    title: '更新后闪退问题',
    content: '今天更新后闪退了，有人遇到同样问题吗？安卓12系统，重启手机也没用',
    images: [],
    imageDirection: 'horizontal',
    likes: 12,
    comments: 45,
    liked: false,
    views: 678,
    pinned: false,
    lastReplyTime: Date.now() - 2 * 60 * 60 * 1000,
  },
  {
    id: 4,
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=mysterious%20hooded%20character%20avatar%20dark%20fantasy%20style%20orange%20background&image_size=square',
    nickname: '云玩家',
    time: '3小时前',
    title: '平民阵容过深渊12层攻略',
    content: '分享一下我的阵容搭配，关键是把主C的暴击堆到60%以上',
    images: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=gacha%20game%20team%20lineup%20strategy%20guide%20character%20cards%20arrangement%20mobile%20game&image_size=landscape_16_9',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=mobile%20game%20character%20stats%20screen%20RPG%20equipment%20upgrade%20interface&image_size=landscape_16_9',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=anime%20style%20game%20characters%20team%20composition%20five%20heroes%20standing%20together&image_size=landscape_16_9',
    ],
    imageDirection: 'horizontal',
    likes: 34,
    comments: 21,
    liked: false,
    views: 421,
    pinned: false,
    lastReplyTime: Date.now() - 3 * 60 * 60 * 1000,
  },
  {
    id: 5,
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=fantasy%20elf%20character%20avatar%20green%20eyes%20magical%20forest%20background&image_size=square',
    nickname: '星辰大海',
    time: '昨天',
    title: '新版本角色立绘求高清壁纸',
    content: '新版本角色立绘太好看了，直接设成壁纸了！有没有高清无水印版本',
    images: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=beautiful%20anime%20character%20full%20body%20illustration%20fantasy%20warrior%20princess%20vertical%20portrait&image_size=portrait_4_3',
    ],
    imageDirection: 'vertical',
    likes: 56,
    comments: 32,
    liked: false,
    views: 890,
    pinned: false,
    lastReplyTime: Date.now() - 24 * 60 * 60 * 1000,
  },
])

function goBack() {
  uni.navigateBack()
}

function toggleLike(post: typeof posts.value[0]) {
  post.liked = !post.liked
  post.likes += post.liked ? 1 : -1
}

function formatReplyTime(timestamp: number) {
  const diff = Date.now() - timestamp
  const minutes = Math.floor(diff / (60 * 1000))
  const hours = Math.floor(diff / (60 * 60 * 1000))
  const days = Math.floor(diff / (24 * 60 * 60 * 1000))
  if (minutes < 1) return '刚刚'
  if (minutes < 60) return `${minutes}分钟前`
  if (hours < 24) return `${hours}小时前`
  return `${days}天前`
}

// 板块分区
const activeCategory = ref('all')
// 分区列表为静态数据，无需响应式
const categories = [
  { id: 'all', name: '全部' },
  { id: 'guide', name: '攻略' },
  { id: 'question', name: '求助' },
  { id: 'discuss', name: '讨论' },
  { id: 'share', name: '分享' },
  { id: 'bug', name: 'BUG反馈' },
]

function goDetail(post: typeof posts.value[0]) {
  uni.navigateTo({
    url: `/pages/circle/detail?id=${post.id}`,
  })
}

function goPublish() {
  uni.navigateTo({
    url: `/pages/forum/publish?sectionId=${sectionId.value}&sectionTitle=${encodeURIComponent(sectionTitle.value)}&sectionColor=${encodeURIComponent(sectionColor.value)}`,
  })
}

// 从 HTML 中提取纯文本（列表预览用）
function stripHtml(html: string) {
  return html.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').trim()
}
</script>

<template>
  <view class="forum-detail min-h-100vh">
    <!-- 顶部区域：导航 + 板块信息（一体化背景） -->
    <view class="header-area" :style="{ background: `linear-gradient(180deg, #E5F9FF 0%, #d4f0fa 100%)` }">
      <!-- 安全区 + 导航栏 -->
      <view style="padding-top: env(safe-area-inset-top)">
        <view class="flex h-44px items-center justify-between px-15px">
          <view class="flex h-32px w-32px items-center justify-center" @click="goBack">
            <view class="i-carbon-chevron-left h-24px w-24px text-[#272E3B]" />
          </view>
          <text class="text-18px text-[#272E3B] font-600">{{ sectionTitle }}</text>
          <view class="h-32px w-32px" />
        </view>
      </view>

      <!-- 板块信息 -->
      <view class="px-15px pt-6px pb-24px" @click="showSectionDetail = true">
        <view class="flex items-center justify-between">
          <view class="flex items-center gap-12px">
            <view
              class="h-48px w-48px flex items-center justify-center rounded-14px bg-white/60"
              style="backdrop-filter: blur(4px)"
            >
              <view class="i-carbon-forum h-24px w-24px" :style="{ color: sectionColor }" />
            </view>
            <view class="flex flex-col">
              <text class="text-17px text-[#272E3B] font-700">{{ sectionTitle }}</text>
              <text class="mt-3px text-12px text-[#5A6070]">{{ posts.length }} 个主题 · {{ moderators.length }} 位版主</text>
            </view>
          </view>
          <!-- 版主头像组 -->
          <view class="flex items-center">
            <view class="flex items-center -space-x-8px">
              <view
                v-for="mod in moderators"
                :key="mod.id"
                class="h-30px w-30px overflow-hidden rounded-full border-2px border-white"
                style="box-shadow: 0 1px 4px rgba(0,0,0,0.1)"
              >
                <image :src="mod.avatar" mode="aspectFill" class="h-full w-full" />
              </view>
            </view>
            <view class="i-carbon-chevron-right ml-6px h-14px w-14px text-[#8F96A3]" />
          </view>
        </view>
      </view>
    </view>

    <!-- 内容区域（大圆角卡片层） -->
    <view class="relative -mt-12px rounded-t-20px bg-[#F7F7FA] min-h-80vh" style="box-shadow: 0 -4px 12px rgba(53, 64, 90, 0.06)">
      <!-- 公告区域 -->
      <view v-if="sectionAnnouncements.length > 0" class="px-15px pt-16px pb-4px">
        <view
          v-for="item in sectionAnnouncements"
          :key="item.id"
          class="flex items-center gap-8px py-5px"
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

      <!-- 排序栏 -->
      <view class="flex items-center gap-20px px-20px pt-14px pb-10px">
        <view
          class="relative pb-6px"
          @click="sortType = 'latest'"
        >
          <text
            class="text-15px font-500"
            :class="sortType === 'latest' ? 'text-[#272E3B] font-600' : 'text-[#8F96A3]'"
          >最新</text>
          <view
            v-if="sortType === 'latest'"
            class="absolute bottom-0 left-50% h-3px w-16px rounded-2px -translate-x-50%"
            :style="{ background: sectionColor }"
          />
        </view>
        <view
          class="relative pb-6px"
          @click="sortType = 'hot'"
        >
          <text
            class="text-15px font-500"
            :class="sortType === 'hot' ? 'text-[#272E3B] font-600' : 'text-[#8F96A3]'"
          >热门</text>
          <view
            v-if="sortType === 'hot'"
            class="absolute bottom-0 left-50% h-3px w-16px rounded-2px -translate-x-50%"
            :style="{ background: sectionColor }"
          />
        </view>
      </view>

      <!-- 板块分区 -->
      <scroll-view scroll-x class="whitespace-nowrap px-15px pb-12px">
        <view class="inline-flex gap-8px">
          <view
            v-for="cat in categories"
            :key="cat.id"
            class="inline-flex h-30px items-center rounded-30px px-14px"
            :style="{
              background: activeCategory === cat.id ? `${sectionColor}15` : '#F2F3F5',
              border: activeCategory === cat.id ? `1px solid ${sectionColor}40` : '1px solid transparent',
            }"
            @click="activeCategory = cat.id"
          >
            <text
              class="text-12px font-500"
              :style="{ color: activeCategory === cat.id ? sectionColor : '#8F96A3' }"
            >{{ cat.name }}</text>
          </view>
        </view>
      </scroll-view>

      <!-- 帖子信息流 -->
      <view class="px-15px pb-40px">
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
            <text class="text-14px text-[#3D3D3D] leading-22px">{{ stripHtml(post.content) }}</text>
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
    </view>

    <!-- 发帖悬浮按钮 -->
    <view
      class="fixed right-20px bottom-80px z-100 flex h-52px w-52px items-center justify-center rounded-full shadow-lg"
      :style="{ background: `linear-gradient(135deg, ${sectionColor}, ${sectionColor}DD)` }"
      style="box-shadow: 0 4px 16px rgba(58, 175, 220, 0.35)"
      @click="goPublish"
    >
      <view class="i-carbon-edit h-24px w-24px text-white" />
    </view>

    <!-- 版块详情弹窗 -->
    <wd-popup v-model="showSectionDetail" position="bottom" :z-index="1100" custom-style="border-radius: 20px 20px 0 0; max-height: 75vh">
      <view class="px-20px pt-22px pb-30px">
        <!-- 标题栏 -->
        <view class="flex items-center justify-between mb-20px">
          <text class="text-18px text-[#272E3B] font-700">{{ sectionTitle }}</text>
          <view class="flex h-28px w-28px items-center justify-center rounded-full bg-[#F5F5F5]" @click="showSectionDetail = false">
            <view class="i-carbon-close h-14px w-14px text-[#8F96A3]" />
          </view>
        </view>

        <!-- 版主区域 -->
        <view class="mb-20px">
          <text class="text-14px text-[#8F96A3] mb-12px">版主团队</text>
          <view class="mt-12px flex flex-col gap-14px">
            <view
              v-for="mod in moderators"
              :key="mod.id"
              class="flex items-center gap-12px"
            >
              <view class="h-42px w-42px overflow-hidden rounded-full" style="box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08)">
                <image :src="mod.avatar" mode="aspectFill" class="h-full w-full" />
              </view>
              <view class="flex flex-1 flex-col">
                <text class="text-14px text-[#272E3B] font-500">{{ mod.nickname }}</text>
                <text class="mt-2px text-12px text-[#8F96A3]">{{ mod.role }}</text>
              </view>
              <view
                class="flex h-28px items-center rounded-30px px-10px"
                :style="{ background: `${sectionColor}18` }"
              >
                <text class="text-11px font-500" :style="{ color: sectionColor }">{{ mod.role }}</text>
              </view>
            </view>
          </view>
        </view>

        <!-- 分割线 -->
        <view class="h-1px bg-[#F2F2F2] mb-18px" />

        <!-- 版规区域 -->
        <view>
          <text class="text-14px text-[#8F96A3] mb-12px">版规</text>
          <view class="mt-12px flex flex-col gap-10px">
            <view
              v-for="(rule, index) in forumRules"
              :key="index"
              class="flex items-start gap-10px"
            >
              <view class="mt-3px h-18px w-18px flex-shrink-0 flex items-center justify-center rounded-full bg-[#E5F9FF]">
                <text class="text-10px text-[#3AAFDC] font-600">{{ index + 1 }}</text>
              </view>
              <text class="flex-1 text-13px text-[#3D3D3D] leading-20px">{{ rule }}</text>
            </view>
          </view>
        </view>

        <!-- 底部提示 -->
        <view class="mt-18px rounded-12px bg-[#F8F9FA] px-14px py-10px">
          <text class="text-12px text-[#8F96A3] leading-18px">违反版规的帖子将被删除，严重者将被禁言处理。如有疑问请联系版主。</text>
        </view>
      </view>
    </wd-popup>
  </view>
</template>

<style scoped lang="scss">
.post-card {
  transition: background-color 0.2s ease;
}
.post-card:active {
  background-color: #f8f8f8;
}
</style>
