<template>
  <div>
    <div class="card blue">
      <div class="card-title">⭐ 标星收藏({{ list.length }}题)</div>
      <div class="card-sub">答题时点☆收藏好题,随时回来重做</div>
      <div class="btn-row" style="margin-top:0">
        <button class="btn primary" :disabled="!list.length" @click="redo('order')">重做标星题</button>
        <button class="btn" :disabled="!list.length" @click="redo('recite')">背题浏览</button>
      </div>
    </div>

    <div v-if="!list.length" class="empty">还没有标星题。刷题时点题目右上角的 ☆ 就能收藏。</div>

    <div class="card">
      <div v-for="q in list" :key="q.id" class="row">
        <span class="grow">
          <div class="name" style="font-size:13.5px">{{ q.q.length > 70 ? q.q.slice(0, 70) + '…' : q.q }}</div>
          <div class="sub">{{ kpName(q.kp) }}</div>
        </span>
        <button class="star-btn on" @click="toggleStar(q.id)">★</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { BANKS, findKp } from '../data/index.js'
import { isStarred, toggleStar } from '../store.js'

const router = useRouter()
const list = computed(() => BANKS.filter(q => isStarred(q.id)))
function kpName(kid){ const f = findKp(kid); return f ? f.kp.name : kid }
function redo(mode){ router.push({ path: '/practice', query: { scope: 'starred', mode } }) }
</script>
