<template>
  <div>
    <div class="card">
      <div class="card-title">💾 数据管理</div>
      <p class="muted">进度/错题/标星/日志都存在<b>当前浏览器</b>里(localStorage)。清除浏览器数据会丢失,定期导出备份;换浏览器用导入恢复。</p>
      <div class="btn-row">
        <button class="btn primary" @click="doExport">导出备份(.json)</button>
        <label class="btn" style="cursor:pointer">导入备份
          <input type="file" accept=".json,application/json" style="display:none" @change="doImport">
        </label>
        <button class="btn danger" @click="doReset">清空全部数据</button>
      </div>
      <p class="muted mt8" v-if="msg">{{ msg }}</p>
    </div>

    <div class="card">
      <div class="card-title">📱 手机上怎么用</div>
      <ol>
        <li>桌面端部署到 GitHub Pages 后,手机浏览器打开同一地址</li>
        <li>iPhone Safari:分享 → 添加到主屏幕;安卓Chrome:菜单 → 添加到主屏幕</li>
        <li>之后像普通App一样全屏、离线可用;两台设备进度独立,靠导出/导入同步</li>
      </ol>
    </div>

    <div class="card">
      <div class="card-title">ℹ️ 关于</div>
      <p class="muted">上岸宝典 v0.1.0 · Vue 3 + Vite PWA<br>
      题库与知识点内容基于公开技术文档(JavaGuide / 小林coding / CS-Notes 等)自编,仅供个人学习使用。</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { exportData, importData, resetAll, isoOf } from '../store.js'

const msg = ref('')
function doExport(){
  const blob = new Blob([exportData()], { type: 'application/json' })
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = 'shangan-backup-' + isoOf(new Date()) + '.json'
  a.click()
  URL.revokeObjectURL(a.href)
  msg.value = '已导出,保存好这个文件'
}
function doImport(e){
  const file = e.target.files[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = () => {
    try{
      importData(reader.result)
      msg.value = '导入成功,刷新后生效'
      setTimeout(() => location.reload(), 600)
    }catch(err){ msg.value = '导入失败:文件格式不对' }
  }
  reader.readAsText(file)
}
function doReset(){
  if (confirm('确定清空全部进度、错题、标星和日志?不可恢复!')) {
    resetAll()
    msg.value = '已清空'
  }
}
</script>
