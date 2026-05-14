<script lang="ts" setup>
const props = defineProps<{
  title?: string
  content: string
  confirmText?: string
  cancelText?: string
  confirmColor?: string
  showIcon?: boolean
  iconType?: 'warning' | 'danger' | 'info'
}>()

const emit = defineEmits<{
  confirm: []
  cancel: []
}>()

const show = ref(false)

function open() {
  show.value = true
}

function close() {
  show.value = false
}

function handleConfirm() {
  close()
  emit('confirm')
}

function handleCancel() {
  close()
  emit('cancel')
}

defineExpose({ open, close })
</script>

<template>
  <wd-popup v-model="show" position="center" :z-index="1200" custom-style="border-radius: 20px; width: 80%; overflow: hidden">
    <view class="confirm-card bg-white rounded-20px px-24px pt-28px pb-22px">
      <!-- 图标 -->
      <view v-if="showIcon !== false" class="flex justify-center mb-16px">
        <view
          class="h-52px w-52px flex items-center justify-center rounded-full"
          :class="{
            'bg-[#FFF3E0]': iconType === 'warning' || !iconType,
            'bg-[#FFEBEE]': iconType === 'danger',
            'bg-[#E5F9FF]': iconType === 'info',
          }"
        >
          <view
            class="h-26px w-26px"
            :class="{
              'i-carbon-warning text-[#FF9800]': iconType === 'warning' || !iconType,
              'i-carbon-close-filled text-[#F44336]': iconType === 'danger',
              'i-carbon-information text-[#3AAFDC]': iconType === 'info',
            }"
          />
        </view>
      </view>

      <!-- 标题 -->
      <view v-if="title" class="text-center mb-8px">
        <text class="text-18px text-[#272E3B] font-700">{{ title }}</text>
      </view>

      <!-- 内容 -->
      <view class="text-center mb-24px">
        <text class="text-15px text-[#5A6070] leading-24px">{{ content }}</text>
      </view>

      <!-- 按钮组 -->
      <view class="flex gap-12px">
        <!-- 取消按钮 -->
        <view
          class="flex-1 h-44px flex items-center justify-center rounded-30px bg-[#F5F6F8]"
          @click="handleCancel"
        >
          <text class="text-15px text-[#5A6070] font-500">{{ cancelText || '取消' }}</text>
        </view>

        <!-- 确认按钮 -->
        <view
          class="flex-1 h-44px flex items-center justify-center rounded-30px"
          :style="{ background: confirmColor || 'linear-gradient(135deg, #3AAFDC 0%, #2BC18A 100%)' }"
          @click="handleConfirm"
        >
          <text class="text-15px text-white font-600">{{ confirmText || '确定' }}</text>
        </view>
      </view>
    </view>
  </wd-popup>
</template>

<style scoped>
.confirm-card {
  animation: popup-scale 0.2s ease-out;
}

@keyframes popup-scale {
  from {
    transform: scale(0.9);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
