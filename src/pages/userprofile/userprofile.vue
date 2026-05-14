<script lang="ts" setup>
import { useFansStore } from '@/store/fans'
import { useFavoriteStore } from '@/store/favorite'
import { useFollowStore } from '@/store/follow'
import { useGameStore } from '@/store/game'
import { useTokenStore } from '@/store/token'

definePage({
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '个人资料',
  },
})

const gameStore = useGameStore()
const favoriteStore = useFavoriteStore()
const followStore = useFollowStore()
const fansStore = useFansStore()
const tokenStore = useTokenStore()

// 页面参数（支持查看他人资料，默认查看自己）
const userId = ref('')
const isSelf = computed(() => !userId.value || userId.value === String(gameStore.currentUser?.id))

onLoad((options: any) => {
  // 未登录且查看自己资料时，跳转登录页
  if (!tokenStore.hasLogin && !options?.id) {
    uni.redirectTo({ url: '/pages/login/index' })
    return
  }
  if (options?.id) {
    userId.value = options.id
  }
})

// 用户信息
const userInfo = computed(() => {
  if (isSelf.value) {
    return gameStore.currentUser
  }
  // TODO: 接入API后，根据 userId 请求目标用户数据
  return gameStore.currentUser
})

// 目标用户的统计数据
// TODO: 接入API后，从接口获取目标用户的关注/粉丝/收藏数
const profileStats = computed(() => {
  if (isSelf.value) {
    return {
      followCount: followStore.followCount,
      fansCount: fansStore.fansCount,
      favoriteCount: favoriteStore.favoriteCount,
    }
  }
  return {
    followCount: 0,
    fansCount: 0,
    favoriteCount: 0,
  }
})

// Tab 切换
const currentTab = ref('posts')
const tabs = [
  { key: 'posts', label: '动态' },
  { key: 'comments', label: '评论' },
]

function switchTab(key: string) {
  currentTab.value = key
}

// 模拟动态数据
const posts = ref([
  {
    id: 1,
    title: '黑神话悟空第三章通关心得',
    content: '刚通关了《黑神话：悟空》第三章，boss战太震撼了！有没有人一起讨论下攻略？',
    images: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=black%20myth%20wukong%20epic%20boss%20battle%20scene%20chinese%20mythology%20dark%20fantasy%20game%20screenshot&image_size=landscape_16_9',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=black%20myth%20wukong%20monkey%20king%20fighting%20giant%20demon%20cinematic%20game%20art&image_size=landscape_16_9',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20mythology%20temple%20ruins%20dark%20atmosphere%20game%20environment%20concept%20art&image_size=landscape_16_9',
    ],
    likes: 128,
    comments: 32,
    views: 356,
    time: '2小时前',
    liked: false,
  },
  {
    id: 2,
    title: '宝藏独立游戏推荐',
    content: '推荐一款最近发现的独立游戏，画风超赞，玩法也很有创意，周末可以试试看',
    images: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=indie%20game%20pixel%20art%20colorful%20fantasy%20world%20beautiful%20landscape%20screenshot&image_size=landscape_16_9',
    ],
    likes: 56,
    comments: 12,
    views: 203,
    time: '5小时前',
    liked: true,
  },
  {
    id: 3,
    title: '',
    content: '今天的日常任务终于肝完了，分享一下我的阵容搭配思路',
    images: [],
    likes: 23,
    comments: 8,
    views: 178,
    time: '昨天',
    liked: false,
  },
])

// 模拟评论数据（用户在其他帖子下的评论）
const userComments = ref([
  {
    id: 1,
    content: '这个攻略太实用了，第三章boss我卡了好久终于过了！',
    time: '1小时前',
    postId: 1,
    postTitle: '黑神话悟空第三章通关心得',
    postAuthor: '像素猎人',
    likes: 12,
  },
  {
    id: 2,
    content: '画风确实不错，玩法也很有新意，已经下载了',
    time: '3小时前',
    postId: 2,
    postTitle: '宝藏独立游戏推荐',
    postAuthor: '游戏达人',
    likes: 8,
  },
  {
    id: 3,
    content: '我也是这个阵容，不过我把奶妈换成了辅助，效果也不错',
    time: '昨天',
    postId: 3,
    postTitle: '平民阵容搭配思路分享',
    postAuthor: '云玩家',
    likes: 5,
  },
  {
    id: 4,
    content: '周末可以一起组队，我玩治疗',
    time: '2天前',
    postId: 4,
    postTitle: '周末组队打副本招人',
    postAuthor: '像素猎人',
    likes: 3,
  },
])

// 是否已关注该用户
const isFollowed = ref(false)

// 格式化数字
function formatCount(count: number) {
  if (count >= 10000) return `${(count / 10000).toFixed(1)}w`
  if (count >= 1000) return `${(count / 1000).toFixed(1)}k`
  return `${count}`
}

// 操作方法
function leftClick() {
  const pages = getCurrentPages()
  if (pages.length > 1) {
    uni.navigateBack({ delta: 1 })
  }
}

function goToProfile() {
  uni.navigateTo({ url: '/pages/profile/profile' })
}

function goToFollowList() {
  uni.navigateTo({ url: '/pages/follow/follow' })
}

function goToFansList() {
  uni.navigateTo({ url: '/pages/fans/fans' })
}

function toggleFollow() {
  isFollowed.value = !isFollowed.value
  uni.showToast({
    title: isFollowed.value ? '已关注' : '已取消关注',
    icon: 'none',
  })
}

function toggleLike(post: typeof posts.value[0]) {
  post.liked = !post.liked
  post.likes += post.liked ? 1 : -1
}

function copyId() {
  const user = userInfo.value
  if (!user) return
  const idText = `ID：${user.id}`
  uni.setClipboardData({
    data: idText,
    success: () => {
      uni.showToast({ title: 'ID复制成功', icon: 'none' })
    },
    fail: () => {
      uni.showToast({ title: 'ID复制失败', icon: 'none' })
    },
  })
}

function goToCommentPost(comment: typeof userComments.value[0]) {
  uni.navigateTo({
    url: `/pages/circle/detail?id=${comment.postId}`,
  })
}
</script>

<template>
  <view class="userprofile-page min-h-100vh bg-[#F7F7FA]">
    <!-- 顶部导航栏 -->
    <view class="nav-bar fixed left-0 top-0 z-10 w-full px-15px pb-10px pt-50px">
      <view class="flex items-center justify-between">
        <view class="h-36px w-36px flex items-center justify-center" @click="leftClick">
          <image src="/static/gamedetail/back_icon.png" mode="aspectFit" class="h-22px w-22px" style="filter: brightness(10)" />
        </view>
        <view class="h-36px w-36px" />
      </view>
    </view>

    <!-- 整体滚动区域 -->
    <scroll-view scroll-y class="h-100vh">
      <!-- 头部背景 + 用户信息 -->
      <view class="profile-header relative overflow-hidden">
        <!-- 背景渐变 -->
        <view class="absolute inset-0" style="background: linear-gradient(180deg, #0a9c8a 0%, #12cdb0 40%, #d4f5ee 80%, #F7F7FA 100%)" />

        <!-- 装饰圆形 -->
        <view class="absolute right-[-30px] top-[20px] h-120px w-120px rounded-full opacity-20" style="background: radial-gradient(circle, rgba(255,255,255,0.4), transparent)" />
        <view class="absolute left-[-20px] top-[60px] h-80px w-80px rounded-full opacity-15" style="background: radial-gradient(circle, rgba(255,255,255,0.3), transparent)" />

        <!-- 用户信息区域 -->
        <view class="relative z-1 flex flex-col items-center pb-30px pt-110px">
          <!-- 头像 -->
          <view class="h-90px w-90px overflow-hidden rounded-full" style="border: 3px solid rgba(255,255,255,0.8); box-shadow: 0 8px 30px rgba(0,0,0,0.15)">
            <image :src="userInfo?.picture || '/static/user/UserNull.svg'" mode="aspectFill" class="h-full w-full" />
          </view>

          <!-- 昵称 -->
          <view class="mt-14px flex items-center gap-6px">
            <text class="text-22px text-white font-bold" style="text-shadow: 0 2px 8px rgba(0,0,0,0.15)">
              {{ userInfo?.Nickname || '用户' }}
            </text>
          </view>

          <!-- ID + 复制按钮 -->
          <view class="mt-6px flex items-center gap-6px" @click="copyId">
            <text class="text-13px text-white/70">@ID {{ userInfo?.id || '---' }}</text>
            <view class="i-carbon-copy h-14px w-14px text-white/90" />
          </view>

          <!-- 个人简介 -->
          <view class="mx-40px mt-12px">
            <text class="text-center text-13px text-white/80 leading-20px">热爱游戏，享受每一次冒险旅程。分享游戏心得，结交志同道合的朋友。</text>
          </view>
        </view>
      </view>

      <!-- 数据统计卡片 -->
      <view class="mx-15px mt-[-20px] relative z-2 rounded-20px bg-white px-10px py-20px" style="box-shadow: 0 4px 24px rgba(53, 64, 90, 0.08)">
        <view class="flex items-center justify-around">
          <view class="flex flex-col items-center" @click="goToFollowList">
            <text class="text-22px text-[#272E3B] font-bold">{{ formatCount(profileStats.followCount) }}</text>
            <text class="mt-4px text-12px text-[#8F92A1]">关注</text>
          </view>
          <view class="h-30px w-1px bg-[#E8E8E8]" />
          <view class="flex flex-col items-center" @click="goToFansList">
            <text class="text-22px text-[#272E3B] font-bold">{{ formatCount(profileStats.fansCount) }}</text>
            <text class="mt-4px text-12px text-[#8F92A1]">粉丝</text>
          </view>
          <view class="h-30px w-1px bg-[#E8E8E8]" />
          <view class="flex flex-col items-center">
            <text class="text-22px text-[#272E3B] font-bold">{{ formatCount(profileStats.favoriteCount) }}</text>
            <text class="mt-4px text-12px text-[#8F92A1]">收藏</text>
          </view>
          <view class="h-30px w-1px bg-[#E8E8E8]" />
          <view class="flex flex-col items-center">
            <text class="text-22px text-[#272E3B] font-bold">{{ posts.length }}</text>
            <text class="mt-4px text-12px text-[#8F92A1]">动态</text>
          </view>
        </view>
      </view>

      <!-- 操作按钮 -->
      <view class="mx-15px mt-16px flex items-center gap-12px">
        <template v-if="isSelf">
          <view
            class="flex-1 h-42px flex items-center justify-center rounded-30px"
            style="background: linear-gradient(95deg, #2bc18a, #5ad88c); box-shadow: 0 6px 16px rgba(43, 193, 138, 0.2)"
            @click="goToProfile"
          >
            <view class="i-carbon-edit h-16px w-16px text-white mr-6px" />
            <text class="text-14px text-white font-600">编辑资料</text>
          </view>
        </template>
        <template v-else>
          <view
            class="flex-1 h-42px flex items-center justify-center rounded-30px"
            :style="isFollowed
              ? 'background: #F0F0F0'
              : 'background: linear-gradient(95deg, #2bc18a, #5ad88c); box-shadow: 0 6px 16px rgba(43, 193, 138, 0.2)'"
            @click="toggleFollow"
          >
            <view
              class="h-16px w-16px mr-6px"
              :class="isFollowed ? 'i-carbon-checkmark text-[#8F96A3]' : 'i-carbon-add text-white'"
            />
            <text class="text-14px font-600" :class="isFollowed ? 'text-[#8F96A3]' : 'text-white'">
              {{ isFollowed ? '已关注' : '关注' }}
            </text>
          </view>
        </template>
      </view>

      <!-- Tab 切换 -->
      <view class="mt-20px flex items-center gap-28px px-20px">
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

      <!-- Tab 内容 -->
      <!-- 动态 Tab -->
      <view v-if="currentTab === 'posts'" class="px-15px pb-30px pt-10px">
        <view
          v-for="post in posts"
          :key="post.id"
          class="post-card mb-12px rounded-16px bg-white px-16px py-16px"
          style="box-shadow: 0 2px 8px rgba(53, 64, 90, 0.04)"
        >
          <!-- 内容 -->
          <text v-if="post.title" class="text-15px text-[#272E3B] font-600 leading-22px">{{ post.title }}</text>
          <view class="mt-8px">
            <text class="text-14px text-[#3D3D3D] leading-22px">{{ post.content }}</text>
          </view>

          <!-- 图片 -->
          <view v-if="post.images.length === 1" class="mt-12px">
            <view class="h-180px w-full overflow-hidden rounded-12px">
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
          <view v-else-if="post.images.length >= 3" class="mt-12px flex gap-6px">
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

          <!-- 互动栏 -->
          <view class="mt-14px flex items-center justify-between">
            <text class="text-12px text-[#C0C4CC]">{{ post.time }}</text>
            <view class="flex items-center gap-20px">
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
                  :class="post.liked ? 'i-carbon-thumbs-up-filled text-[#12cdb0]' : 'i-carbon-thumbs-up text-[#C0C4CC]'"
                />
                <text class="text-12px text-[#8F96A3]">{{ post.likes }}</text>
              </view>
            </view>
          </view>
        </view>

        <!-- 没有更多 -->
        <view class="mt-20px pb-20px text-center">
          <text class="text-12px text-[#C0C4CC]">— 没有更多了 —</text>
        </view>
      </view>

      <!-- 评论 Tab -->
      <view v-if="currentTab === 'comments'" class="px-15px pb-30px pt-10px">
        <view
          v-for="comment in userComments"
          :key="comment.id"
          class="comment-card mb-12px rounded-16px bg-white px-16px py-16px"
          style="box-shadow: 0 2px 8px rgba(53, 64, 90, 0.04)"
          @click="goToCommentPost(comment)"
        >
          <!-- 评论内容 -->
          <text class="text-14px text-[#3D3D3D] leading-22px">{{ comment.content }}</text>

          <!-- 来源帖子 -->
          <view class="mt-12px rounded-10px bg-[#F7F7FA] px-12px py-10px">
            <view class="flex items-center gap-6px">
              <view class="i-carbon-reply h-12px w-12px text-[#C0C4CC]" />
              <text class="text-12px text-[#8F96A3]">{{ comment.postAuthor }}</text>
              <text class="text-12px text-[#8F96A3]">·</text>
              <text class="flex-1 text-12px text-[#272E3B] truncate">{{ comment.postTitle }}</text>
            </view>
          </view>

          <!-- 底部信息 -->
          <view class="mt-12px flex items-center justify-between">
            <text class="text-12px text-[#C0C4CC]">{{ comment.time }}</text>
            <view class="flex items-center gap-4px">
              <view class="i-carbon-thumbs-up-filled h-14px w-14px text-[#12cdb0]" />
              <text class="text-12px text-[#8F96A3]">{{ comment.likes }}</text>
            </view>
          </view>
        </view>

        <!-- 空状态 -->
        <view v-if="userComments.length === 0" class="flex flex-col items-center pt-60px">
          <view class="h-64px w-64px flex items-center justify-center rounded-full bg-[#F0FAFB]">
            <view class="i-carbon-chat h-32px w-32px text-[#C0E8F0]" />
          </view>
          <text class="mt-16px text-14px text-[#8F96A3]">还没有评论</text>
        </view>

        <!-- 没有更多 -->
        <view v-if="userComments.length > 0" class="mt-20px pb-20px text-center">
          <text class="text-12px text-[#C0C4CC]">— 没有更多了 —</text>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<style scoped lang="scss">
.userprofile-page {
  position: relative;
}

.nav-bar {
  background: transparent;
}

.profile-header {
  min-height: 340px;
}

.tab-item {
  transition: all 0.2s ease;
}

.post-card,
.comment-card {
  transition: background-color 0.2s ease;
}

.post-card:active,
.comment-card:active {
  background-color: #f8f8f8;
}
</style>
