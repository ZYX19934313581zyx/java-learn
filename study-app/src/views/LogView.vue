<template>
  <div>
    <div class="card">
      <div class="card-title">🗓️ 最近18周</div>
      <div class="hm">
        <div v-for="(col, ci) in grid" :key="ci" class="hmcol">
          <div v-for="cell in col" :key="cell.d" class="cell" :style="{ background: cell.color }" :title="cell.d + (cell.min ? ' ' + cell.min + '分钟' : ' 未记录')"></div>
        </div>
      </div>
      <div class="muted mt8">连续 <b style="color:var(--amber);font-size:15px">{{ streak() }}</b> 天 · 累计 {{ store.logs.length }} 次 · 共 {{ totalMin() }} 分钟</div>
    </div>

    <div class="card">
      <div class="card-title">✍️ 记一笔</div>
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        <input type="number" v-model="min" min="1" max="600" placeholder="分钟" style="width:86px">
        <input type="text" v-model="note" placeholder="学了什么" style="flex:1;min-width:180px" @keyup.enter="add">
        <button class="btn" @click="add">记录</button>
      </div>
    </div>

    <div class="card" v-if="logs.length">
      <div class="card-title">记录</div>
      <div v-for="l in logs" :key="l.d + l.note" class="row">
        <span class="grow"><b class="mono" style="font-size:13px">{{ l.d }}</b> · {{ l.min }}分钟 — {{ l.note }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { addLog, isoOf, streak, store, totalMin } from '../store.js'

const min = ref('')
const note = ref('')
const logs = computed(() => [...store.logs].sort((a, b) => b.d.localeCompare(a.d)).slice(0, 80))

const grid = computed(() => {
  const map = {}
  store.logs.forEach(l => { map[l.d] = (map[l.d] || 0) + l.min })
  const now = new Date()
  const cols = []
  for (let w = 17; w >= 0; w--) {
    const col = []
    for (let d = 6; d >= 0; d--) {
      const dt = new Date(now)
      dt.setDate(now.getDate() - (w * 7 + d))
      const iso = isoOf(dt)
      const m = map[iso] || 0
      col.push({ d: iso, min: m, color: colorOf(m) })
    }
    cols.push(col)
  }
  return cols
})
function colorOf(m){
  return m <= 0 ? '#ECEAE0' : m < 30 ? '#9BE3AE' : m < 60 ? '#4CBF6B' : m < 120 ? '#1E9E52' : '#0A8A4A'
}
function add(){
  const m = parseInt(min.value, 10)
  if (!m || m < 1 || !note.value.trim()) return
  addLog(m, note.value.trim())
  min.value = ''; note.value = ''
}
</script>
