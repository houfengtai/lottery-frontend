import BackPage from '@/components/public/back-page'
import axios from 'axios'
export default {
  name: 'update-user',
  components: { BackPage },
  data () {
    return {
      item: {}
    }
  },
  methods: {
    _initData () {
      const item = window.localStorage.getItem('userItem')
      if (!item) {
        alert('数据异常，请退回重新再试')
        return
      }
      this.item = JSON.parse(item)
    },
    _save () {
      if (!this.item.phone) {
        alert('请输入手机号码')
        return
      }
      if (!this.item.time) {
        alert('请输入可抽奖次数')
        return
      }
      axios.put('/api/admin/setting/phone', this.item).then(res => {
        const { code, message } = res.data
        if (code === 200) {
          window.localStorage.removeItem('userItem')
          this.$router.push({ name: 'prize' })
        } else {
          alert(message)
        }
      })
    }
  },
  mounted () {
    this._initData()
  },
  created () {
    document.title = '编辑用户信息'
  }
}
