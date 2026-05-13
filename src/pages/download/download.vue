<script lang="ts" setup>
definePage({
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '下载中心',
  },
})

function leftClick() {
  const pages = getCurrentPages()
  if (pages.length > 1) {
    uni.navigateBack({ delta: 1 })
  }
}
</script>

<template>
  <view>
    <!-- 导航栏 -->
    <view
      class="fixed top-0 left-0 w-full z-2 h-90px flex items-center"
      style="background: linear-gradient(180deg, #E5F9FF 0%, #F7F6FB 100%)"
    >
      <view class="flex flex-row w-full h-25px pt-20px text-[#272E3B] text-18px justify-between mx-15px">
        <view @click="leftClick">
          <image src="/static/gamedetail/back_icon.png" mode="aspectFit" class="w-25px h-25px" />
        </view>
        <view>下载中心</view>
        <view class="w-25px" />
      </view>
    </view>

    <view class="pt-100px px-15px">
      <view class="text-center text-14px text-[#999] mt-50px">
        暂无下载记录
      </view>
    </view>
  </view>
</template>
