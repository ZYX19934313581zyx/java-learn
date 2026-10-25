import { createRouter, createWebHashHistory } from 'vue-router'
import Today from './views/Today.vue'
import Learn from './views/Learn.vue'
import KpDetail from './views/KpDetail.vue'
import Practice from './views/Practice.vue'
import WrongBook from './views/WrongBook.vue'
import Starred from './views/Starred.vue'
import LogView from './views/LogView.vue'
import Settings from './views/Settings.vue'
import More from './views/More.vue'

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: Today },
    { path: '/learn', component: Learn },
    { path: '/kp/:id', component: KpDetail },
    { path: '/practice', component: Practice },
    { path: '/wrong', component: WrongBook },
    { path: '/starred', component: Starred },
    { path: '/log', component: LogView },
    { path: '/settings', component: Settings },
    { path: '/more', component: More }
  ]
})
