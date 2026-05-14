<script lang="ts" setup>
import { useFollowStore } from '@/store/follow'

definePage({
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '帖子详情',
  },
})

const followStore = useFollowStore()

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
    images: [] as string[],
    likes: 15,
    liked: false,
    replies: [
      {
        id: 101,
        nickname: '一念',
        replyTo: '游戏达人',
        content: '加油！注意二阶段的范围技能就好',
        time: '50分钟前',
        likes: 3,
        liked: false,
      },
    ],
  },
  {
    id: 2,
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cool%20robot%20mech%20avatar%20icon%20sci-fi%20neon%20green%20background&image_size=square',
    nickname: '像素猎人',
    time: '1小时前',
    content: '变身时机确实关键，我之前一阶段就用了，后面打得很艰难',
    images: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=game%20boss%20battle%20phase%20two%20transformation%20screenshot&image_size=landscape_16_9',
    ],
    likes: 8,
    liked: true,
    replies: [],
  },
  {
    id: 3,
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=mysterious%20hooded%20character%20avatar%20dark%20fantasy%20style%20orange%20background&image_size=square',
    nickname: '云玩家',
    time: '30分钟前',
    content: '请问用什么武器比较好打？我现在用的棍法感觉伤害不够',
    images: [] as string[],
    likes: 3,
    liked: false,
    replies: [
      {
        id: 301,
        nickname: '一念',
        replyTo: '云玩家',
        content: '推荐用劈棍，伤害高而且硬直长',
        time: '20分钟前',
        likes: 5,
        liked: false,
      },
      {
        id: 302,
        nickname: '像素猎人',
        replyTo: '一念',
        content: '劈棍确实好用，配合变身伤害爆炸',
        time: '10分钟前',
        likes: 2,
        liked: false,
      },
    ],
  },
  {
    id: 4,
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=fantasy%20elf%20character%20avatar%20green%20eyes%20magical%20forest%20background&image_size=square',
    nickname: '星辰大海',
    time: '15分钟前',
    content: '画面真的太震撼了，截图都能当壁纸用',
    images: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=game%20screenshot%20beautiful%20scenery%20sunset%20fantasy%20landscape&image_size=landscape_16_9',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=game%20screenshot%20epic%20battle%20scene%20cinematic%20lighting&image_size=landscape_16_9',
    ],
    likes: 6,
    liked: false,
    replies: [],
  },
  {
    id: 5,
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cute%20panda%20avatar%20bamboo%20green%20background&image_size=square',
    nickname: '熊猫不吃竹',
    time: '10分钟前',
    content: '分享三张我截的boss战名场面，每一帧都是艺术',
    images: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=epic%20game%20boss%20fight%20fire%20explosion%20dramatic%20angle&image_size=square',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=game%20character%20ultimate%20skill%20golden%20light%20effect&image_size=square',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=game%20victory%20screen%20celebration%20confetti%20epic%20moment&image_size=square',
    ],
    likes: 12,
    liked: false,
    replies: [],
  },
  {
    id: 6,
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=ninja%20cat%20avatar%20dark%20purple%20background&image_size=square',
    nickname: '忍者猫',
    time: '5分钟前',
    content: '这个隐藏彩蛋你们发现了吗？在第三章地图左下角的石头后面',
    images: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=game%20hidden%20easter%20egg%20secret%20area%20glowing%20treasure&image_size=landscape_16_9',
    ],
    likes: 8,
    liked: false,
    replies: [
      {
        id: 601,
        nickname: '一念',
        replyTo: '忍者猫',
        content: '卧槽真的有！我玩了三遍都没发现',
        time: '3分钟前',
        likes: 4,
        liked: false,
      },
      {
        id: 602,
        nickname: '游戏达人',
        replyTo: '忍者猫',
        content: '这个彩蛋触发后还有隐藏剧情，太细节了',
        time: '1分钟前',
        likes: 2,
        liked: false,
      },
    ],
  },
])

const commentInput = ref('')
const inputFocused = ref(false)

// 光标位置
const cursorPosition = ref(-1)

// 评论插图（最多3张）
const commentImages = ref<string[]>([])

function chooseCommentImage() {
  if (commentImages.value.length >= 3) {
    uni.showToast({ title: '最多只能选择3张图片', icon: 'none' })
    return
  }
  const remaining = 3 - commentImages.value.length
  uni.chooseImage({
    count: remaining,
    sizeType: ['compressed'],
    sourceType: ['album', 'camera'],
    success: (res) => {
      commentImages.value.push(...res.tempFilePaths.slice(0, remaining))
      if (commentImages.value.length >= 3) {
        uni.showToast({ title: '已选择3张，达到上限', icon: 'none' })
      }
    },
  })
}

function removeCommentImage(index: number) {
  commentImages.value.splice(index, 1)
}

// 回复状态
const replyTarget = ref<{ commentId: number, nickname: string } | null>(null)

const inputPlaceholder = computed(() => {
  if (replyTarget.value) {
    return `回复 ${replyTarget.value.nickname}`
  }
  return '写评论...'
})

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
  // 注意：当前使用 post.id 作为用户标识（mock 数据）
  // 接入真实 API 后应替换为 post.authorId 或 post.userId
  followStore.toggleFollow({
    id: String(post.value.id),
    nickname: post.value.nickname,
    avatar: post.value.avatar,
  })
}

// 关注状态从 store 获取
const isFollowed = computed(() => followStore.isFollowed(String(post.value.id)))

function toggleCollect() {
  post.value.collected = !post.value.collected
  post.value.collects += post.value.collected ? 1 : -1
}

function focusInput() {
  replyTarget.value = null
  inputFocused.value = true
}

function activateInput() {
  showInputPopup.value = true
  cursorPosition.value = commentInput.value.length
  inputFocused.value = true
  showEmoji.value = false
}

const showInputPopup = ref(false)

function dismissInput() {
  inputFocused.value = false
  showEmoji.value = false
  showInputPopup.value = false
  replyTarget.value = null
}

function onInputBlur() {
  // 如果 emoji 面板打开，不关闭输入状态
  if (!showEmoji.value) {
    setTimeout(() => {
      if (!showEmoji.value) {
        inputFocused.value = false
      }
    }, 150)
  }
}

function replyToComment(comment: { id: number, nickname: string }) {
  replyTarget.value = { commentId: comment.id, nickname: comment.nickname }
  showInputPopup.value = true
  inputFocused.value = true
  showEmoji.value = false
}

function toggleCommentLike(comment: { liked: boolean, likes: number }) {
  comment.liked = !comment.liked
  comment.likes += comment.liked ? 1 : -1
}

function sendComment() {
  if (!commentInput.value.trim() && commentImages.value.length === 0) return

  if (replyTarget.value) {
    // 回复某条评论
    const targetComment = comments.value.find(c => c.id === replyTarget.value!.commentId)
    if (targetComment) {
      targetComment.replies.push({
        id: Date.now(),
        nickname: '我',
        replyTo: replyTarget.value.nickname,
        content: commentInput.value,
        time: '刚刚',
        likes: 0,
        liked: false,
      })
    }
  }
  else {
    // 发表新评论
    comments.value.push({
      id: Date.now(),
      avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=default%20user%20avatar%20simple%20gray%20background&image_size=square',
      nickname: '我',
      time: '刚刚',
      content: commentInput.value,
      images: [...commentImages.value],
      likes: 0,
      liked: false,
      replies: [],
    })
  }

  commentInput.value = ''
  commentImages.value = []
  replyTarget.value = null
  post.value.comments += 1
  dismissInput()
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

// Emoji 面板
const emojiPickerRef = ref()
const showEmoji = ref(false)

function toggleEmojiPanel() {
  if (showEmoji.value) {
    // 关闭 emoji，延迟后弹出键盘
    showEmoji.value = false
    setTimeout(() => {
      cursorPosition.value = commentInput.value.length
      inputFocused.value = true
    }, 50)
  }
  else {
    // 打开 emoji，收起键盘
    inputFocused.value = false
    setTimeout(() => {
      showEmoji.value = true
    }, 50)
  }
}

function onEmojiSelect(emoji: string) {
  commentInput.value += emoji
  cursorPosition.value = commentInput.value.length
}

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
            :class="isFollowed ? 'bg-[#F5F5F5]' : 'bg-[#E5F9FF]'"
            @click="toggleFollow"
          >
            <text
              class="text-16px font-500"
              :class="isFollowed ? 'text-[#8F96A3]' : 'text-[#3AAFDC]'"
            >{{ isFollowed ? '已关注' : '关注' }}</text>
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
            </view>
            <text class="mt-6px text-14px text-[#3D3D3D] leading-22px">{{ comment.content }}</text>

            <!-- 评论图片展示 -->
            <view v-if="comment.images && comment.images.length === 1" class="mt-8px">
              <view class="h-150px w-full overflow-hidden rounded-10px">
                <image :src="comment.images[0]" mode="aspectFill" class="h-full w-full" />
              </view>
            </view>
            <view v-else-if="comment.images && comment.images.length === 2" class="mt-8px flex gap-6px">
              <view class="h-120px flex-1 overflow-hidden rounded-10px">
                <image :src="comment.images[0]" mode="aspectFill" class="h-full w-full" />
              </view>
              <view class="h-120px flex-1 overflow-hidden rounded-10px">
                <image :src="comment.images[1]" mode="aspectFill" class="h-full w-full" />
              </view>
            </view>
            <view v-else-if="comment.images && comment.images.length === 3" class="mt-8px flex gap-6px">
              <view class="flex-1 aspect-square overflow-hidden rounded-10px">
                <image :src="comment.images[0]" mode="aspectFill" class="h-full w-full" />
              </view>
              <view class="flex-1 aspect-square overflow-hidden rounded-10px">
                <image :src="comment.images[1]" mode="aspectFill" class="h-full w-full" />
              </view>
              <view class="flex-1 aspect-square overflow-hidden rounded-10px">
                <image :src="comment.images[2]" mode="aspectFill" class="h-full w-full" />
              </view>
            </view>

            <!-- 操作栏：左侧时间，右侧回复+点赞 -->
            <view class="mt-8px flex items-center justify-between">
              <text class="text-11px text-[#C0C4CC]">{{ comment.time }}</text>
              <view class="flex items-center gap-16px">
                <view class="flex items-center gap-4px" @click="replyToComment(comment)">
                  <view class="i-carbon-chat h-14px w-14px text-[#C0C4CC]" />
                  <text class="text-11px text-[#C0C4CC]">回复</text>
                </view>
                <view class="flex items-center gap-4px" @click="toggleCommentLike(comment)">
                  <view
                    class="h-14px w-14px"
                    :class="comment.liked ? 'i-carbon-thumbs-up-filled text-[#3AAFDC]' : 'i-carbon-thumbs-up text-[#C0C4CC]'"
                  />
                  <text class="text-11px text-[#C0C4CC]">{{ comment.likes || '' }}</text>
                </view>
              </view>
            </view>

            <!-- 子回复列表 -->
            <view v-if="comment.replies.length > 0" class="mt-10px rounded-10px bg-[#F8F9FA] px-12px py-8px">
              <view
                v-for="reply in comment.replies"
                :key="reply.id"
                class="py-6px"
              >
                <view class="flex items-start gap-4px">
                  <text class="text-13px leading-20px">
                    <text class="text-[#3AAFDC] font-500">{{ reply.nickname }}</text>
                    <text class="text-[#8F96A3]"> 回复 </text>
                    <text class="text-[#3AAFDC] font-500">{{ reply.replyTo }}</text>
                    <text class="text-[#3D3D3D]">：{{ reply.content }}</text>
                  </text>
                </view>
                <view class="mt-4px flex items-center justify-between">
                  <text class="text-10px text-[#C0C4CC]">{{ reply.time }}</text>
                  <view class="flex items-center gap-12px">
                    <view class="flex items-center gap-3px" @click="replyToComment({ id: comment.id, nickname: reply.nickname })">
                      <view class="i-carbon-chat h-12px w-12px text-[#C0C4CC]" />
                      <text class="text-10px text-[#C0C4CC]">回复</text>
                    </view>
                    <view class="flex items-center gap-3px" @click="toggleCommentLike(reply)">
                      <view
                        class="h-12px w-12px"
                        :class="reply.liked ? 'i-carbon-thumbs-up-filled text-[#3AAFDC]' : 'i-carbon-thumbs-up text-[#C0C4CC]'"
                      />
                      <text class="text-10px text-[#C0C4CC]">{{ reply.likes || '' }}</text>
                    </view>
                  </view>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>

    <!-- 底部栏（默认状态） -->
    <view v-if="!showInputPopup" class="fixed bottom-0 left-0 right-0 z-50 bg-white" style="padding-bottom: max(env(safe-area-inset-bottom), 0px)">
      <view class="flex h-50px items-center gap-10px border-t border-[#F0F0F0] px-15px">
        <view class="flex flex-1 items-center rounded-20px bg-[#F5F5F5] px-14px py-8px" @click="activateInput">
          <text class="text-13px text-[#C0C4CC]">{{ inputPlaceholder }}</text>
        </view>
        <view class="relative flex h-34px w-34px items-center justify-center" @click="toggleCollect">
          <view
            class="h-26px w-26px"
            :class="post.collected ? 'i-carbon-favorite-filled text-[#FF6B6B]' : 'i-carbon-favorite text-[#8F96A3]'"
          />
          <text v-if="post.collects > 0" class="absolute -right-4px -top-2px text-9px text-[#8F96A3]">{{ post.collects }}</text>
        </view>
        <view class="relative flex h-34px w-34px items-center justify-center" @click="activateInput">
          <view class="i-carbon-chat h-26px w-26px text-[#8F96A3]" />
          <text v-if="post.comments > 0" class="absolute -right-4px -top-2px text-9px text-[#8F96A3]">{{ post.comments }}</text>
        </view>
        <view class="relative flex h-34px w-34px items-center justify-center" @click="toggleLike">
          <view
            class="h-26px w-26px"
            :class="post.liked ? 'i-carbon-thumbs-up-filled text-[#3AAFDC]' : 'i-carbon-thumbs-up text-[#8F96A3]'"
          />
          <text v-if="post.likes > 0" class="absolute -right-4px -top-2px text-9px text-[#8F96A3]">{{ post.likes }}</text>
        </view>
      </view>
    </view>

    <!-- 输入状态：蒙版 + 输入栏 -->
    <view v-if="showInputPopup">
      <!-- 蒙版遮罩 -->
      <view class="fixed inset-0 z-80 bg-black/40" @click="dismissInput" />
      <!-- 输入栏 -->
      <view class="fixed bottom-0 left-0 right-0 z-90 bg-white" style="padding-bottom: max(env(safe-area-inset-bottom), 0px)">
        <view class="border-t border-[#F0F0F0] px-15px py-8px">
          <!-- 已选图片预览 -->
          <view v-if="commentImages.length > 0" class="mb-8px flex gap-8px">
            <view
              v-for="(img, index) in commentImages"
              :key="index"
              class="relative h-60px w-60px overflow-hidden rounded-8px"
            >
              <image :src="img" mode="aspectFill" class="h-full w-full" />
              <view
                class="absolute -right-2px -top-2px flex h-18px w-18px items-center justify-center rounded-full bg-black/60"
                @click="removeCommentImage(index)"
              >
                <view class="i-carbon-close h-10px w-10px text-white" />
              </view>
            </view>
            <text class="self-end text-10px text-[#C0C4CC]">{{ commentImages.length }}/3</text>
          </view>

          <!-- 输入行 -->
          <view class="flex items-center gap-10px">
            <view class="relative flex flex-1 items-center rounded-20px bg-[#F5F5F5] px-14px py-8px">
              <input
                v-model="commentInput"
                class="flex-1 text-13px"
                :placeholder="inputPlaceholder"
                placeholder-class="text-[#C0C4CC]"
                confirm-type="send"
                :focus="inputFocused"
                :cursor="cursorPosition"
                :adjust-position="true"
                :cursor-spacing="80"
                :disabled="showEmoji"
                @input="cursorPosition = -1"
                @confirm="sendComment"
              />
              <!-- emoji 打开时覆盖一层，点击切换回键盘 -->
              <view v-if="showEmoji" class="absolute inset-0 z-10" @click="toggleEmojiPanel" />
            </view>
            <!-- 插图按钮 -->
            <view class="flex h-34px w-34px items-center justify-center" @click="chooseCommentImage">
              <view class="i-carbon-image h-22px w-22px" :class="commentImages.length > 0 ? 'text-[#3AAFDC]' : 'text-[#8F96A3]'" />
            </view>
            <!-- 表情按钮 -->
            <view class="flex h-34px w-34px items-center justify-center" @click="toggleEmojiPanel">
              <view
                class="h-24px w-24px"
                :class="showEmoji ? 'i-carbon-keyboard text-[#3AAFDC]' : 'i-carbon-face-satisfied text-[#8F96A3]'"
              />
            </view>
            <!-- 发送按钮 -->
            <view
              class="flex h-32px items-center justify-center rounded-16px px-14px"
              :class="(commentInput.trim() || commentImages.length > 0) ? 'bg-[#3AAFDC]' : 'bg-[#E0E0E0]'"
              @click="sendComment"
            >
              <text class="text-13px font-500" :class="(commentInput.trim() || commentImages.length > 0) ? 'text-white' : 'text-[#8F96A3]'">发送</text>
            </view>
          </view>

          <!-- Emoji 面板 -->
          <EmojiPicker :show="showEmoji" @select="onEmojiSelect" />
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
  height: 100vh;
  overflow: hidden;
}

.detail-content {
  height: calc(100vh - 60px);
}
</style>
