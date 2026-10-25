<template>
  <div class="shell">
    <header class="topbar">
      <div class="logo">上岸<span class="blue">宝典</span></div>
      <div class="date">{{ today }}</div>
      <div class="streak">连续 <b>{{ streakN }}</b> 天</div>
    </header>
    <router-view />
  </div>

  <nav class="tabbar">
    <div class="inner">
      <router-link to="/" exact-active-class="active">
        <svg viewBox="0 0 24 24"><path d="M4 11 L12 4 L20 11 M6 10 V20 H18 V10"/></svg>
        今日
      </router-link>
      <router-link to="/learn" active-class="active">
        <svg viewBox="0 0 24 24"><path d="M4 5 H11 a2 2 0 0 1 2 2 V20 a2 2 0 0 0 -2 -2 H4 Z M20 5 H13 a2 2 0 0 0 -2 2 V20 a2 2 0 0 1 2 -2 H20 Z"/></svg>
        学习
      </router-link>
      <router-link to="/practice" active-class="active">
        <svg viewBox="0 0 24 24"><path d="M4 20 L5 15 L16 4 a1.5 1.5 0 0 1 3 3 L8 18 Z M4 20 L8 18"/></svg>
        刷题
      </router-link>
      <router-link to="/wrong" active-class="active">
        <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M9 9 L15 15 M15 9 L9 15"/></svg>
        错题
        <span v-if="wrongCount" class="badge">{{ wrongCount > 99 ? '99+' : wrongCount }}</span>
      </router-link>
      <router-link to="/more" active-class="active">
        <svg viewBox="0 0 24 24"><circle cx="5" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="19" cy="12" r="1.6"/></svg>
        更多
      </router-link>
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { streak } from './store.js'
import { BANKS } from './data/index.js'
import { inWrongBook } from './store.js'

const today = computed(() => {
  const d = new Date()
  return d.getMonth() + 1 + '月' + d.getDate() + '日'
})
const streakN = computed(() => streak())
const wrongCount = computed(() => BANKS.filter(q => inWrongBook(q.id)).length)
</script>
