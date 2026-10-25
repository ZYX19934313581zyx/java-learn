<template>
  <div>
    <div v-for="m in menus" :key="m.to" class="card" style="padding:14px 18px">
      <router-link :to="m.to" style="text-decoration:none;color:var(--ink);display:flex;align-items:center;gap:12px">
        <span style="font-size:22px">{{ m.icon }}</span>
        <span style="flex:1">
          <span class="name">{{ m.title }}</span>
          <div class="muted">{{ m.desc }}</div>
        </span>
        <span v-if="m.count !== null" class="tag hand">{{ m.count }}</span>
        <span style="color:var(--ink-2)">›</span>
      </router-link>
    </div>

    <div class="card">
      <div class="card-title">🎯 一句话战略</div>
      <p class="muted">Java后端为身份 + Agent为差异化;不考研、不冲大厂;主投Java后端实习,副投AI应用实习;只认考核关卡,不追打勾数量。</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { BANKS } from '../data/index.js'
import { isStarred, inWrongBook, totalMin } from '../store.js'

const menus = computed(() => [
  { to: '/starred', icon: '⭐', title: '标星收藏', desc: '收藏的好题,随时重做', count: BANKS.filter(q => isStarred(q.id)).length },
  { to: '/wrong', icon: '📕', title: '错题本', desc: '连对2次自动移出', count: BANKS.filter(q => inWrongBook(q.id)).length },
  { to: '/log', icon: '🗓️', title: '学习日志', desc: '热力图与连续天数,累计' + totalMin() + '分钟', count: null },
  { to: '/settings', icon: '⚙️', title: '设置与备份', desc: '导出/导入进度,手机端说明', count: null }
])
</script>
