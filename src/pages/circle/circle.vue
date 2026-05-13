<script lang="ts" setup>
definePage({
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '圈子',
  },
})

const posts = ref([
  {
    id: 1,
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=anime%20style%20male%20gamer%20avatar%20portrait%20with%20headphones%20blue%20background&image_size=square',
    nickname: '一念',
    time: '2小时前',
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

const topics = ref([
  { id: 1, name: '攻略分享', count: '2.3w', icon: '📖' },
  { id: 2, name: '组队开黑', count: '1.8w', icon: '🎮' },
  { id: 3, name: '新游推荐', count: '9.6k', icon: '🆕' },
  { id: 4, name: '游戏日常', count: '5.2k', icon: '☀️' },
])

function toggleLike(post: typeof posts.value[0]) {
  post.liked = !post.liked
  post.likes += post.liked ? 1 : -1
}

function toggleFollow(post: typeof posts.value[0]) {
  post.followed = !post.followed
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
</script>

<template>
  <view class="circle-page min-h-100vh bg-[#F7F7FA]">
    <!-- 顶部标题 -->
    <view class="circle-header" style="background: linear-gradient(180deg, #E5F9FF 0%, #F7F7FA 100%)">
      <view class="px-15px pb-12px pt-70px">
        <text class="text-26px text-[#272E3B] font-700">圈子</text>
        <text class="ml-8px text-13px text-[#8F96A3]">和玩家一起聊游戏</text>
      </view>
    </view>

    <scroll-view scroll-y class="circle-content">
      <!-- 话题标签横滑 -->
      <scroll-view scroll-x class="topic-scroll px-15px pb-16px" :show-scrollbar="false">
        <view class="flex gap-10px">
          <view
            v-for="topic in topics"
            :key="topic.id"
            class="topic-tag flex flex-shrink-0 items-center gap-6px rounded-20px bg-white px-14px py-8px"
            style="box-shadow: 0 2px 8px rgba(53, 64, 90, 0.06)"
          >
            <text class="text-14px">{{ topic.icon }}</text>
            <text class="text-13px text-[#272E3B] font-500">{{ topic.name }}</text>
            <text class="text-11px text-[#8F96A3]">{{ topic.count }}</text>
          </view>
        </view>
      </scroll-view>

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
          <view class="mt-12px">
            <text class="text-14px text-[#3D3D3D] leading-22px">{{ post.content }}</text>
          </view>

          <!-- 图片 -->
          <!-- 单图-横图 -->
          <view v-if="post.images.length === 1 && post.imageDirection === 'horizontal'" class="mt-12px">
            <view class="h-180px w-full overflow-hidden rounded-12px">
              <image :src="post.images[0]" mode="aspectFill" class="h-full w-full" />
            </view>
          </view>
          <!-- 单图-竖图 -->
          <view v-else-if="post.images.length === 1 && post.imageDirection === 'vertical'" class="mt-12px">
            <view class="h-260px w-60% overflow-hidden rounded-12px">
              <image :src="post.images[0]" mode="aspectFill" class="h-full w-full" />
            </view>
          </view>
          <!-- 双图-左右并排 -->
          <view v-else-if="post.images.length === 2" class="mt-12px flex gap-6px">
            <view class="h-150px flex-1 overflow-hidden rounded-12px">
              <image :src="post.images[0]" mode="aspectFill" class="h-full w-full" />
            </view>
            <view class="h-150px flex-1 overflow-hidden rounded-12px">
              <image :src="post.images[1]" mode="aspectFill" class="h-full w-full" />
            </view>
          </view>
          <!-- 三图-左中右并排 -->
          <view v-else-if="post.images.length === 3" class="mt-12px flex gap-6px">
            <view class="h-150px flex-1 overflow-hidden rounded-12px">
              <image :src="post.images[0]" mode="aspectFill" class="h-full w-full" />
            </view>
            <view class="h-150px flex-1 overflow-hidden rounded-12px">
              <image :src="post.images[1]" mode="aspectFill" class="h-full w-full" />
            </view>
            <view class="h-150px flex-1 overflow-hidden rounded-12px">
              <image :src="post.images[2]" mode="aspectFill" class="h-full w-full" />
            </view>
          </view>
          <!-- 四图及以上-单图展示+右下角图片数量角标 -->
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
  </view>
</template>

<style scoped lang="scss">
.circle-page {
  position: relative;
}

.circle-content {
  height: calc(100vh - 120px);
}
</style>
