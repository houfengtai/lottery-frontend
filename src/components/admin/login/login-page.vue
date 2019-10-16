<template>
    <div>
        <div class="logo-box">
            <img src="./assets/images/lottery-logo.svg">
            <div class="title-box">幸运大抽奖后台管理系统</div>
        </div>
        <div class="content-box">
            <div><input placeholder="请输入账号" v-model="userName" maxlength="11"></div>
            <div><input type="password" maxlength="16" v-model="password" placeholder="请输入密码"></div>
            <div><button @click="_save()">登&nbsp;录</button></div>
        </div>
        <div class="copyright-box">©copyright 画风 2019-10-16</div>
    </div>
</template>

<script>
import axios from 'axios'
import md5 from 'js-md5'
import locationUtil from './assets/js/locationUtil.js'

export default {
  name: 'login-page',
  data () {
    return {
      userName: '',
      password: ''
    }
  },
  methods: {
    _save () {
      if (this.userName === undefined || this.userName === '' || this.userName == null) {
        alert('账号不能为空')
        return
      }
      if (this.password === undefined || this.password === '') {
        alert('密码不能为空')
        return
      }

      const param = { userName: this.userName, password: md5(this.password) }
      axios.post('/api/admin/login', param).then(res => {
        const { tokenId, userInfo } = res.data.data
        window.localStorage.setItem('authToken', tokenId)
        window.localStorage.setItem('userInfo', userInfo)
        const redirectPath = decodeURIComponent(locationUtil.getCodeByQueryString('redirectPath') || '/admin/activity')
        this.$router.replace({ path: redirectPath })
      })
    },
    _verifyToken () {
      const tokenId = window.localStorage.getItem('authToken')
      if (tokenId != null && tokenId !== 'null' && tokenId !== '' && tokenId !== undefined && tokenId !== 'undefined') {
        axios.get(`/api/admin/verify/${tokenId}`).then(res => {
          const { result } = res.data.data
          if (result) {
            this.$router.replace({ path: decodeURIComponent('/admin/activity') })
          }
        })
      }
    }
  },
  created () {
    document.title = '幸运大抽奖后台管理系统-登录'
  },
  mounted () {
    // 校验是否已登录,如果已登录则直接跳转到主页
    this._verifyToken()
  }
}
</script>

<style scoped>
@import "./assets/scss/lottery-page.scss";
</style>
