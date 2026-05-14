<script lang="ts" setup>
const props = defineProps<{
  show: boolean
}>()

const emit = defineEmits<{
  select: [emoji: string]
}>()

const categories = [
  { key: 'face', label: '\u{1F600}' },
  { key: 'gesture', label: '\u{1F44B}' },
  { key: 'animal', label: '\u{1F431}' },
  { key: 'food', label: '\u{1F354}' },
  { key: 'activity', label: '\u26BD' },
  { key: 'symbol', label: '\u2764\uFE0F' },
]

const currentCategory = ref('face')

const emojiData: Record<string, string[]> = {
  face: [
    '\u{1F600}', '\u{1F601}', '\u{1F602}', '\u{1F923}', '\u{1F603}', '\u{1F604}', '\u{1F605}', '\u{1F606}',
    '\u{1F609}', '\u{1F60A}', '\u{1F60B}', '\u{1F60E}', '\u{1F60D}', '\u{1F970}', '\u{1F618}', '\u{1F617}',
    '\u{1F619}', '\u{1F61A}', '\u{1F642}', '\u{1F917}', '\u{1F929}', '\u{1F914}', '\u{1F928}', '\u{1F610}',
    '\u{1F611}', '\u{1F636}', '\u{1F60F}', '\u{1F612}', '\u{1F644}', '\u{1F62C}', '\u{1F62E}', '\u{1F62F}',
    '\u{1F632}', '\u{1F633}', '\u{1F97A}', '\u{1F626}', '\u{1F627}', '\u{1F628}', '\u{1F630}', '\u{1F625}',
    '\u{1F622}', '\u{1F62D}', '\u{1F631}', '\u{1F616}', '\u{1F623}', '\u{1F61E}', '\u{1F613}', '\u{1F629}',
    '\u{1F624}', '\u{1F621}', '\u{1F92C}', '\u{1F608}', '\u{1F47F}', '\u{1F480}', '\u{1F921}', '\u{1F47B}',
  ],
  gesture: [
    '\u{1F44B}', '\u{1F91A}', '\u{1F590}\uFE0F', '\u270B', '\u{1F596}', '\u{1F44C}', '\u{1F90C}', '\u{1F90F}',
    '\u270C\uFE0F', '\u{1F91E}', '\u{1F91F}', '\u{1F918}', '\u{1F919}', '\u{1F448}', '\u{1F449}', '\u{1F446}',
    '\u{1F447}', '\u261D\uFE0F', '\u{1F44D}', '\u{1F44E}', '\u270A', '\u{1F44A}', '\u{1F91B}', '\u{1F91C}',
    '\u{1F44F}', '\u{1F64C}', '\u{1F450}', '\u{1F932}', '\u{1F91D}', '\u{1F64F}', '\u{1F4AA}', '\u{1F9BE}',
  ],
  animal: [
    '\u{1F431}', '\u{1F436}', '\u{1F42D}', '\u{1F439}', '\u{1F430}', '\u{1F98A}', '\u{1F43B}', '\u{1F43C}',
    '\u{1F428}', '\u{1F42F}', '\u{1F981}', '\u{1F42E}', '\u{1F437}', '\u{1F438}', '\u{1F435}', '\u{1F414}',
    '\u{1F427}', '\u{1F426}', '\u{1F424}', '\u{1F984}', '\u{1F41D}', '\u{1F41B}', '\u{1F98B}', '\u{1F40C}',
    '\u{1F419}', '\u{1F991}', '\u{1F990}', '\u{1F420}', '\u{1F41F}', '\u{1F42C}', '\u{1F433}', '\u{1F988}',
  ],
  food: [
    '\u{1F354}', '\u{1F35F}', '\u{1F355}', '\u{1F32D}', '\u{1F96A}', '\u{1F32E}', '\u{1F32F}', '\u{1F959}',
    '\u{1F373}', '\u{1F958}', '\u{1F372}', '\u{1F957}', '\u{1F37F}', '\u{1F9C8}', '\u{1F371}', '\u{1F358}',
    '\u{1F359}', '\u{1F35A}', '\u{1F35B}', '\u{1F35C}', '\u{1F35D}', '\u{1F363}', '\u{1F364}', '\u{1F369}',
    '\u{1F36A}', '\u{1F382}', '\u{1F370}', '\u{1F9C1}', '\u{1F36B}', '\u{1F36C}', '\u{1F36D}', '\u{1F36E}',
  ],
  activity: [
    '\u26BD', '\u{1F3C0}', '\u{1F3C8}', '\u26BE', '\u{1F94E}', '\u{1F3BE}', '\u{1F3D0}', '\u{1F3C9}',
    '\u{1F94F}', '\u{1F3B1}', '\u{1F3D3}', '\u{1F3F8}', '\u{1F94A}', '\u{1F3AE}', '\u{1F579}\uFE0F', '\u{1F3B2}',
    '\u{1F9E9}', '\u{1F3AF}', '\u{1F3B3}', '\u{1F3AA}', '\u{1F3A8}', '\u{1F3AC}', '\u{1F3A4}', '\u{1F3A7}',
    '\u{1F3BC}', '\u{1F3B9}', '\u{1F941}', '\u{1F3B7}', '\u{1F3BA}', '\u{1F3B8}', '\u{1FA95}', '\u{1F3BB}',
  ],
  symbol: [
    '\u2764\uFE0F', '\u{1F9E1}', '\u{1F49B}', '\u{1F49A}', '\u{1F499}', '\u{1F49C}', '\u{1F5A4}', '\u{1F90D}',
    '\u{1F494}', '\u2763\uFE0F', '\u{1F495}', '\u{1F49E}', '\u{1F493}', '\u{1F497}', '\u{1F496}', '\u{1F498}',
    '\u{1F49D}', '\u2B50', '\u{1F31F}', '\u2728', '\u26A1', '\u{1F525}', '\u{1F4AF}', '\u{1F4A2}',
    '\u{1F4A5}', '\u{1F4AB}', '\u{1F4A6}', '\u{1F389}', '\u{1F38A}', '\u2705', '\u274C', '\u2B55',
  ],
}

const currentEmojis = computed(() => emojiData[currentCategory.value] || [])

function selectEmoji(emoji: string) {
  emit('select', emoji)
}
</script>

<template>
  <view v-if="props.show" class="emoji-picker">
    <view class="flex items-center border-b border-[#F0F0F0] px-12px py-8px">
      <view
        v-for="cat in categories"
        :key="cat.key"
        class="flex flex-1 items-center justify-center rounded-8px py-6px"
        :class="currentCategory === cat.key ? 'bg-[#E5F9FF]' : ''"
        @click="currentCategory = cat.key"
      >
        <text class="text-20px">{{ cat.label }}</text>
      </view>
    </view>
    <scroll-view scroll-y class="emoji-grid px-8px py-8px" style="height: 200px">
      <view class="flex flex-wrap">
        <view
          v-for="emoji in currentEmojis"
          :key="emoji"
          class="emoji-item flex items-center justify-center"
          @click="selectEmoji(emoji)"
        >
          <text class="text-24px">{{ emoji }}</text>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<style scoped>
.emoji-picker {
  background: white;
  border-top: 1px solid #F0F0F0;
}
.emoji-item {
  width: 12.5%;
  height: 40px;
  border-radius: 8px;
  transition: background-color 0.15s;
}
.emoji-item:active {
  background-color: #F0F0F0;
}
</style>
