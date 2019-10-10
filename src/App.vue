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
  methods: {
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
          let code = response.data.code
          if (code === 401 && this.$route.name !== 'lottery') {
            window.localStorage.removeItem('authToken')
            window.localStorage.removeItem('userInfo')
            this.$router.push({ name: 'login', params: { redirectPath: this.$route.fullPath } })
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
          // const message = error.response.data.message
          if (status === 401 && this.$route.name !== 'lottery') {
            /**
             * 登录授权token超时，提示
             */
            window.localStorage.removeItem('authToken')
            window.localStorage.removeItem('userInfo')
            this.$router.push({ name: 'login', params: { redirectPath: this.$route.fullPath } })
            return Promise.reject(error)
          }
          if (status === 500) {
            //
          }
          return Promise.reject(error)
        }
      )
    }
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
    background: #f5f5f5;
    font-size:14px;
  }
  body{
    margin: 0px;
    padding:0px;
  }
  a{
    text-decoration: none;
    color: #2c3e50;
  }
  a:hover{
    text-decoration: none;
    color: #00c1dc;
  }
</style>
