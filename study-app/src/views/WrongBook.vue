<template>
  <div>
    <div class="card blue">
      <div class="card-title">📕 错题本({{ list.length }}题)</div>
      <div class="card-sub">答错自动进本;在练习里<b>连续答对2次</b>自动移出</div>
      <div class="btn-row" style="margin-top:0">
        <button class="btn primary" :disabled="!list.length" @click="redo('order')">重做全部错题</button>
        <button class="btn" :disabled="!list.length" @click="redo('rand')">随机重做</button>
        <button class="btn" :disabled="!list.length" @click="redo('recite')">背题浏览</button>
      </div>
    </div>

    <div v-if="!list.length" class="empty">错题本是空的——先去刷题,答错的会自动出现在这里。</div>

    <div v-for="g in groups" :key="g.pid" class="card">
      <div class="card-title">{{ g.name }} <span class="tag know">{{ g.items.length }}题</span></div>
      <div v-for="q in g.items" :key="q.id" class="row">
        <span class="grow">
          <div class="name" style="font-size:13.5px">{{ q.q.length > 60 ? q.q.slice(0, 60) + '…' : q.q }}</div>
          <div class="sub">错{{ wrongTimes(q.id) }}次 · {{ kpName(q.kp) }}</div>
        </span>
        <span v-if="isStarred(q.id)" class="tag star">★</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { BANKS, findKp, PLAN } from '../data/index.js'
import { inWrongBook, isStarred, store } from '../store.js'

const router = useRouter()
const list = computed(() => BANKS.filter(q => inWrongBook(q.id)))
const groups = computed(() => PLAN.phases.map(p => ({
  pid: p.id,
  name: p.name,
  items: list.value.filter(q => q.pid === p.id)
})).filter(g => g.items.length))
function wrongTimes(id){ const a = store.answers[id]; return a ? a.w : 0 }
function kpName(kid){ const f = findKp(kid); return f ? f.kp.name : kid }
function redo(mode){ router.push({ path: '/practice', query: { scope: 'wrong', mode } }) }
</script>
