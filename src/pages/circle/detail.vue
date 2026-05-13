<script lang="ts" setup>
definePage({
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '帖子详情',
  },
})

const postId = ref('')

onLoad((options) => {
  if (options?.id) {
    postId.value = options.id
  }
})

const post = ref({
  id: 1,
  avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=anime%20style%20male%20gamer%20avatar%20portrait%20with%20headphones%20blue%20background&image_size=square',
  nickname: '一念',
  time: '2小时前',
  content: '刚通关了《黑神话：悟空》第三章，boss战太震撼了！分享一下我的通关心得，希望对还在卡关的朋友有帮助。\n\n第三章的boss需要注意以下几点：\n1. 开场先拉开距离观察攻击模式\n2. 二阶段注意躲避范围技能\n3. 变身时机很关键，建议留到三阶段再用',
  images: [
    'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=black%20myth%20wukong%20epic%20boss%20battle%20scene%20chinese%20mythology%20dark%20fantasy%20game%20screenshot&image_size=landscape_16_9',
    'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=black%20myth%20wukong%20monkey%20king%20fighting%20giant%20demon%20cinematic%20game%20art&image_size=landscape_16_9',
    'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20mythology%20temple%20ruins%20dark%20atmosphere%20game%20environment%20concept%20art&image_size=landscape_16_9',
  ],
  likes: 128,
  comments: 32,
  liked: false,
  collected: false,
  collects: 45,
  followed: false,
  views: 356,
  topic: '攻略分享',
  lastReplyTime: Date.now() - 15 * 60 * 1000,
})

const comments = ref([
  {
    id: 1,
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cute%20cartoon%20girl%20gamer%20avatar%20pink%20hair%20purple%20background&image_size=square',
    nickname: '游戏达人',
    time: '1小时前',
    content: '太强了！我卡在第三章boss两天了，今晚按你的方法试试',
    likes: 15,
    liked: false,
  },
  {
    id: 2,
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cool%20robot%20mech%20avatar%20icon%20sci-fi%20neon%20green%20background&image_size=square',
    nickname: '像素猎人',
    time: '1小时前',
    content: '变身时机确实关键，我之前一阶段就用了，后面打得很艰难',
    likes: 8,
    liked: true,
  },
  {
    id: 3,
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=mysterious%20hooded%20character%20avatar%20dark%20fantasy%20style%20orange%20background&image_size=square',
    nickname: '云玩家',
    time: '30分钟前',
    content: '请问用什么武器比较好打？我现在用的棍法感觉伤害不够',
    likes: 3,
    liked: false,
  },
  {
    id: 4,
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=fantasy%20elf%20character%20avatar%20green%20eyes%20magical%20forest%20background&image_size=square',
    nickname: '星辰大海',
    time: '15分钟前',
    content: '画面真的太震撼了，截图都能当壁纸用',
    likes: 6,
    liked: false,
  },
])

const commentInput = ref('')
const inputFocused = ref(false)

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

function toggleLike() {
  post.value.liked = !post.value.liked
  post.value.likes += post.value.liked ? 1 : -1
}

function toggleFollow() {
  post.value.followed = !post.value.followed
}

function toggleCollect() {
  post.value.collected = !post.value.collected
  post.value.collects += post.value.collected ? 1 : -1
}

function focusInput() {
  inputFocused.value = true
}

function toggleCommentLike(comment: typeof comments.value[0]) {
  comment.liked = !comment.liked
  comment.likes += comment.liked ? 1 : -1
}

function sendComment() {
  if (!commentInput.value.trim()) return
  comments.value.push({
    id: Date.now(),
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=default%20user%20avatar%20simple%20gray%20background&image_size=square',
    nickname: '我',
    time: '刚刚',
    content: commentInput.value,
    likes: 0,
    liked: false,
  })
  commentInput.value = ''
  post.value.comments += 1
}

function goBack() {
  uni.navigateBack()
}

function previewImage(index: number) {
  uni.previewImage({
    current: index,
    urls: post.value.images,
  })
}

const showActionSheet = ref(false)

function openActionSheet() {
  showActionSheet.value = true
}

function closeActionSheet() {
  showActionSheet.value = false
}

function handleShare() {
  showActionSheet.value = false
  uni.showToast({ title: '分享成功', icon: 'none' })
}

function handleReport() {
  showActionSheet.value = false
  uni.showToast({ title: '举报已提交', icon: 'none' })
}
</script>

<template>
  <view class="detail-page min-h-100vh bg-[#F7F7FA]">
    <!-- 顶部导航栏 -->
    <view class="fixed left-0 right-0 top-0 z-50 bg-white/90 backdrop-blur-10px" style="padding-top: env(safe-area-inset-top)">
      <view class="flex h-44px items-center justify-between px-15px">
        <view class="flex h-32px w-32px items-center justify-center" @click="goBack">
          <view class="i-carbon-chevron-left h-30px w-30px text-[#272E3B]" />
        </view>
        <text class="text-20px text-[#272E3B] font-600">帖子正文</text>
        <view class="flex h-32px w-32px items-center justify-center" @click="openActionSheet">
          <view class="i-carbon-overflow-menu-vertical h-30px w-30px text-[#272E3B]" />
        </view>
      </view>
    </view>

    <!-- 内容区域 -->
    <scroll-view scroll-y class="detail-content" style="padding-top: calc(44px + env(safe-area-inset-top))">
      <!-- 帖子主体 -->
      <view class="bg-white px-16px pb-16px pt-20px">
        <!-- 用户信息 -->
        <view class="flex items-center gap-10px">
          <view class="h-44px w-44px overflow-hidden rounded-full">
            <image :src="post.avatar" mode="aspectFill" class="h-full w-full" />
          </view>
          <view class="flex flex-1 flex-col">
            <text class="text-15px text-[#272E3B] font-600">{{ post.nickname }}</text>
            <text class="text-12px text-[#C0C4CC]">{{ post.views }}浏览 · {{ post.topic }} · {{ formatReplyTime(post.lastReplyTime) }}</text>
          </view>
          <view
            class="flex h-35px w-70px flex-shrink-0 items-center justify-center rounded-30px"
            :class="post.followed ? 'bg-[#F5F5F5]' : 'bg-[#E5F9FF]'"
            @click="toggleFollow"
          >
            <text
              class="text-16px font-500"
              :class="post.followed ? 'text-[#8F96A3]' : 'text-[#3AAFDC]'"
            >{{ post.followed ? '已关注' : '关注' }}</text>
          </view>
        </view>

        <!-- 正文内容 -->
        <view class="mt-16px">
          <text class="text-15px text-[#3D3D3D] leading-26px" style="white-space: pre-wrap">{{ post.content }}</text>
        </view>

        <!-- 图片展示 -->
        <view v-if="post.images.length" class="mt-16px flex flex-col gap-8px">
          <view
            v-for="(img, index) in post.images"
            :key="index"
            class="w-full overflow-hidden rounded-12px"
            @click="previewImage(index)"
          >
            <image :src="img" mode="widthFix" class="w-full" />
          </view>
        </view>
      </view>

      <!-- 评论区 -->
      <view class="mt-10px bg-white px-16px pb-100px pt-16px">
        <view class="mb-16px flex items-center gap-6px">
          <text class="text-16px text-[#272E3B] font-600">评论</text>
          <text class="text-13px text-[#8F96A3]">({{ comments.length }})</text>
        </view>

        <!-- 评论列表 -->
        <view
          v-for="comment in comments"
          :key="comment.id"
          class="mb-16px flex gap-10px border-b border-[#F8F8F8] pb-16px last:mb-0 last:border-b-0 last:pb-0"
        >
          <view class="h-34px w-34px flex-shrink-0 overflow-hidden rounded-full">
            <image :src="comment.avatar" mode="aspectFill" class="h-full w-full" />
          </view>
          <view class="flex flex-1 flex-col">
            <view class="flex items-center justify-between">
              <text class="text-13px text-[#272E3B] font-500">{{ comment.nickname }}</text>
              <text class="text-11px text-[#C0C4CC]">{{ comment.time }}</text>
            </view>
            <text class="mt-6px text-14px text-[#3D3D3D] leading-22px">{{ comment.content }}</text>
            <view class="mt-8px flex items-center gap-4px" @click="toggleCommentLike(comment)">
              <view
                class="h-14px w-14px"
                :class="comment.liked ? 'i-carbon-thumbs-up-filled text-[#3AAFDC]' : 'i-carbon-thumbs-up text-[#C0C4CC]'"
              />
              <text class="text-11px text-[#C0C4CC]">{{ comment.likes || '' }}</text>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>

    <!-- 底部评论输入框 -->
    <view class="fixed bottom-0 left-0 right-0 z-50 border-t border-[#F0F0F0] bg-white px-15px pb-safe" style="padding-bottom: max(env(safe-area-inset-bottom), 10px)">
      <view class="flex h-50px items-center gap-10px">
        <view class="flex flex-1 items-center rounded-20px bg-[#F5F5F5] px-14px py-8px">
          <input
            v-model="commentInput"
            class="flex-1 text-13px"
            placeholder="写评论..."
            placeholder-class="text-[#C0C4CC]"
            confirm-type="send"
            @focus="inputFocused = true"
            @blur="inputFocused = false"
            @confirm="sendComment"
          />
        </view>
        <view class="relative flex h-34px w-34px items-center justify-center" @click="toggleLike">
          <view
            class="h-30px w-30px"
            :class="post.liked ? 'i-carbon-thumbs-up-filled text-[#3AAFDC]' : 'i-carbon-thumbs-up text-[#8F96A3]'"
          />
          <text v-if="post.likes > 0" class="absolute -right-4px -top-2px text-9px text-[#8F96A3]">{{ post.likes }}</text>
        </view>
        <view class="relative flex h-34px w-34px items-center justify-center" @click="toggleCollect">
          <view
            class="h-30px w-30px"
            :class="post.collected ? 'i-carbon-favorite-filled text-[#FF6B6B]' : 'i-carbon-favorite text-[#8F96A3]'"
          />
          <text v-if="post.collects > 0" class="absolute -right-4px -top-2px text-9px text-[#8F96A3]">{{ post.collects }}</text>
        </view>
        <view class="relative flex h-34px w-34px items-center justify-center" @click="focusInput">
          <view class="i-carbon-chat h-30px w-30px text-[#8F96A3]" />
          <text v-if="post.comments > 0" class="absolute -right-4px -top-2px text-9px text-[#8F96A3]">{{ post.comments }}</text>
        </view>
      </view>
    </view>
    <!-- 底部操作弹窗 -->
    <view v-if="showActionSheet" class="fixed inset-0 z-100" @click="closeActionSheet">
      <view class="absolute inset-0 bg-black/40" />
      <view class="absolute bottom-0 left-0 right-0 rounded-t-20px bg-white pb-safe" @click.stop>
        <view class="relative px-16px pt-20px pb-20px">
          <view class="absolute right-16px top-16px flex h-28px w-28px items-center justify-center rounded-full bg-[#F5F5F5]" @click="closeActionSheet">
            <view class="i-carbon-close h-14px w-14px text-[#8F96A3]" />
          </view>
          <view class="flex items-center justify-center gap-40px pt-10px">
            <view class="flex flex-col items-center gap-8px" @click="handleShare">
              <view class="flex h-50px w-50px items-center justify-center rounded-full bg-[#E5F9FF]">
                <view class="i-carbon-share h-24px w-24px text-[#3AAFDC]" />
              </view>
              <text class="text-12px text-[#272E3B]">分享</text>
            </view>
            <view class="flex flex-col items-center gap-8px" @click="handleReport">
              <view class="flex h-50px w-50px items-center justify-center rounded-full bg-[#FFF0F0]">
                <view class="i-carbon-flag h-24px w-24px text-[#FF6B6B]" />
              </view>
              <text class="text-12px text-[#FF6B6B]">举报</text>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
.detail-page {
  position: relative;
}

.detail-content {
  height: 100vh;
}
</style>
