<template>
  <div id="app">
    <router-view/>
    <!--<foot-page/>-->
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'app',
  created () {
    this._addInterceptors()
  },
  watch: {
    '$route' (to, from) { // 如果路由有变化，会重新执行该方法
      this._routeChanged(to, from)
    }
  },
  methods: {
    _routeChanged (to, from) {
      this._dealAndroidInputMethodProblem()
    },
    /**
     * 处理安卓手机点击输入框的时候，底部导航被输入法顶上来的问题
     */
    _dealAndroidInputMethodProblem () {
      const userAgent = navigator.userAgent
      if (userAgent.indexOf('Android') > -1 || userAgent.indexOf('Linux') > -1) {
        /**
         * 给所有非只读的输入框通过绑定获取焦点事件，用来把选中的输入框展示在屏幕中间位置
         */
        this.$el.querySelectorAll('input:not([readonly])').forEach(
          e => e.addEventListener('focus', () => {
            this.scrollIntoView(true)
          })
        )
      }
    },
    /**
     * 通过onresize事件，安卓系统弹出输入法的时候隐藏下边导航栏，收起时展示
     */
    _onresizeAndroidScreen () {
      const userAgent = navigator.userAgent
      if (userAgent.indexOf('Android') > -1 || userAgent.indexOf('Linux') > -1) {
        const winowHeight = window.innerHeight
        window.onresize = () => {
          const tabbar = document.querySelector('.tab-main')
          const service = document.querySelector('.service')
          const docHeight = window.innerHeight
          if (docHeight < winowHeight) {
            tabbar.style.display = 'none'
            service !== null && (service.style.display = 'none')
            return
          }
          tabbar.style.display = ''
          service !== null && (service.style.display = '')
        }
      }
    },
    /**
       * 给所有axios请求增加
       * request拦截器：为了给请求header里添加token信息
       * response拦截器：为了统一处理服务器响应和异常
       * @private
       */
    _addInterceptors () {
      /**
         * 添加请求拦截器,统一为请求添加token信息
         */
      axios.interceptors.request.use(
        config => {
          const authToken = window.localStorage.getItem('authToken')
          if (authToken != null && authToken !== '') {
            config.headers['auth-token'] = authToken
          }
          return config
        },
        error => Promise.reject(error)
      )

      /**
         * 添加响应拦截器，统一处理服务器响应和异常
         */
      axios.interceptors.response.use(
        response => {
          const { code, message } = response.data
          if (code === 401 && this.$route.name !== 'lottery') {
            window.localStorage.removeItem('authToken')
            window.localStorage.removeItem('userInfo')
            this.$router.push({ name: 'login', params: { redirectPath: this.$route.fullPath } })
            return
          }
          if (code === 400) {
            alert(message)
            return
          }
          if (code === 500) {
            alert('服务器异常')
            return
          }
          return response
        },
        error => {
          /**
                   * 状态码401代表无权限访问，权限失效，需要重新获取authToken或openToken，此时授权成功后的默认跳转路由改为主页
                   * 状态码500代表REST服务器异常
                   */
          const status = error.response.status
          const message = error.response.data.message
          if (status === 401 && this.$route.name !== 'lottery') {
            /**
             * 登录授权token超时，提示
             */
            window.localStorage.removeItem('authToken')
            window.localStorage.removeItem('userInfo')
            this.$router.push({ name: 'login', params: { redirectPath: this.$route.fullPath } })
            return Promise.reject(error)
          }
          if (status === 400) {
            alert(message)
            return
          }
          if (status === 500) {
            alert('服务器异常')
            return
          }
          return Promise.reject(error)
        }
      )
    }
  },
  mounted () {
  /**
   * 处理安卓手机点击输入框的时候，底部导航被输入法顶上来的问题
   */
    this._dealAndroidInputMethodProblem()
    this._onresizeAndroidScreen()
  }
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin: 0px;
    padding:0px;
    font-size:14px;
  }
  body{
    margin: 0px;
    padding:0px;
    background: #f5f5f5;
  }
  a{
    text-decoration: none;
    color: #2c3e50;
  }
  a:hover{
    text-decoration: none;
    color: #00c1dc;
  }
  .add-box{position: fixed;right:10px;bottom:85px;border-radius: 50%;width:40px;height:40px;}
  .add-box img{width:40px;height:40px;}
  .clear{clear: both;}
  .border-top{border-top:1px solid #e5e5e5;}
  .border-bottom{border-bottom:1px solid #e5e5e5;}
  .border-left{border-left:1px solid #e5e5e5;}
  .border-right{border-right:1px solid #e5e5e5;}
  .bg-dialog{
    position: fixed;
    top:0;
    left:0;
    background: #000;
    opacity: 0.5;
    width: 100%;
    height: 100%;
    z-index: 1;
  }
</style>
