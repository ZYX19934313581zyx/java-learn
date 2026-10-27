import { reactive, watch } from 'vue'

const KEY = 'shangan_v1'
function blank(){
  return { answers: {}, starred: [], gates: {}, logs: [], override: null, practicePos: {} }
}
function load(){
  try{
    const raw = localStorage.getItem(KEY)
    if(!raw) return blank()
    return Object.assign(blank(), JSON.parse(raw))
  }catch(e){
    return blank()
  }
}
export const store = reactive(load())
watch(store, s => localStorage.setItem(KEY, JSON.stringify(s)), { deep: true })

/* 作答状态:a.s=答对次数 a.w=答错次数 a.streak=连续答对 a.last='wrong'|'ok'|'cleared'
   错题本规则(驾考宝典式):错过且未"清除"就在错题本;连续答对2次自动移出 */
export function record(qid, correct){
  const a = store.answers[qid] || (store.answers[qid] = { s:0, w:0, streak:0, last:null })
  if(correct){
    a.s++; a.streak++
    a.last = a.streak >= 2 ? 'cleared' : 'ok'
  }else{
    a.w++; a.streak = 0; a.last = 'wrong'
  }
}
export function qState(id){ return store.answers[id] }
export function inWrongBook(id){
  const a = store.answers[id]
  return !!a && a.w > 0 && a.last !== 'cleared'
}
export function isCleared(id){
  const a = store.answers[id]
  return !!a && a.last === 'cleared'
}
export function toggleStar(id){
  const i = store.starred.indexOf(id)
  if(i >= 0) store.starred.splice(i, 1)
  else store.starred.push(id)
}
export function isStarred(id){ return store.starred.includes(id) }

export function setGate(id, v){ store.gates[id] = v }
export function gateOn(id){ return !!store.gates[id] }

export function addLog(min, note){
  store.logs.push({ d: isoOf(new Date()), min, note })
}
export function isoOf(d){
  return d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0')
}
export function streak(){
  const set = new Set(store.logs.map(l => l.d))
  let n = 0
  const d = new Date()
  if(!set.has(isoOf(d))) d.setDate(d.getDate() - 1)
  while(set.has(isoOf(d))){ n++; d.setDate(d.getDate() - 1) }
  return n
}
export function totalMin(){ return store.logs.reduce((s, l) => s + l.min, 0) }

export function exportData(){
  return JSON.stringify({ app: 'shangan-baodian', v: 1, exportedAt: new Date().toISOString(), data: store }, null, 2)
}
export function importData(json){
  const obj = JSON.parse(json)
  const data = obj.data || obj
  Object.assign(store, blank(), data)
}
export function resetAll(){ Object.assign(store, blank()) }

export function daysTo(iso){
  const now = new Date()
  const t = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const m = new Date(iso + 'T00:00:00')
  return Math.round((m - t) / 86400000)
}
