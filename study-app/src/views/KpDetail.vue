<template>
  <div v-if="found">
    <div class="phase-head">
      <h2>{{ kp.name }}</h2>
      <div class="info">{{ phase.name }} · {{ phase.span }} · <span class="tag" :class="lvCls(kp.lv)">{{ kp.lv }}</span></div>
    </div>

    <div class="card">
      <div class="card-title">📖 这是什么</div>
      <p style="white-space:pre-wrap">{{ kp.intro }}</p>
      <div class="muted"><b>过关标准:</b>{{ kp.std }}</div>
    </div>

    <div class="card" v-if="kp.code">
      <div class="card-title">💻 示例代码 <button class="btn small" @click="copy">复制去IDEA跑</button></div>
      <div class="codewrap">
        <pre class="code">{{ kp.code }}</pre>
        <span v-if="copied" class="copy-btn" style="top:-6px;right:8px;background:var(--pass);border-color:#075C31;color:#fff">已复制</span>
      </div>
    </div>

    <div class="card">
      <div class="card-title">🚀 接下来</div>
      <div class="btn-row" style="margin-top:2px">
        <button class="btn primary" @click="go('order')">顺序练 {{ qs.length }} 题</button>
        <button class="btn" @click="go('rand')">随机练</button>
        <button class="btn" @click="go('recite')">背题模式</button>
      </div>
      <div class="muted mt8">清除进度 {{ done }}/{{ qs.length }}(答对2次自动移出错题本)</div>
    </div>
  </div>
  <div v-else class="card">没找到这个知识点,<router-link to="/learn">回学习页</router-link></div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { findKp, bankForKp } from '../data/index.js'
import { isCleared } from '../store.js'

const route = useRoute()
const router = useRouter()
const found = computed(() => findKp(route.params.id))
const phase = computed(() => found.value?.phase)
const kp = computed(() => found.value?.kp)
const qs = computed(() => kp.value ? bankForKp(kp.value.id) : [])
const done = computed(() => qs.value.filter(q => isCleared(q.id)).length)
const copied = ref(false)

function go(mode){ router.push({ path: '/practice', query: { scope: kp.value.id, mode } }) }
function lvCls(lv){ return lv === '手搓' ? 'hand' : lv === '执行' ? 'do' : lv === '看懂' ? 'read' : 'know' }
async function copy(){
  const text = kp.value.code || ''
  try{ await navigator.clipboard.writeText(text) }
  catch(e){
    const ta = document.createElement('textarea')
    ta.value = text; document.body.appendChild(ta); ta.select()
    document.execCommand('copy'); ta.remove()
  }
  copied.value = true
  setTimeout(() => copied.value = false, 1500)
}
</script>
