<script lang="ts" setup>
import { useGameStore } from '@/store/game'
import RankPage from './components/RankPage.vue'

definePage({
  type: 'home',
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '首页',
  },
})

const gameStore = useGameStore()

// 当前 tab 索引（0=推荐, 1=排行）
const currentSwiperIndex = ref(0)

// 轮播图当前索引
const swiperCurrent = ref(0)

// 切换 tab
function swiperTo(index: number) {
  currentSwiperIndex.value = index
}

function onSwiperChange(e: any) {
  currentSwiperIndex.value = e.detail.current
}

// 轮播图切换
function onSwiperItemChange(e: any) {
  swiperCurrent.value = e.detail.current
}

// 计算介绍框样式
function swiperItemStyle(index: number) {
  return {
    opacity: index === swiperCurrent.value ? 1 : 0,
    transform: `translateX(${index === swiperCurrent.value ? '0' : '100%'})`,
    transition: 'all 0.3s ease',
  }
}

// 跳转搜索
function goToSearch() {
  uni.navigateTo({ url: '/pages/search/search' })
}

// 点击轮播图
function handleSwiperClick(item: any) {
  gameStore.incrementGameCount(item.gameid)
  uni.navigateTo({ url: `/pages/gamedetail/gamedetail?gameid=${item.gameid}` })
}

// 点击推荐游戏
function handleRecommendClick(item: any) {
  if (!item) return
  gameStore.incrementGameCount(item.gameid)
  uni.navigateTo({ url: `/pages/gamedetail/gamedetail?gameid=${item.gameid}` })
}

// 点击游戏列表项
function handleClick(item: any) {
  gameStore.incrementGameCount(item.gameid)
  uni.navigateTo({ url: `/pages/gamedetail/gamedetail?gameid=${item.gameid}` })
}

// 触底加载
function handleScrollToLower() {
  // 当前使用本地数据，无需加载更多
}
</script>

<template>
  <view class="h-100vh relative flex flex-col">
    <!-- 导航栏 -->
    <view
      class="fixed top-0 left-0 w-full z-2 h-80px flex items-center"
      style="background: linear-gradient(180deg, #E5F9FF 0%, #F7F6FB 100%)"
    >
      <view class="flex w-full h-25px pt-40px text-18px justify-between mx-20px text-[#272E3B]">
        <view class="flex justify-center items-center">
          <view
            class="mr-20px text-center text-16px text-[#666] font-400 relative transition-all duration-300"
            :class="{ 'text-black font-600 scale-150': currentSwiperIndex === 0 }"
            @click="swiperTo(0)"
          >
            推荐
          </view>
          <view
            class="mr-20px text-center text-16px text-[#666] font-400 relative transition-all duration-300"
            :class="{ 'text-black font-600 scale-150': currentSwiperIndex === 1 }"
            @click="swiperTo(1)"
          >
            排行
          </view>
        </view>
        <view @click="goToSearch">
          <image src="/static/search.png" mode="aspectFit" class="w-25px h-25px" />
        </view>
      </view>
    </view>

    <!-- 滑动容器 -->
    <swiper
      class="flex-1 mt-80px overflow-hidden"
      :current="currentSwiperIndex"
      :duration="300"
      :disable-touch="false"
      @change="onSwiperChange"
    >
      <!-- 推荐页 -->
      <swiper-item>
        <scroll-view scroll-y class="h-full" @scrolltolower="handleScrollToLower">
          <view class="px-15px min-h-full">
            <!-- 游戏轮播图 -->
            <view class="w-full mt-15px relative">
              <swiper
                class="relative"
                :current="swiperCurrent"
                :autoplay="true"
                :interval="3000"
                :duration="500"
                indicator-dots
                :circular="true"
                indicator-color="rgba(255,255,255,0.3)"
                indicator-active-color="#fff"
                style="height: 833rpx; border-radius: 15px; overflow: hidden"
                @change="onSwiperItemChange"
              >
                <swiper-item
                  v-for="(item, index) in gameStore.activeSwiperList"
                  :key="index"
                  style="border-radius: 15px"
                  @click="handleSwiperClick(item)"
                >
                  <image :src="item.Swiperimg" mode="widthFix" class="w-full object-cover" />
                </swiper-item>
              </swiper>
              <!-- 动态介绍框 -->
              <view
                v-for="(item, index) in gameStore.activeSwiperList"
                :key="`intro-${index}`"
                class="absolute left-10px right-10px bottom-20px z-1"
                :style="swiperItemStyle(index)"
                @click="handleSwiperClick(item)"
              >
                <view
                  class="flex justify-between items-center rounded-10px px-15px py-10px text-white"
                  style="backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); background: rgba(255, 255, 255, 0.1)"
                >
                  <view>
                    <view class="text-23px font-700 leading-32px">{{ item.gameName }}</view>
                    <view class="flex gap-8px pt-5px items-center">
                      <text
                        class="inline-flex items-center h-16px leading-none text-white px-8px rounded-5px text-10.5px font-500"
                        style="border: 1px solid rgba(255, 255, 255, 0.8)"
                      >{{ item.gameType }}</text>
                      <text
                        v-for="tag in item.gameTags"
                        :key="tag"
                        class="inline-flex items-center h-16px leading-none text-white px-8px rounded-5px text-10.5px font-500"
                        style="border: 1px solid rgba(255, 255, 255, 0.8)"
                      >{{ tag }}</text>
                    </view>
                  </view>
                  <view
                    class="flex items-center px-12px py-4px mb-12px rounded-20px"
                    style="border: 1px solid rgba(255, 255, 255, 0.8)"
                  >
                    <text class="text-17.5px font-700 mr-6px">{{ item.gameScoreText }}</text>
                    <text class="text-16px font-500">折</text>
                  </view>
                </view>
              </view>
            </view>

            <!-- 编辑推荐 -->
            <view
              v-if="gameStore.recommendGame"
              class="rounded-10px overflow-hidden my-10px"
              style="background: url(/static/GameRecommend2.png) no-repeat center; background-size: cover; border: 1px solid #fed719"
              @click="handleRecommendClick(gameStore.recommendGame)"
            >
              <view class="h-auto p-12px box-border flex flex-col gap-8px">
                <view class="flex items-start gap-12px justify-between mt-5px">
                  <image :src="gameStore.recommendGame.gameIcon" mode="aspectFill" class="w-60px h-60px rounded-8px flex-shrink-0" />
                  <view class="flex-1">
                    <view class="text-18px font-600 m-0 leading-25px">{{ gameStore.recommendGame.gameName }}</view>
                    <view class="flex gap-6px mt-7px items-center">
                      <text class="inline-flex items-center h-16px leading-none text-black rounded-4px text-12px">{{ gameStore.recommendGame.gameType }}</text>
                      <text v-for="tag in gameStore.recommendGame.gameTags" :key="tag" class="inline-flex items-center h-16px leading-none text-black rounded-4px text-12px">{{ tag }}</text>
                    </view>
                  </view>
                  <view
                    class="w-80px h-35px text-center text-[#ffd100] flex flex-col justify-center items-center mt-10px flex-shrink-0"
                    style="background-image: url('/static/recommendbg.png'); background-repeat: no-repeat; background-size: 100% auto"
                  >
                    <view class="text-20px font-700 leading-none mb-2px mt-10px">
                      <text>{{ gameStore.recommendGame.gameScoreText }}</text>
                      <text class="text-10px font-400 ml-2px">折</text>
                    </view>
                    <view class="text-12px leading-none">编辑推荐</view>
                  </view>
                </view>
                <view class="text-13px text-[#7A7D7A]">
                  小编推荐：{{ gameStore.recommendGame.gameInfo }}
                </view>
              </view>
            </view>

            <!-- 游戏列表 -->
            <view class="bg-white rounded-10px overflow-hidden my-10px">
              <view class="p-12px box-border flex flex-col gap-12px">
                <view
                  v-for="(item, index) in gameStore.visibleGameList"
                  :key="index"
                  class="flex items-center gap-12px justify-between"
                  @click="handleClick(item)"
                >
                  <view class="w-70px h-70px rounded-8px overflow-hidden flex-shrink-0">
                    <image :src="item.gameIcon" mode="aspectFill" class="w-full h-full object-cover" />
                  </view>
                  <view class="flex-1 min-w-0">
                    <view class="text-16px font-500 m-0 truncate leading-22px">{{ item.gameName }}</view>
                    <view class="flex gap-6px my-5px items-center">
                      <text class="inline-flex items-center h-16px leading-none text-11px text-[#12cdb0] rounded-4px">{{ item.gameType }}</text>
                      <text
                        v-for="tag in item.gameTags"
                        :key="tag"
                        class="inline-flex items-center h-16px leading-none text-11px text-[#A7A8A7] rounded-4px"
                      >{{ tag }}</text>
                    </view>
                    <view class="text-14px text-[#7A7D7A] leading-20px">{{ item.gameCount }}人在玩</view>
                  </view>
                  <view
                    class="w-70px h-35px rounded-30px flex items-center justify-center text-white flex-shrink-0"
                    style="background: linear-gradient(95deg, #2bc18a, #5ad88c)"
                  >
                    <text class="text-15px font-900">{{ item.gameScoreText }}</text>
                    <text class="text-11px ml-1px">折</text>
                  </view>
                </view>
              </view>
            </view>

            <view class="bottom-text">没有更多了</view>
          </view>
        </scroll-view>
      </swiper-item>

      <!-- 排行页 -->
      <swiper-item>
        <scroll-view scroll-y class="h-full">
          <view class="px-15px min-h-full">
            <RankPage />
          </view>
        </scroll-view>
      </swiper-item>
    </swiper>
  </view>
</template>
