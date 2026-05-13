<script lang="ts" setup>
const show = ref(false)
const formData = ref({
  contact: '',
  content: '',
})

function open() {
  show.value = true
}

function close() {
  show.value = false
  formData.value = { contact: '', content: '' }
}

function handleSubmit() {
  const phoneReg = /^1[3-9]\d{9}$/
  if (!formData.value.contact) {
    uni.showToast({ title: '请输入联系方式', icon: 'none' })
    return
  }
  if (!phoneReg.test(formData.value.contact)) {
    uni.showToast({ title: '请输入正确的手机号', icon: 'none' })
    return
  }
  if (!formData.value.content) {
    uni.showToast({ title: '请输入内容描述', icon: 'none' })
    return
  }
  uni.showToast({ title: '反馈提交成功', icon: 'success' })
  close()
}

defineExpose({ open, close })
</script>

<template>
  <wd-popup v-model="show" position="center" :z-index="1100" custom-style="border-radius: 16px; width: 88%">
    <view class="popup-card bg-white rounded-16px">
      <!-- 标题 -->
      <view class="mb-24px">
        <view class="text-20px font-700 text-center mb-8px leading-28px">反馈&建议内容描述</view>
      </view>

      <!-- 联系方式 -->
      <view class="popup-field">
        <wd-input
          v-model="formData.contact"
          placeholder="您的联系方式（手机号）"
          no-border
          custom-style="padding: 14px; border-radius: 15px; background: #f9f9f9"
        />
      </view>

      <!-- 内容描述 -->
      <view class="popup-field popup-field--textarea">
        <wd-textarea
          v-model="formData.content"
          placeholder="请描述您的问题或者建议，感谢您的支持~（必填）"
          :maxlength="150"
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
