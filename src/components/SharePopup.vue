<script lang="ts" setup>
const show = ref(false)

const shareList = [
  { icon: '/static/sharePopup/link.png', name: '复制链接' },
]

function close() {
  show.value = false
}

function handleShare(name: string) {
  if (name === '复制链接') {
    const pages = getCurrentPages()
    if (pages.length === 0) return
    const currentPage = pages[pages.length - 1] as any
    let fullPath: string = currentPage.$page?.fullPath || currentPage.route || ''

    const baseURL = import.meta.env.VITE_BASE_URL || 'http://192.168.31.117:5173'

    if (!fullPath.startsWith('http')) {
      fullPath = `${baseURL}/#${fullPath}`
    }

    uni.setClipboardData({
      data: fullPath,
      success() {
        uni.showToast({ title: '链接已复制' })
        close()
      },
      fail() {
        uni.showToast({ title: '复制失败' })
      },
    })
  }
}

defineExpose({
  open: () => (show.value = true),
  close,
})
</script>

<template>
  <wd-popup v-model="show" position="bottom" :z-index="1100" :safe-area-inset-bottom="true" custom-style="border-radius: 16px 16px 0 0">
    <view class="p-20px">
      <view class="text-center mb-20px text-[#666] text-16px">分享到</view>
      <view class="flex flex-wrap justify-center gap-50px mb-20px">
        <view
          v-for="(item, index) in shareList"
          :key="index"
          class="flex flex-col items-center"
          @click="handleShare(item.name)"
        >
          <image :src="item.icon" mode="aspectFit" class="w-30px h-30px" />
          <text class="mt-5px text-[#333] text-14px">{{ item.name }}</text>
        </view>
      </view>
      <view
        class="text-center py-12px bg-[#f5f5f5] rounded-20px text-[#666] text-16px"
        @click="close"
      >
        取消
      </view>
    </view>
  </wd-popup>
</template>
