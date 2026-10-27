<template>
  <div>
    <!-- 范围/模式选择 -->
    <div v-if="!queue" class="card">
      <div class="card-title">🎯 开始刷题</div>
      <div class="card-sub">答错进错题本,连对2次自动移出;选项每次自动乱序,防背位置</div>
      <div style="font-weight:800;font-size:13.5px;margin:8px 0 4px">题库范围</div>
      <select v-model="selScope" style="width:100%">
        <option value="all">全部题库({{ BANKS.length }}题)</option>
        <option v-for="p in PLAN.phases" :key="p.id" :value="p.id">{{ p.name }}({{ bankForPhase(p.id).length }}题)</option>
        <option value="wrong">错题本({{ wrongN }}题)</option>
        <option value="starred">标星收藏({{ starN }}题)</option>
      </select>
      <div style="font-weight:800;font-size:13.5px;margin:12px 0 4px">模式</div>
      <div class="radio-line">
        <label><input type="radio" value="order" v-model="selMode"> 顺序练习(记住进度)</label>
        <label><input type="radio" value="rand" v-model="selMode"> 随机练习</label>
        <label><input type="radio" value="recite" v-model="selMode"> 背题模式</label>
      </div>
      <div class="muted mt8" v-if="resumeHint">{{ resumeHint }}</div>
      <div class="btn-row">
        <button class="btn primary" @click="start">开始</button>
        <button v-if="resumeAt > 0" class="btn" @click="restart">从头开始</button>
        <span class="muted" style="align-self:center">已清除 {{ clearedIn(selScope) }}/{{ scopeCount(selScope) }}</span>
      </div>
    </div>

    <!-- 答题中 -->
    <div v-else-if="q" class="card">
      <div class="q-meta">
        <span class="qno">{{ idx + 1 }} / {{ queue.length }}</span>
        <span class="tag read">{{ kpName(q.kp) }}</span>
        <span v-if="isCleared(q.id)" class="tag do">✓已清除</span>
        <span v-else-if="qState(q.id)" class="tag know">做过:对{{ qState(q.id).s }} 错{{ qState(q.id).w }}</span>
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
        <button v-if="mode === 'recite' && idx > 0" class="btn" @click="prev">上一题</button>
        <button v-if="mode === 'recite' && idx < queue.length - 1" class="btn primary" @click="next">下一题</button>
        <button class="btn" @click="quit">结束</button>
      </div>
    </div>

    <!-- 完成 -->
    <div v-else class="card">
      <div class="card-title">🏁 本轮完成</div>
      <p>答错 <b class="mono">{{ errs }}</b> 题,已进错题本;连对2次自动移出。</p>
      <p class="muted">顺序练习下次会接着这次的位置;想重刷整轮选「随机练习」或点下面的从头开始。</p>
      <div class="btn-row">
        <button class="btn primary" @click="start">继续刷</button>
        <button class="btn" @click="queue = null">换个范围</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { PLAN, BANKS, bankForPhase, bankForKp, findKp } from '../data/index.js'
import { store, record, toggleStar, isStarred, inWrongBook, isCleared, qState } from '../store.js'

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
const modeName = computed(() => ({ order: '顺序练习', rand: '随机练习', recite: '背题模式' })[mode.value])
const q = computed(() => queue.value ? queue.value[idx.value] : null)
const showVerdict = computed(() => mode.value !== 'recite' && checked.value)

const mode = computed(() => route.query.mode || 'order')
const scope = computed(() => route.query.scope || null)

const resumeAt = computed(() => {
  const s = selScope.value
  if (!isStatic(s) || selMode.value === 'rand' || !store.practicePos) return 0
  const p = store.practicePos[s] || 0
  return p > 0 && p < scopeCount(s) ? p : 0
})
const resumeHint = computed(() => {
  if (resumeAt.value > 0) return '📌 上次顺序做到第 ' + (resumeAt.value + 1) + ' 题,开始后接着刷'
  if (selMode.value === 'order' && isStatic(selScope.value) && scopeCount(selScope.value) > 0) return '顺序练习会自动记住进度,下次接着做'
  return ''
})

function isStatic(s){ return s === 'all' || (typeof s === 'string' && s.startsWith('p')) }
function scopeCount(s){
  if (s === 'all') return BANKS.length
  if (s === 'wrong') return wrongN.value
  if (s === 'starred') return starN.value
  return bankForPhase(s).length
}
function clearedIn(s){
  if (!isStatic(s)) return 0
  const list = s === 'all' ? BANKS : (s.includes('-k') ? bankForKp(s) : bankForPhase(s))
  return list.filter(x => isCleared(x.id)).length
}
/* 选项乱序:正确答案均匀散开;判断题(正确/错误)不乱 */
function shuffled(qq){
  if (qq.t === 'judge' || qq.opts.length < 3) return qq
  const idxs = qq.opts.map((_, i) => i)
  for (let i = idxs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[idxs[i], idxs[j]] = [idxs[j], idxs[i]]
  }
  return { ...qq, opts: idxs.map(i => qq.opts[i]), a: idxs.indexOf(qq.a) }
}
function build(s, m){
  let list
  if (s === 'all') list = [...BANKS]
  else if (s === 'wrong') list = BANKS.filter(x => inWrongBook(x.id))
  else if (s === 'starred') list = BANKS.filter(x => isStarred(x.id))
  else if (s.includes('-k')) list = bankForKp(s)
  else list = bankForPhase(s)
  if (!list.length) return false
  list = list.map(shuffled)
  if (m === 'rand') list = [...list].sort(() => Math.random() - 0.5)
  else list = [...list].sort((a, b) => a.id < b.id ? -1 : 1)
  queue.value = list
  errs.value = 0
  resetQ()
  /* 顺序/背题模式:从上次位置继续 */
  let start = 0
  if (m !== 'rand' && isStatic(s) && store.practicePos && typeof store.practicePos[s] === 'number') {
    const p = store.practicePos[s]
    if (p > 0 && p < list.length) start = p
  }
  idx.value = start
  return true
}
function savePos(){
  const s = scope.value
  if (s && isStatic(s) && queue.value) {
    if (!store.practicePos) store.practicePos = {}
    store.practicePos[s] = idx.value
  }
}
function start(){
  const s = selScope.value, m = selMode.value
  if (s === 'wrong' && wrongN.value === 0) return
  if (s === 'starred' && starN.value === 0) return
  router.replace({ query: { scope: s, mode: m } })
  build(s, m)
}
function restart(){
  const s = selScope.value, m = selMode.value
  if (store.practicePos) store.practicePos[s] = 0
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
function skip(){ idx.value++; savePos(); resetQ() }
function next(){ idx.value++; savePos(); resetQ() }
function prev(){ if (idx.value > 0) { idx.value--; savePos() } }
function resetQ(){ picked.value = null; checked.value = false; correct.value = false }
function quit(){ savePos(); queue.value = null; router.replace({ query: {} }) }
function optCls(i){
  if (mode.value === 'recite') return i === q.value.a ? 'right' : 'dim'
  if (!checked.value) return picked.value === i ? 'selected' : ''
  if (i === q.value.a) return 'right'
  if (picked.value === i) return 'wrongpick'
  return 'dim'
}
function kpName(kid){ const f = findKp(kid); return f ? f.kp.name : kid }
</script>
