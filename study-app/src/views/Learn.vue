<template>
  <div>
    <div class="muted" style="margin-bottom:10px">按顺序学,考核关卡全过再进下一阶段。知识点=介绍+代码+题目,学到哪刷到哪。</div>
    <div v-for="p in PLAN.phases" :key="p.id" class="card">
      <div class="card-title" style="cursor:pointer" @click="toggle(p.id)">
        <span>{{ open.has(p.id) ? '▾' : '▸' }}</span>
        <span>{{ p.name }}</span>
        <span v-if="phaseDone(p)" class="tag do">已过关</span>
        <span v-else-if="p.id === curId" class="tag hand">当前</span>
        <span class="muted" style="font-weight:400">{{ p.span }}</span>
      </div>
      <div class="pbar" style="margin:6px 0"><div class="fill" :style="{ width: pct(p) + '%' }"></div></div>
      <div class="muted">{{ p.goal }} · 题库 {{ phaseProgress(p).done }}/{{ phaseProgress(p).total }} 清除</div>

      <template v-if="open.has(p.id)">
        <div class="mt8">
          <div v-for="k in p.kps" :key="k.id" class="row">
            <span class="grow">
              <router-link :to="'/kp/' + k.id" class="name" style="text-decoration:none;color:var(--ink)">
                {{ k.name }} <span class="tag" :class="lvCls(k.lv)">{{ k.lv }}</span>
              </router-link>
              <div class="sub">过关标准:{{ k.std }} · 题 {{ kpProgress(k.id).done }}/{{ kpProgress(k.id).total }}</div>
            </span>
            <router-link class="btn small" :to="'/kp/' + k.id">学</router-link>
          </div>
        </div>
        <div style="border-top:1.5px solid var(--line);margin-top:8px;padding-top:8px">
          <div style="font-weight:800;font-size:13.5px;margin-bottom:4px">✅ 考核关卡(全过=阶段完成)</div>
          <div v-for="(g, i) in p.gates" :key="i" class="row">
            <input type="checkbox" :checked="gateOn(p.id + '-g' + i)" @change="setGate(p.id + '-g' + i, $event.target.checked)">
            <span class="grow" :style="gateOn(p.id + '-g' + i) ? 'text-decoration:line-through;color:var(--ink-2)' : ''">{{ g }}</span>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive } from 'vue'
import { PLAN, phaseProgress, kpProgress } from '../data/index.js'
import { gateOn, setGate, store } from '../store.js'

function phaseGatesDone(ph){ return ph.gates.every((g, i) => gateOn(ph.id + '-g' + i)) }
function phaseDone(ph){ return phaseGatesDone(ph) }
const curId = computed(() => PLAN.phases.find(ph => !phaseGatesDone(ph))?.id)
const open = reactive(new Set([curId.value]))
function toggle(id){ open.has(id) ? open.delete(id) : open.add(id) }
function pct(p){ const r = phaseProgress(p); return Math.round(r.done * 100 / Math.max(1, r.total)) }
function lvCls(lv){ return lv === '手搓' ? 'hand' : lv === '执行' ? 'do' : lv === '看懂' ? 'read' : 'know' }
</script>
