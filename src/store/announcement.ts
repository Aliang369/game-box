import { defineStore } from 'pinia'

export interface Announcement {
  id: string
  title: string
  tag: '公告' | '活动' | '维护' | '更新'
  sectionId?: string // 为空表示全局公告，有值表示板块公告
  time: string
}

export const useAnnouncementStore = defineStore('announcement', () => {
  const announcements = ref<Announcement[]>([
    // 全局公告
    {
      id: 'g1',
      title: '社区规范更新，请所有用户查阅',
      tag: '公告',
      time: '2小时前',
    },
    {
      id: 'g2',
      title: '五月签到活动开启，连续7天领限定头像框',
      tag: '活动',
      time: '今天',
    },
    {
      id: 'g3',
      title: 'v2.3版本更新预告，新增好友系统',
      tag: '更新',
      time: '昨天',
    },
    // 板块公告
    {
      id: 's1',
      title: '本版发帖请遵守版规，禁止水帖',
      tag: '公告',
      sectionId: '1',
      time: '3天前',
    },
    {
      id: 's2',
      title: '攻略征集活动，优质攻略奖励100钻石',
      tag: '活动',
      sectionId: '2',
      time: '今天',
    },
    {
      id: 's3',
      title: '组队频道使用规范，请注明游戏和区服',
      tag: '公告',
      sectionId: '3',
      time: '1周前',
    },
    {
      id: 's4',
      title: '服务器维护通知：5月15日凌晨2-6点',
      tag: '维护',
      sectionId: '4',
      time: '5小时前',
    },
    {
      id: 's5',
      title: '创意工坊投稿规范，禁止搬运他人作品',
      tag: '公告',
      sectionId: '5',
      time: '2天前',
    },
    {
      id: 's6',
      title: '交易安全提醒，谨防诈骗',
      tag: '公告',
      sectionId: '6',
      time: '1周前',
    },
  ])

  // 获取全局公告
  const globalAnnouncements = computed(() => {
    return announcements.value.filter(a => !a.sectionId)
  })

  // 获取指定板块公告
  function getSectionAnnouncements(sectionId: string): Announcement[] {
    return announcements.value.filter(a => a.sectionId === sectionId)
  }

  return {
    announcements,
    globalAnnouncements,
    getSectionAnnouncements,
  }
})
