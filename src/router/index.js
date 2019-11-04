import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../vuex/store'

// https://github.com/mvpleung/vue-verify
import vueVerify from '@mvpleung/verify'

Vue.use(vueVerify, {
  multiple: true // 是否支持批量校验
})

Vue.use(VueRouter)

/**
 * 引入组件时 命名首字母必须大写
 * 每个组件都应该设置title、keywords以便百度等搜索引擎收录
 * path 设定为 /web/ 开头
 * name 设定为小写
 * meta 中 requiresAuth 有值时 则表示需要登录
 */
const routes = [
  {
    path: '/lottery',
    name: 'lottery',
    component: resolve => require(['@/components/lottery/lottery-page'], resolve)
  },
  {
    path: '/',
    name: 'lottery',
    component: resolve => require(['@/components/lottery/lottery-page'], resolve)
  },
  {
    path: '/admin/login',
    name: 'login',
    component: resolve => require(['@/components/admin/login/login-page'], resolve)
  },
  {
    path: '/admin/activity',
    name: 'activity',
    component: resolve => require(['@/components/admin/activity/activity-page'], resolve),
    mata: {
      requiresAuth: true
    }
  },
  {
    path: '/admin/activity/add',
    name: 'addActivity',
    component: resolve => require(['@/components/admin/activity/add-activity'], resolve),
    mata: {
      requiresAuth: true
    }
  },
  {
    path: '/admin/activity/update',
    name: 'updateActivity',
    component: resolve => require(['@/components/admin/activity/update-activity'], resolve),
    mata: {
      requiresAuth: true
    }
  },
  {
    path: '/admin/trophy',
    name: 'trophy',
    component: resolve => require(['@/components/admin/trophy/trophy-page'], resolve),
    mata: {
      requiresAuth: true
    }
  },
  {
    path: '/admin/trophy/add',
    name: 'addTrophy',
    component: resolve => require(['@/components/admin/trophy/add-trophy'], resolve),
    mata: {
      requiresAuth: true
    }
  },
  {
    path: '/admin/trophy/update',
    name: 'updateTrophy',
    component: resolve => require(['@/components/admin/trophy/update-trophy'], resolve),
    mata: {
      requiresAuth: true
    }
  },
  {
    path: '/admin/user/logs',
    name: 'logs',
    component: resolve => require(['@/components/admin/log/log-page'], resolve),
    mata: {
      requiresAuth: true
    }
  },
  {
    path: '*',
    component: resolve => require(['@/components/public/not-found'], resolve)
  }
]
const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  /**
   * 如果去授权页面，就直接跳转过去
   */
  if (to.name === 'login' || to.name === 'register') {
    next()
    return
  }

  /**
   * 2.如果没有authToken，代表未获得登录授权，需要去登录页面进行登录
   */
  const authToken = window.localStorage.getItem('authToken')
  if (to.matched.some(route => route.meta.requiresAuth) && (authToken == null || authToken === '')) {
    store.commit('setTabModule', 'index')
    next({
      name: 'login',
      params: {
        redirectPath: to.fullPath
      }
    })
    return
  }

  store.commit('setTabModule', to.name)
  next()
})

export default router
