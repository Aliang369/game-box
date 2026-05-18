<script lang="ts" setup>
import { useGameStore } from '@/store/game'
import { useFavoriteStore } from '@/store/favorite'
import { useDownloadStore } from '@/store/download'
import type { Game } from '@/types/game.d'

definePage({
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '酷鸭手游',
  },
})

const gameStore = useGameStore()
const favoriteStore = useFavoriteStore()
const downloadStore = useDownloadStore()

const props = defineProps<{
  gameid: string
}>()

const gameInfo = ref<Game | null>(null)
const isExpanded = ref(false)

// 收藏状态
const isFavorited = computed(() => props.gameid ? favoriteStore.isFavorite(props.gameid) : false)

function handleFavorite() {
  if (props.gameid) {
    const added = favoriteStore.toggleFavorite(props.gameid)
    uni.showToast({ title: added ? '收藏成功' : '已取消收藏', icon: 'none' })
  }
}

onLoad(() => {
  if (props.gameid) {
    const found = gameStore.findGame(props.gameid)
    if (found) {
      gameInfo.value = found
    }
  }
})

function leftClick() {
  const pages = getCurrentPages()
  if (pages.length > 1) {
    uni.navigateBack({ delta: 1 })
  }
}

function goToDownload() {
  uni.navigateTo({ url: '/pages/download/download' })
}

// 下载状态
const downloadStatus = computed(() => props.gameid ? downloadStore.getGameDownloadStatus(props.gameid) : null)
const downloadBtnText = computed(() => {
  switch (downloadStatus.value) {
    case 'waiting': return '等待中'
    case 'downloading': {
      const task = downloadStore.findTask(props.gameid)
      return task ? `${task.progress}%` : '下载中'
    }
    case 'paused': return '重新下载'
    case 'completed': return '已下载'
    case 'failed': return '重新下载'
    default: return '下载'
  }
})

function handleDownload() {
  if (!props.gameid) return
  if (downloadStatus.value === 'downloading' || downloadStatus.value === 'waiting') {
    // 正在下载，跳转到下载中心
    uni.navigateTo({ url: '/pages/download/download' })
    return
  }
  if (downloadStatus.value === 'completed') {
    // 已完成，尝试安装
    downloadStore.installApk(props.gameid)
    return
  }
  // 开始下载 / 重试
  downloadStore.startDownload(props.gameid)
}

function toggleExpand() {
  isExpanded.value = !isExpanded.value
}

// 分享弹窗
const sharePopupRef = ref()
function openShare() {
  sharePopupRef.value?.open(props.gameid)
}
</script>

<template>
  <view v-if="gameInfo">
    <!-- 固定导航栏 -->
    <view
      class="fixed top-0 left-0 w-full z-2 h-90px flex items-center"
      style="background: linear-gradient(180deg, #E5F9FF 0%, #F7F6FB 100%)"
    >
      <view class="flex flex-row w-full h-25px pt-20px text-[#272E3B] text-18px justify-between mx-15px">
        <view @click="leftClick">
          <image src="/static/gamedetail/back_icon.png" mode="aspectFit" class="w-25px h-25px" />
        </view>
        <view class="ml-30px leading-25px">{{ gameInfo.gameName }}</view>
        <view class="flex items-center">
          <view
            class="w-25px h-25px flex items-center justify-center"
            @click="handleFavorite"
          >
            <view
              v-if="isFavorited"
              class="i-carbon-favorite-filled w-22px h-22px text-[#ff6b6b] transition-all duration-200"
            />
            <view
              v-else
              class="i-carbon-favorite w-22px h-22px text-[#272E3B] transition-all duration-200"
            />
          </view>
          <image src="/static/gamedetail/download.png" mode="aspectFit" class="w-25px h-25px ml-15px" @click="goToDownload" />
          <image src="/static/gamedetail/share.png" mode="aspectFit" class="w-25px h-25px ml-15px" @click="openShare" />
        </view>
      </view>
    </view>

    <!-- 内容区域 -->
    <view class="bg-[#F7F6FB] mt-40px">
      <!-- 游戏基本信息 -->
      <view class="px-15px pt-60px pb-10px">
        <view class="flex items-center gap-12px justify-between">
          <view class="w-70px h-70px rounded-8px overflow-hidden flex-shrink-0">
            <image :src="gameInfo.gameIcon" mode="aspectFill" class="w-full h-full object-cover" />
          </view>
          <view class="flex-1 min-w-0">
            <view class="text-16px font-500 m-0 truncate leading-22px">{{ gameInfo.gameName }}</view>
            <view class="flex gap-6px my-5px items-center">
              <text v-if="gameInfo.gameType" class="inline-flex items-center h-16px leading-none text-11px text-[#12cdb0] rounded-4px">{{ gameInfo.gameType }}</text>
              <text
                v-for="tag in gameInfo.gameTags"
                :key="tag"
                class="inline-flex items-center h-16px leading-none text-11px text-[#A7A8A7] rounded-4px"
              >{{ tag }}</text>
            </view>
            <view class="text-14px text-[#7A7D7A] leading-20px">{{ gameInfo.gameCount }}人在玩</view>
          </view>
          <view
            class="w-70px h-35px rounded-30px flex items-center justify-center text-white flex-shrink-0"
            style="background: linear-gradient(95deg, #2bc18a, #5ad88c)"
          >
            <text class="text-15px font-900">{{ gameInfo.gameScoreText }}</text>
            <text class="text-11px ml-1px">折</text>
          </view>
        </view>
      </view>

      <!-- 截图轮播 -->
      <view class="px-15px">
        <scroll-view scroll-x class="w-full whitespace-nowrap">
          <view class="inline-flex gap-10px">
            <image
              v-for="(card, idx) in gameInfo.cardList"
              :key="idx"
              :src="card.image"
              mode="aspectFill"
              class="w-213px h-355px rounded-12px flex-shrink-0"
            />
          </view>
        </scroll-view>
      </view>

      <!-- 游戏详情 -->
      <view class="mt-10px bg-white px-15px pb-150px rounded-t-20px">
        <view class="relative pb-36px">
          <view class="text-[#030200] text-18px font-700 py-10px leading-25px">游戏详情</view>
          <view
            class="text-[#4f5257] text-16px leading-24px overflow-hidden transition-all duration-300"
            :class="isExpanded ? 'block' : 'line-clamp-5'"
          >
            {{ gameInfo.gameDescription }}
          </view>
          <view
            v-if="gameInfo.gameDescription.length >= 150"
            class="absolute bottom-0 right-0 text-[#00aaa0] text-14px font-500 px-12px py-8px"
            @click="toggleExpand"
          >
            {{ isExpanded ? '收起' : '更多' }}
          </view>
        </view>

        <view class="text-[#030200] text-18px font-700 py-10px leading-25px">版号信息</view>
        <view class="h-83px bg-[#f6f9f9] rounded-20px flex flex-col justify-center flex-wrap px-15px">
          <view class="my-4px">
<view class="text-16px text-[#4f5257] mb-4px leading-22px">版本号</view>
             <view class="text-14px text-[#82898f] leading-20px">{{ gameInfo.versionInfo.versionNumber }}</view>
          </view>
          <view class="my-4px">
<view class="text-16px text-[#4f5257] mb-4px leading-22px">APP备案码</view>
             <view class="text-14px text-[#82898f] leading-20px">{{ gameInfo.versionInfo.appRecordCode }}</view>
          </view>
        </view>
      </view>

      <!-- 底部下载按钮 -->
      <view class="fixed bottom-0 w-full h-78px bg-white flex justify-center items-center z-1000">
        <view
          class="w-90% max-w-600px h-50px flex justify-center items-center text-white text-18px rounded-30px"
          style="background: linear-gradient(95deg, #2bc18a, #5ad88c)"
          @click="handleDownload"
        >
          {{ downloadBtnText }}
        </view>
      </view>
    </view>

    <!-- 分享弹窗 -->
    <SharePopup ref="sharePopupRef" />
  </view>
</template>
