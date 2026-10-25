import { PLAN } from './plan.js'
import { isCleared } from '../store.js'
import p1 from './banks/p1.js'
import p2 from './banks/p2.js'
import p3 from './banks/p3.js'
import p4 from './banks/p4.js'
import p5 from './banks/p5.js'
import p6 from './banks/p6.js'
import p7 from './banks/p7.js'

export { PLAN }
export const BANKS = [...p1, ...p2, ...p3, ...p4, ...p5, ...p6, ...p7]
export const qById = Object.fromEntries(BANKS.map(q => [q.id, q]))

export function bankForPhase(pid){ return BANKS.filter(q => q.pid === pid) }
export function bankForKp(kid){ return BANKS.filter(q => q.kp === kid) }

export function findKp(kid){
  for(const ph of PLAN.phases){
    const k = ph.kps.find(x => x.id === kid)
    if(k) return { phase: ph, kp: k }
  }
  return null
}

export function kpProgress(kid){
  const qs = bankForKp(kid)
  return { total: qs.length, done: qs.filter(q => isCleared(q.id)).length }
}
export function phaseProgress(ph){
  const qs = bankForPhase(ph.id)
  return { total: qs.length, done: qs.filter(q => isCleared(q.id)).length }
}
