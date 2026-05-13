<script lang="ts" setup>
const show = ref(false)
const formData = ref({
  gameName: '',
  reason: '',
})

function open() {
  show.value = true
}

function close() {
  show.value = false
  formData.value = { gameName: '', reason: '' }
}

function handleSubmit() {
  if (!formData.value.gameName) {
    uni.showToast({ title: '请输入游戏名称', icon: 'none' })
    return
  }
  if (!formData.value.reason) {
    uni.showToast({ title: '请输入申请理由', icon: 'none' })
    return
  }
  uni.showToast({ title: '提交成功', icon: 'success' })
  close()
}

defineExpose({ open, close })
</script>

<template>
  <wd-popup v-model="show" position="center" :z-index="1100" custom-style="border-radius: 16px; width: 88%">
    <view class="popup-card bg-white rounded-16px">
      <!-- 标题 -->
      <view class="mb-24px">
        <view class="text-20px font-700 text-center mb-8px leading-28px">申请接入新游戏</view>
        <view class="text-14px text-[#666] text-center leading-20px">我们会根据您的意见更新游戏</view>
      </view>

      <!-- 游戏名称 -->
      <view class="popup-field">
        <wd-input
          v-model="formData.gameName"
          placeholder="请输入游戏名称"
          no-border
          custom-style="padding: 14px; border-radius: 15px; background: #f9f9f9"
        />
      </view>

      <!-- 申请理由 -->
      <view class="popup-field popup-field--textarea">
        <wd-textarea
          v-model="formData.reason"
          placeholder="请输入申请理由"
          :maxlength="200"
          custom-style="padding: 14px; min-height: 112px; border-radius: 15px; background: #f9f9f9"
        />
      </view>

      <!-- 提交按钮 -->
      <view class="mt-20px">
        <view
          class="h-46px w-full flex justify-center items-center text-white rounded-30px text-16px font-600"
          style="background: linear-gradient(95deg, #2bc18a, #5ad88c)"
          @click="handleSubmit"
        >
          提交
        </view>
      </view>
    </view>
  </wd-popup>
</template>

<style scoped lang="scss">
.popup-card {
  padding: 22px 20px 24px;
}

.popup-field {
  margin: 16px 0;
}

.popup-field--textarea :deep(.wd-textarea__value),
.popup-field--textarea :deep(.wd-textarea__inner),
.popup-field--textarea :deep(.uni-textarea-wrapper),
.popup-field--textarea :deep(.uni-textarea-textarea),
.popup-field--textarea :deep(.uni-textarea-placeholder) {
  background: transparent !important;
}
</style>
