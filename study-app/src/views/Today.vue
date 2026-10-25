<template>
  <div>
    <div class="card blue">
      <div class="card-title">⏳ 关键节点</div>
      <div class="chips">
        <span v-for="m in PLAN.milestones" :key="m.d" class="chip" :class="{hot: dd(m.d) <= 30 && dd(m.d) >= 0, past: dd(m.d) < 0}" :title="m.t">
          {{ m.d.slice(5) }} {{ short(m.t) }} · 剩<span class="num">{{ label(m.d) }}</span>
        </span>
      </div>
    </div>

    <div class="card" v-if="cur">
      <div class="card-title">📌 当前阶段:{{ cur.name }} <span class="tag" :class="tagCls(cur)">{{ tagTxt(cur) }}</span></div>
      <div class="card-sub">{{ cur.span }} · {{ cur.goal }}</div>
      <div class="pbar"><div class="fill" :style="{ width: prog + '%' }"></div></div>
      <div class="muted mt8">题库清除进度 {{ prog }}%(连对2次=清除) · 考核关卡 {{ gatesDone }}/{{ cur.gates.length }}</div>
      <div class="btn-row">
        <router-link v-if="nextKp" class="btn primary" :to="'/kp/' + nextKp.id">学:{{ nextKp.name }}</router-link>
        <router-link class="btn" to="/practice">去刷题</router-link>
        <router-link class="btn" to="/learn">看全部阶段</router-link>
      </div>
    </div>

    <div class="card">
      <div class="card-title">✍️ 记一笔今天的学习</div>
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        <input type="number" v-model="min" min="1" max="600" placeholder="分钟" style="width:86px">
        <input type="text" v-model="note" placeholder="学了什么,如:手写HashMap简化版" style="flex:1;min-width:200px" @keyup.enter="add">
        <button class="btn" @click="add">记录</button>
      </div>
      <div class="muted mt8" v-if="recent.length">
        最近:{{ recent.map(l => l.d.slice(5) + ' ' + l.min + '分钟').join(' · ') }}
      </div>
    </div>

    <details class="card">
      <summary>三条铁律(点开看)</summary>
      <ol style="margin-top:8px">
        <li>AI 给的每段代码,<b>先读懂再粘贴</b>——读不懂就追问,直到能给别人讲明白。</li>
        <li><b>不让 AI 一次性生成整个文件</b>——先讲思路,自己写骨架,AI 补细节。</li>
        <li>每周日做一次「<b>无AI复习</b>」——关掉AI讲上周代码,讲不清=没学会。</li>
      </ol>
    </details>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { PLAN, bankForKp, bankForPhase, phaseProgress } from '../data/index.js'
import { isCleared, gateOn, addLog, daysTo, store } from '../store.js'

const min = ref('')
const note = ref('')
const recent = computed(() => [...store.logs].sort((a, b) => b.d.localeCompare(a.d)).slice(0, 4))

function countGates(ph){ return ph.gates.filter((g, i) => gateOn(ph.id + '-g' + i)).length }
function phaseGatesDone(ph){ return ph.gates.every((g, i) => gateOn(ph.id + '-g' + i)) }
function tagCls(ph){ return phaseGatesDone(ph) ? 'do' : 'hand' }
function tagTxt(ph){ return phaseGatesDone(ph) ? '已过关' : '进行中' }

const cur = computed(() => {
  if (store.override) {
    const p = PLAN.phases.find(x => x.id === store.override)
    if (p) return p
  }
  return PLAN.phases.find(ph => !phaseGatesDone(ph)) || PLAN.phases[PLAN.phases.length - 1]
})
const prog = computed(() => cur.value ? Math.round(phaseProgress(cur.value).done * 100 / Math.max(1, phaseProgress(cur.value).total)) : 0)
const gatesDoneN = computed(() => cur.value ? countGates(cur.value) : 0)
const nextKp = computed(() => {
  if (!cur.value) return null
  return cur.value.kps.find(k => {
    const b = bankForKp(k.id)
    return b.length === 0 || b.some(q => !isCleared(q.id))
  }) || cur.value.kps[0]
})
const gatesDone = gatesDoneN

function dd(iso){ return daysTo(iso) }
function label(iso){ const d = dd(iso); return d >= 0 ? d + '天' : '已过' }
function short(t){ return t.split(':')[0] }
function add(){
  const m = parseInt(min.value, 10)
  if (!m || m < 1 || !note.value.trim()) return
  addLog(m, note.value.trim())
  min.value = ''; note.value = ''
}
</script>
