<script lang="ts" setup>
import { useGameStore } from '@/store/game'
import type { Game } from '@/types/game.d'

definePage({
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '搜索',
  },
})

const gameStore = useGameStore()

const keyword = ref('')
const isSearching = ref(false)
const searchHistory = ref<string[]>([])

// 搜索结果
const searchResults = computed(() => {
  if (!keyword.value) return []
  const query = keyword.value.toLowerCase()
  return gameStore.visibleGameList.filter((item) => {
    const nameMatch = item.gameName.toLowerCase().includes(query)
    const typeMatch = item.gameType.toLowerCase().includes(query)
    const tagMatch = item.gameTags.some(tag => tag.toLowerCase().includes(query))
    return nameMatch || typeMatch || tagMatch
  }).slice(0, 10)
})

// 热门搜索
const activeSearchHots = computed(() => {
  return gameStore.visibleSearchhotList.map(item => ({
    ...item,
    gameName: item.game?.gameName || `游戏${item.gameid}`,
  }))
})

// 搜索处理
function handleSearch() {
  const kw = keyword.value.trim()
  if (!kw) return

  const index = searchHistory.value.findIndex(h => h === kw)
  if (index > -1) {
    searchHistory.value.splice(index, 1)
  }
  searchHistory.value.unshift(kw)

  if (searchHistory.value.length > 20) {
    searchHistory.value.pop()
  }

  uni.setStorageSync('searchHistory', searchHistory.value)
  isSearching.value = true
}

// 监听 keyword 清空
watch(keyword, (val) => {
  if (!val.trim()) {
    isSearching.value = false
  }
})

// 点击历史标签
function handleHistoryClick(kw: string) {
  keyword.value = kw
  isSearching.value = true
}

// 清空历史
function clearSearchHistory() {
  searchHistory.value = []
  uni.removeStorageSync('searchHistory')
  uni.showToast({ title: '历史记录已清空', icon: 'none' })
}

// 删除单条历史
function removeHistory(index: number) {
  searchHistory.value.splice(index, 1)
  uni.setStorageSync('searchHistory', searchHistory.value)
}

// 点击游戏
function handleClick(item: Game) {
  gameStore.incrementGameCount(item.gameid)
  uni.navigateTo({ url: `/pages/gamedetail/gamedetail?gameid=${item.gameid}` })
}

// 返回
function leftClick() {
  const pages = getCurrentPages()
  if (pages.length > 1) {
    uni.navigateBack({ delta: 1 })
  }
}

// 跳转游戏详情
function goToGameDetail(gameid: string) {
  uni.navigateTo({ url: `/pages/gamedetail/gamedetail?gameid=${gameid}` })
}

// 新游申请弹窗
const newgamePopupRef = ref()
function openNewGame() {
  newgamePopupRef.value?.open()
}

// 初始化
onMounted(() => {
  const stored = uni.getStorageSync('searchHistory')
  if (stored) {
    searchHistory.value = stored
  }
})
</script>

<template>
  <view>
    <!-- 搜索导航栏 -->
    <view
      class="fixed top-0 left-0 w-full z-10 h-90px flex items-center"
      style="background: linear-gradient(180deg, #E5F9FF 0%, #F7F6FB 100%)"
    >
      <view class="flex flex-row flex-nowrap w-full pt-20px px-15px items-center">
        <view class="w-38px flex-shrink-0" @click="leftClick">
          <image src="/static/gamedetail/back_icon.png" mode="aspectFit" class="w-25px h-25px" />
        </view>
        <view class="flex-1 min-w-0">
          <wd-search
            v-model="keyword"
            placeholder="搜索你想玩的游戏"
            placeholder-left
            cancel-txt="搜索"
            custom-class="wd-search--no-bg"
            @search="handleSearch"
            @cancel="handleSearch"
          />
        </view>
      </view>
    </view>

    <!-- 搜索内容（未搜索时） -->
    <view v-show="!isSearching" class="pt-90px mx-15px">
      <!-- 搜索历史 -->
      <view v-if="searchHistory.length > 0">
        <view class="flex justify-between items-center">
          <text class="text-18px">搜索历史</text>
          <view class="w-25px h-25px">
            <image src="/static/search/empty.png" class="w-full h-full" @click="clearSearchHistory" />
          </view>
        </view>
        <view class="flex flex-wrap mt-10px">
          <view
            v-for="(kw, index) in searchHistory"
            :key="index"
            class="relative m-5px"
          >
            <view
              class="bg-[#edeff0] text-[#4f5257] rounded-30px px-14px py-6px text-14px"
              @click="handleHistoryClick(kw)"
            >
              {{ kw }}
            </view>
            <view
              class="absolute top--3px right--3px w-18px h-18px rounded-full bg-[#d7dcdf] flex items-center justify-center"
              @click.stop="removeHistory(index)"
            >
              <text class="text-[#6c7378] text-12px font-600 leading-none">x</text>
            </view>
          </view>
        </view>
      </view>

      <!-- 热门搜索 -->
      <view class="mt-15px">
        <text class="text-18px">热门搜索</text>
        <view class="flex flex-wrap mt-10px">
          <view
            v-for="hot in activeSearchHots"
            :key="hot.Searchhotid"
            class="bg-[#edeff0] text-[#4f5257] rounded-30px px-14px py-6px m-5px text-14px"
            @click="goToGameDetail(hot.gameid)"
          >
            {{ hot.gameName }}
          </view>
        </view>
      </view>
    </view>

    <!-- 搜索结果 -->
    <view v-show="isSearching" class="pt-90px mx-15px">
      <view v-if="searchResults.length > 0">
        <view class="bg-white rounded-10px overflow-hidden my-10px">
          <view class="p-12px box-border flex flex-col gap-12px">
            <view
              v-for="item in searchResults"
              :key="item.gameid"
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
      </view>

      <!-- 无结果 -->
      <view v-else>
        <view class="flex justify-center mt-20px">
          <text>暂无数据，</text>
          <text class="text-[#29bccc]" @click="openNewGame">点击申请新游</text>
        </view>
        <view class="mt-15px">
          <text class="text-18px">热门搜索</text>
          <view class="flex flex-wrap mt-10px">
            <view
              v-for="hot in activeSearchHots"
              :key="hot.Searchhotid"
              class="bg-[#edeff0] text-[#4f5257] rounded-30px px-14px py-6px m-5px text-14px"
              @click="goToGameDetail(hot.gameid)"
            >
              {{ hot.gameName }}
            </view>
          </view>
        </view>
        <NewgamePopup ref="newgamePopupRef" />
      </view>
    </view>
  </view>
</template>

<style lang="scss">
.wd-search--no-bg {
  background: transparent !important;
  padding: 0 !important;

  :deep(.wd-search__block) {
    position: relative;
    width: 100%;
    min-height: 40px;
    display: flex;
    align-items: center;
  }

  :deep(.wd-search__field) {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    min-width: 0;
    min-height: 40px;
    border: 1.5px solid #111;
    border-radius: 999px;
    background: #fff;
    padding: 0 108px 0 10px;
    box-sizing: border-box;
  }

  :deep(.wd-search__search-left-icon) {
    margin-right: 6px;
  }

  :deep(.wd-search__input) {
    flex: 1;
    min-width: 0;
    padding-left: 30px;
    padding-right: 0;
    color: #272e3b;
  }

  :deep(.wd-search__input .uni-input-input) {
    width: 100% !important;
  }

  :deep(.wd-search__placeholder-txt) {
    color: #272e3b;
  }

  :deep(.wd-search__cancel) {
    position: absolute;
    top: 50%;
    right: 8px;
    transform: translateY(-50%);
    min-width: 56px;
    height: 30px;
    padding-left: 0;
    padding-right: 0;
    margin-left: 0;
    margin-top: 10px;
    margin-right: 15px;
    border-radius: 999px;
    background: #111;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 600;
    line-height: 1;
  }

  :deep(.wd-search__clear) {
    position: absolute;
    top: 50%;
    right: 72px;
    transform: translateY(-50%);
    margin-left: 0px;
    margin-right: 0;
    padding-top: 3px;
    padding-bottom: 3px;
    padding-left: 3px;
    padding-right: 3px;
  }
}
</style>
