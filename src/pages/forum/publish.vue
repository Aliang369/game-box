<script lang="ts" setup>
definePage({
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '发帖',
  },
})

// 板块信息（sectionColor 必须为 6 位 hex 格式，用于拼接 alpha 后缀）
const sectionId = ref('')
const sectionTitle = ref('')
const sectionColor = ref('#3AAFDC')

onLoad((options) => {
  if (options?.sectionId) sectionId.value = options.sectionId
  if (options?.sectionTitle) sectionTitle.value = decodeURIComponent(options.sectionTitle)
  if (options?.sectionColor) sectionColor.value = decodeURIComponent(options.sectionColor)
})

// 分区选择（静态数据，无需响应式）
const categories = [
  { id: 'guide', name: '攻略' },
  { id: 'question', name: '求助' },
  { id: 'discuss', name: '讨论' },
  { id: 'share', name: '分享' },
  { id: 'bug', name: 'BUG反馈' },
]
const selectedCategory = ref('')

// 布局模式：article=长文, dynamic=动态
const layoutMode = ref<'article' | 'dynamic'>('article')

// 标题
const title = ref('')
const titleMaxLength = 50

// ===== 长文模式（富文本编辑器） =====
const contentMaxLength = 5000
let editorCtx: any = null
const editorHtml = ref('')
const articleImageCount = ref(0)

function onEditorReady(e: any) {
  uni.createSelectorQuery()
    .select('#article-editor')
    .context((res) => {
      editorCtx = res.context
    })
    .exec()
}

function onEditorInput(e: any) {
  editorHtml.value = e.detail.html || ''
  // 统计图片数量
  const imgMatches = editorHtml.value.match(/<img/g)
  articleImageCount.value = imgMatches ? imgMatches.length : 0
  // 超过字数限制提示
  if (articleTextLength.value > contentMaxLength) {
    uni.showToast({ title: `正文内容不能超过${contentMaxLength}字`, icon: 'none' })
  }
}

function insertArticleImage() {
  if (articleImageCount.value >= 9) {
    uni.showToast({ title: '最多只能插入9张图片', icon: 'none' })
    return
  }
  uni.chooseImage({
    count: 9 - articleImageCount.value,
    sizeType: ['compressed'],
    sourceType: ['album', 'camera'],
    success: (res) => {
      res.tempFilePaths.forEach((path) => {
        editorCtx?.insertImage({
          src: path,
          width: '100%',
          success: () => {
            articleImageCount.value++
          },
        })
      })
    },
  })
}

// 长文模式纯文本长度（去除 HTML 标签）
const articleTextLength = computed(() => {
  return editorHtml.value.replace(/<[^>]+>/g, '').length
})

// 长文模式插入表情
function insertArticleEmoji(emoji: string) {
  editorCtx?.insertText({ text: emoji })
}

// ===== 动态模式 =====
const dynamicContent = ref('')
const dynamicImages = ref<string[]>([])
const dynamicMaxLength = 1000

function chooseDynamicImage() {
  if (dynamicImages.value.length >= 9) {
    uni.showToast({ title: '最多只能选择9张图片', icon: 'none' })
    return
  }
  uni.chooseImage({
    count: 9 - dynamicImages.value.length,
    sizeType: ['compressed'],
    sourceType: ['album', 'camera'],
    success: (res) => {
      dynamicImages.value.push(...res.tempFilePaths)
    },
  })
}

function removeDynamicImage(index: number) {
  dynamicImages.value.splice(index, 1)
}

function previewDynamicImage(index: number) {
  uni.previewImage({ current: index, urls: dynamicImages.value })
}

// ===== 通用 =====
const showEmoji = ref(false)

function toggleEmojiPanel() {
  showEmoji.value = !showEmoji.value
}

function onEmojiSelect(emoji: string) {
  if (layoutMode.value === 'dynamic') {
    dynamicContent.value += emoji
  }
  else {
    insertArticleEmoji(emoji)
  }
}

function chooseImage() {
  if (layoutMode.value === 'article') {
    insertArticleImage()
  }
  else {
    chooseDynamicImage()
  }
}

const currentImageCount = computed(() => {
  return layoutMode.value === 'article' ? articleImageCount.value : dynamicImages.value.length
})

const canPublish = computed(() => {
  if (selectedCategory.value === '') return false
  if (layoutMode.value === 'article') {
    return articleTextLength.value > 0 || articleImageCount.value > 0
  }
  return dynamicContent.value.trim().length > 0 || dynamicImages.value.length > 0
})

const hasContent = computed(() => {
  if (title.value.trim()) return true
  if (layoutMode.value === 'article') {
    return articleTextLength.value > 0 || articleImageCount.value > 0
  }
  return dynamicContent.value.trim().length > 0 || dynamicImages.value.length > 0
})

function publish() {
  if (!canPublish.value) return
  uni.showLoading({ title: '发布中...' })
  setTimeout(() => {
    uni.hideLoading()
    uni.showToast({ title: '发布成功', icon: 'success' })
    setTimeout(() => {
      uni.navigateBack()
    }, 1200)
  }, 800)
}

function goBack() {
  if (hasContent.value) {
    uni.showModal({
      title: '提示',
      content: '确定要放弃编辑吗？',
      confirmText: '放弃',
      confirmColor: '#FF6B6B',
      success: (res) => {
        if (res.confirm) {
          uni.navigateBack()
        }
      },
    })
  }
  else {
    uni.navigateBack()
  }
}
</script>

<template>
  <view class="publish-page flex flex-col min-h-100vh bg-[#F7F7FA]">
    <!-- 顶部导航栏 -->
    <view class="bg-white" style="padding-top: env(safe-area-inset-top)">
      <view class="flex h-44px items-center justify-between px-15px">
        <view class="flex h-32px w-32px items-center justify-center" @click="goBack">
          <view class="i-carbon-close h-22px w-22px text-[#272E3B]" />
        </view>
        <text class="text-17px text-[#272E3B] font-600">发帖</text>
        <view
          class="flex h-32px items-center rounded-30px px-16px"
          :style="{
            background: canPublish ? sectionColor : '#E0E0E0',
            opacity: canPublish ? 1 : 0.6,
          }"
          @click="publish"
        >
          <text class="text-13px text-white font-500">发布</text>
        </view>
      </view>
    </view>

    <!-- 板块 + 分区 + 布局切换 -->
    <view class="mx-15px mt-12px rounded-16px bg-white px-16px py-14px">
      <view class="flex items-center gap-8px">
        <view
          class="h-24px w-24px flex items-center justify-center rounded-6px"
          :style="{ background: `${sectionColor}18` }"
        >
          <view class="i-carbon-forum h-14px w-14px" :style="{ color: sectionColor }" />
        </view>
        <text class="text-13px text-[#272E3B] font-500">{{ sectionTitle }}</text>
      </view>

      <scroll-view scroll-x class="mt-12px whitespace-nowrap">
        <view class="inline-flex gap-8px">
          <view
            v-for="cat in categories"
            :key="cat.id"
            class="inline-flex h-30px items-center rounded-30px px-14px"
            :style="{
              background: selectedCategory === cat.id ? `${sectionColor}15` : '#F5F6F8',
              border: selectedCategory === cat.id ? `1px solid ${sectionColor}50` : '1px solid transparent',
            }"
            @click="selectedCategory = cat.id"
          >
            <text
              class="text-12px font-500"
              :style="{ color: selectedCategory === cat.id ? sectionColor : '#5A6070' }"
            >{{ cat.name }}</text>
          </view>
        </view>
      </scroll-view>

      <view class="mt-12px flex items-center gap-12px">
        <view
          class="flex items-center gap-6px rounded-8px px-12px py-6px"
          :style="{
            background: layoutMode === 'article' ? `${sectionColor}12` : '#F5F6F8',
            border: layoutMode === 'article' ? `1px solid ${sectionColor}30` : '1px solid transparent',
          }"
          @click="layoutMode = 'article'"
        >
          <view class="i-carbon-document h-16px w-16px" :style="{ color: layoutMode === 'article' ? sectionColor : '#8F96A3' }" />
          <text class="text-12px font-500" :style="{ color: layoutMode === 'article' ? sectionColor : '#8F96A3' }">长文</text>
        </view>
        <view
          class="flex items-center gap-6px rounded-8px px-12px py-6px"
          :style="{
            background: layoutMode === 'dynamic' ? `${sectionColor}12` : '#F5F6F8',
            border: layoutMode === 'dynamic' ? `1px solid ${sectionColor}30` : '1px solid transparent',
          }"
          @click="layoutMode = 'dynamic'"
        >
          <view class="i-carbon-image h-16px w-16px" :style="{ color: layoutMode === 'dynamic' ? sectionColor : '#8F96A3' }" />
          <text class="text-12px font-500" :style="{ color: layoutMode === 'dynamic' ? sectionColor : '#8F96A3' }">动态</text>
        </view>
      </view>
    </view>

    <!-- 标题输入 -->
    <view class="mx-15px mt-12px rounded-16px bg-white px-16px py-14px">
      <input
        v-model="title"
        class="w-full text-16px text-[#272E3B] font-600"
        placeholder="请输入标题（选填）"
        placeholder-class="text-[#C0C4CC]"
        :maxlength="titleMaxLength"
      />
    </view>

    <!-- ===== 长文模式：富文本编辑器 ===== -->
    <view v-if="layoutMode === 'article'" class="mx-15px mt-12px flex-1 rounded-16px bg-white px-16px py-14px mb-60px">
      <editor
        id="article-editor"
        class="w-full text-14px text-[#3D3D3D] leading-22px"
        placeholder="分享你的想法..."
        :show-img-size="false"
        :show-img-toolbar="false"
        :show-img-resize="false"
        style="height: calc(100vh - 380px); width: 100%"
        @ready="onEditorReady"
        @input="onEditorInput"
      />
    </view>

    <!-- ===== 动态模式：输入框在上，图片在下 ===== -->
    <view v-else class="mx-15px mt-12px flex-1 flex flex-col rounded-16px bg-white px-16px py-14px mb-60px">
      <textarea
        v-model="dynamicContent"
        class="w-full text-14px text-[#3D3D3D] leading-22px"
        placeholder="分享你的想法..."
        placeholder-class="text-[#C0C4CC]"
        :maxlength="dynamicMaxLength"
        :auto-height="true"
        style="min-height: calc(100vh - 380px)"
      />

      <!-- 图片区域（在输入框下方） -->
      <view v-if="dynamicImages.length > 0" class="mt-12px flex flex-wrap gap-8px">
        <view
          v-for="(img, index) in dynamicImages"
          :key="index"
          class="relative h-90px w-90px overflow-hidden rounded-10px"
        >
          <image :src="img" mode="aspectFill" class="h-full w-full" @click="previewDynamicImage(index)" />
          <view
            class="absolute right-4px top-4px flex h-18px w-18px items-center justify-center rounded-full bg-black/50"
            @click.stop="removeDynamicImage(index)"
          >
            <view class="i-carbon-close h-10px w-10px text-white" />
          </view>
        </view>
      </view>
    </view>

    <!-- 底部工具栏 -->
    <view class="fixed bottom-0 left-0 right-0 z-90 bg-white border-t border-[#F0F0F0]" style="padding-bottom: env(safe-area-inset-bottom)">
      <view class="flex items-center gap-6px px-15px py-10px">
        <!-- 图片按钮 -->
        <view class="flex h-34px w-34px items-center justify-center" @click="chooseImage">
          <view class="i-carbon-image h-22px w-22px" :class="currentImageCount > 0 ? 'text-[#3AAFDC]' : 'text-[#8F96A3]'" />
        </view>
        <!-- 表情按钮 -->
        <view class="flex h-34px w-34px items-center justify-center" @click="toggleEmojiPanel">
          <view
            class="h-24px w-24px"
            :class="showEmoji ? 'i-carbon-keyboard text-[#3AAFDC]' : 'i-carbon-face-satisfied text-[#8F96A3]'"
          />
        </view>
        <!-- 图片计数 -->
        <text v-if="currentImageCount > 0" class="ml-auto text-11px text-[#8F96A3]">{{ currentImageCount }}/9</text>
      </view>

      <!-- 表情面板 -->
      <EmojiPicker :show="showEmoji" @select="onEmojiSelect" />
    </view>
  </view>
</template>

<style scoped lang="scss">
.publish-page {
  textarea {
    width: 100%;
    box-sizing: border-box;
  }
  // 富文本编辑器样式
  #article-editor {
    width: 100%;
    :deep(.ql-editor.ql-blank::before) {
      color: #C0C4CC;
      font-style: normal;
    }
    :deep(img) {
      max-width: 100%;
      border-radius: 8px;
      margin: 8px 0;
    }
  }
}
</style>
