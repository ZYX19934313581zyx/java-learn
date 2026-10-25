<template>
  <div>
    <!-- 范围/模式选择 -->
    <div v-if="!queue" class="card">
      <div class="card-title">🎯 开始刷题</div>
      <div class="card-sub">驾考宝典式:答错进错题本,连续答对2次自动移出;标星随时重做</div>
      <div style="font-weight:800;font-size:13.5px;margin:8px 0 4px">题库范围</div>
      <select v-model="selScope" style="width:100%">
        <option value="all">全部题库({{ BANKS.length }}题)</option>
        <option v-for="p in PLAN.phases" :key="p.id" :value="p.id">{{ p.name }}({{ bankForPhase(p.id).length }}题)</option>
        <option value="wrong">错题本({{ wrongN }}题)</option>
        <option value="starred">标星收藏({{ starN }}题)</option>
      </select>
      <div style="font-weight:800;font-size:13.5px;margin:12px 0 4px">模式</div>
      <div class="radio-line">
        <label><input type="radio" value="order" v-model="selMode"> 顺序练习</label>
        <label><input type="radio" value="rand" v-model="selMode"> 随机练习</label>
        <label><input type="radio" value="recite" v-model="selMode"> 背题模式</label>
      </div>
      <div class="btn-row">
        <button class="btn primary" @click="start">开始</button>
        <span class="muted" style="align-self:center" v-if="selScope==='wrong' && wrongN===0">错题本是空的,先去练几题</span>
        <span class="muted" style="align-self:center" v-else-if="selScope==='starred' && starN===0">还没有标星,答题时点☆收藏</span>
      </div>
    </div>

    <!-- 答题中 -->
    <div v-else-if="q" class="card">
      <div class="q-meta">
        <span class="qno">{{ idx + 1 }} / {{ queue.length }}</span>
        <span class="tag read">{{ kpName(q.kp) }}</span>
        <button class="star-btn" :class="{ on: isStarred(q.id) }" @click="toggleStar(q.id)">{{ isStarred(q.id) ? '★' : '☆' }}</button>
        <span class="muted" style="margin-left:auto">{{ modeName }}</span>
      </div>

      <pre class="code" v-if="q.code">{{ q.code }}</pre>
      <div style="font-weight:700;white-space:pre-wrap">{{ q.q }}</div>

      <div class="opts">
        <div v-for="(o, i) in q.opts" :key="i" class="opt" :class="optCls(i)" @click="pick(i)">
          <span class="key">{{ 'ABCD'[i] }}</span><span>{{ o }}</span>
        </div>
      </div>

      <div v-if="showVerdict" class="verdict">
        <div class="stamp" :class="correct ? 'pass' : 'fail'">{{ correct ? '对' : '错' }}</div>
        <div class="exp"><b>解析</b> · {{ q.exp }}</div>
      </div>
      <div v-else-if="mode === 'recite'" class="recite-ans">
        <b>答案:{{ 'ABCD'[q.a] }}. {{ q.opts[q.a] }}</b><br>{{ q.exp }}
      </div>

      <div class="btn-row">
        <button v-if="mode !== 'recite' && !checked" class="btn" @click="skip">跳过</button>
        <button v-if="mode !== 'recite' && checked" class="btn primary" @click="next">下一题</button>
        <button v-if="mode === 'recite' && idx > 0" class="btn" @click="idx--">上一题</button>
        <button v-if="mode === 'recite' && idx < queue.length - 1" class="btn primary" @click="idx++">下一题</button>
        <button class="btn" @click="quit">结束</button>
      </div>
    </div>

    <!-- 完成 -->
    <div v-else class="card">
      <div class="card-title">🏁 本轮完成</div>
      <p>答错 <b class="mono">{{ errs }}</b> 题,已进错题本;连对2次自动移出。</p>
      <div class="btn-row">
        <button class="btn primary" @click="start">再来一轮</button>
        <button class="btn" @click="queue = null">换个范围</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { PLAN, BANKS, bankForPhase, bankForKp, findKp } from '../data/index.js'
import { store, record, toggleStar, isStarred, inWrongBook } from '../store.js'

const route = useRoute()
const router = useRouter()
const selScope = ref('all')
const selMode = ref('order')
const queue = ref(null)
const idx = ref(0)
const picked = ref(null)
const checked = ref(false)
const correct = ref(false)
const errs = ref(0)

const wrongN = computed(() => BANKS.filter(q => inWrongBook(q.id)).length)
const starN = computed(() => store.starred.length)
const modeName = computed(() => ({ order: '顺序练习', rand: '随机练习', recite: '背题模式' })[route.query.mode || 'order'])
const q = computed(() => queue.value ? queue.value[idx.value] : null)
const showVerdict = computed(() => mode.value !== 'recite' && checked.value)

const mode = computed(() => route.query.mode || 'order')
const scope = computed(() => route.query.scope || null)

function scopeCount(s){
  if (s === 'all') return BANKS.length
  if (s === 'wrong') return wrongN.value
  if (s === 'starred') return starN.value
  return bankForPhase(s).length
}
function build(s, m){
  let list
  if (s === 'all') list = [...BANKS]
  else if (s === 'wrong') list = BANKS.filter(x => inWrongBook(x.id))
  else if (s === 'starred') list = BANKS.filter(x => isStarred(x.id))
  else if (s.startsWith('p') && s.includes('-k')) list = bankForKp(s)
  else list = bankForPhase(s)
  if (!list.length) return false
  if (m === 'rand') list = [...list].sort(() => Math.random() - 0.5)
  else list = [...list].sort((a, b) => a.id < b.id ? -1 : 1)
  queue.value = list
  idx.value = 0
  picked.value = null
  checked.value = false
  correct.value = false
  errs.value = 0
  return true
}
function start(){
  const s = selScope.value, m = selMode.value
  if (s === 'wrong' && wrongN.value === 0) return
  if (s === 'starred' && starN.value === 0) return
  router.replace({ query: { scope: s, mode: m } })
  build(s, m)
}
watch(() => route.query, (nq) => {
  if (nq.scope && route.path === '/practice') build(nq.scope, nq.mode || 'order')
})
function pick(i){
  if (mode.value === 'recite' || checked.value) return
  picked.value = i
  checked.value = true
  correct.value = i === q.value.a
  record(q.value.id, correct.value)
  if (!correct.value) errs.value++
}
function skip(){ idx.value++ ; resetQ() }
function next(){ idx.value++; resetQ() }
function resetQ(){ picked.value = null; checked.value = false; correct.value = false }
function quit(){ queue.value = null; router.replace({ query: {} }) }
function optCls(i){
  if (mode.value === 'recite') return i === q.value.a ? 'right' : 'dim'
  if (!checked.value) return picked.value === i ? 'selected' : ''
  if (i === q.value.a) return 'right'
  if (picked.value === i) return 'wrongpick'
  return 'dim'
}
function kpName(kid){ const f = findKp(kid); return f ? f.kp.name : kid }
</script>
