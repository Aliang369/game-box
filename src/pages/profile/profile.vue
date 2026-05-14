<script lang="ts" setup>
import { useGameStore } from '@/store/game'

definePage({
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '编辑资料',
  },
})

const gameStore = useGameStore()

// 表单数据（仅 UI 交互，后端接入后从接口读取）
const form = ref({
  nickname: gameStore.currentUser?.Nickname || '',
  bio: '',
  email: '',
  gender: '',
  birthday: '',
})

// 头像取 gameStore（本地JSON数据）
const avatarSrc = computed(() => {
  return gameStore.currentUser?.picture || '/static/user/UserNull.svg'
})

const genderOptions = ['男生', '女生', '保密']
const showGenderPicker = ref(false)
const showDatePicker = ref(false)

// 日期选择器相关
const currentDate = ref(new Date(2000, 0, 1).getTime())
const minDate = new Date(1950, 0, 1).getTime()
const maxDate = new Date().getTime()

// 格式化日期显示
const birthdayDisplay = computed(() => {
  if (!form.value.birthday)
    return ''
  return form.value.birthday
})

function leftClick() {
  const pages = getCurrentPages()
  if (pages.length > 1) {
    uni.navigateBack({ delta: 1 })
  }
}

function chooseAvatar() {
  uni.chooseImage({
    count: 1,
    sizeType: ['compressed'],
    sourceType: ['album', 'camera'],
    success: (_res) => {
      // TODO: 接入后端后上传头像
    },
  })
}

function onGenderSelect(event: { item: { name: string }, index: number }) {
  form.value.gender = event.item.name
  showGenderPicker.value = false
}

function openDatePicker() {
  showDatePicker.value = true
}

function onDateConfirm({ value }: { value: number }) {
  const d = new Date(value)
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  form.value.birthday = `${y}年${m}月${day}日`
  currentDate.value = value
  showDatePicker.value = false
}

function onDateCancel() {
  showDatePicker.value = false
}

function handleSave() {
  // TODO: 接入后端后提交到 API
  uni.showToast({ title: '保存成功', icon: 'success' })
  setTimeout(() => {
    uni.navigateBack({ delta: 1 })
  }, 500)
}
</script>

<template>
  <view class="profile-page min-h-100vh bg-[#F7F7FA]">
    <!-- 顶部导航 -->
    <view class="nav-header absolute left-0 top-0 z-1 w-full px-15px pb-12px pt-50px">
      <view class="h-34px flex items-center justify-between">
        <view class="h-34px w-34px flex items-center justify-center" @click="leftClick">
          <image src="/static/gamedetail/back_icon.png" mode="aspectFit" class="h-22px w-22px" />
        </view>
        <view class="text-18px text-[#272E3B] font-600">
          编辑资料
        </view>
        <view class="h-34px w-34px" />
      </view>
    </view>

    <!-- 头像区域 -->
    <view class="avatar-section flex flex-col items-center pb-24px pt-110px">
      <view class="relative" @click="chooseAvatar">
        <view class="h-90px w-90px overflow-hidden rounded-full" style="box-shadow: 0 6px 20px rgba(43, 193, 138, 0.15)">
          <image :src="avatarSrc" mode="aspectFill" class="h-full w-full" />
        </view>
        <!-- 相机图标 -->
        <view class="absolute bottom-0 right-0 h-28px w-28px flex items-center justify-center rounded-full bg-[#2bc18a]" style="box-shadow: 0 2px 8px rgba(43, 193, 138, 0.4)">
          <image src="/static/user/edit.png" mode="aspectFit" class="h-14px w-14px" style="filter: brightness(10)" />
        </view>
      </view>
      <text class="mt-10px text-13px text-[#8F96A3]">点击更换头像</text>
    </view>

    <!-- 表单区域 -->
    <view class="form-card mx-15px rounded-20px bg-white px-20px py-24px" style="box-shadow: 0 2px 12px rgba(53, 64, 90, 0.05)">
      <view class="mb-6px text-16px text-[#272E3B] font-600">
        个人信息
      </view>

      <!-- 昵称 -->
      <view class="form-row mt-18px flex items-center">
        <text class="form-label w-70px flex-shrink-0 text-14px text-[#272E3B] font-500">昵称</text>
        <view class="flex-1">
          <wd-input
            v-model="form.nickname"
            placeholder="请输入昵称"
            no-border
            clearable
            custom-style="padding: 10px 14px; border-radius: 10px; background: #F7F7FA; border: 1px solid rgba(6,2,32,0.05)"
          />
        </view>
      </view>

      <!-- 个人简介 -->
      <view class="form-row mt-14px flex items-center">
        <text class="form-label w-70px flex-shrink-0 text-14px text-[#272E3B] font-500">简介</text>
        <view class="flex-1">
          <wd-input
            v-model="form.bio"
            placeholder="介绍一下自己吧"
            no-border
            :maxlength="50"
            custom-style="padding: 10px 14px; border-radius: 10px; background: #F7F7FA; border: 1px solid rgba(6,2,32,0.05)"
          />
        </view>
      </view>

      <!-- 邮箱 -->
      <view class="form-row mt-14px flex items-center">
        <text class="form-label w-70px flex-shrink-0 text-14px text-[#272E3B] font-500">邮箱</text>
        <view class="flex-1">
          <wd-input
            v-model="form.email"
            placeholder="请输入邮箱地址"
            no-border
            clearable
            custom-style="padding: 10px 14px; border-radius: 10px; background: #F7F7FA; border: 1px solid rgba(6,2,32,0.05)"
          />
        </view>
      </view>

      <!-- 出生日期 -->
      <view class="form-row mt-14px flex items-center" @click="openDatePicker">
        <text class="form-label w-70px flex-shrink-0 text-14px text-[#272E3B] font-500">生日</text>
        <view class="flex flex-1 items-center justify-between rounded-10px bg-[#F7F7FA] px-14px py-10px" style="border: 1px solid rgba(6,2,32,0.05)">
          <text class="text-13px" :class="birthdayDisplay ? 'text-[#272E3B] opacity-70' : 'text-[#C0C4CC]'">
            {{ birthdayDisplay || '请选择出生日期' }}
          </text>
          <text class="text-10px text-[#C0C4CC]">▼</text>
        </view>
      </view>

      <!-- 性别 -->
      <view class="form-row mt-14px flex items-center" @click="showGenderPicker = true">
        <text class="form-label w-70px flex-shrink-0 text-14px text-[#272E3B] font-500">性别</text>
        <view class="flex flex-1 items-center justify-between rounded-10px bg-[#F7F7FA] px-14px py-10px" style="border: 1px solid rgba(6,2,32,0.05)">
          <text class="text-13px" :class="form.gender ? 'text-[#272E3B] opacity-70' : 'text-[#C0C4CC]'">
            {{ form.gender || '请选择性别' }}
          </text>
          <text class="text-10px text-[#C0C4CC]">▼</text>
        </view>
      </view>
    </view>

    <!-- 保存按钮 -->
    <view class="mx-15px mt-30px pb-40px">
      <view
        class="h-50px flex items-center justify-center rounded-30px text-16px text-white font-700"
        style="background: linear-gradient(95deg, #2bc18a, #5ad88c); box-shadow: 0 8px 18px rgba(43, 193, 138, 0.24)"
        @click="handleSave"
      >
        保存修改
      </view>
    </view>

    <!-- 性别选择弹窗 -->
    <wd-action-sheet
      v-model="showGenderPicker"
      :actions="genderOptions.map(g => ({ name: g }))"
      cancel-text="取消"
      close-on-click-action
      @select="onGenderSelect"
    />

    <!-- 日期选择器弹窗 -->
    <wd-popup v-model="showDatePicker" position="bottom">
      <view class="date-picker-header flex items-center justify-between px-16px py-14px">
        <text class="text-14px text-[#8F96A3]" @click="onDateCancel">取消</text>
        <text class="text-15px text-[#272E3B] font-500">选择出生日期</text>
        <text class="text-14px text-[#2bc18a] font-500" @click="onDateConfirm({ value: currentDate })">确定</text>
      </view>
      <wd-datetime-picker-view
        v-model="currentDate"
        type="date"
        :min-date="minDate"
        :max-date="maxDate"
      />
    </wd-popup>
  </view>
</template>

<style scoped lang="scss">
.profile-page {
  position: relative;
  background:
    radial-gradient(circle at 50% 5%, rgba(43, 193, 138, 0.08), transparent 40%),
    linear-gradient(180deg, #e5f9ff 0%, #f7f7fa 30%, #f7f7fa 100%);
}

.nav-header {
  background: transparent;
}

.form-card {
  position: relative;
}

.form-row :deep(.wd-input__inner),
.form-row :deep(.uni-input-wrapper),
.form-row :deep(.uni-input-input),
.form-row :deep(.wd-input__placeholder) {
  background: transparent !important;
}

.form-row :deep(.wd-input__inner) {
  min-height: 20px;
}

.date-picker-header {
  border-bottom: 1px solid #f0f0f0;
}
</style>
