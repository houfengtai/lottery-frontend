import BackPage from '@/components/public/back-page'
import axios from 'axios'
export default {
  name: 'add-user',
  components: { BackPage },
  data () {
    return {
      item: {}
    }
  },
  methods: {
    _save () {
      if (!this.item.phone) {
        alert('请输入手机号码')
        return
      }
      if (!this.item.num) {
        alert('请输入可抽奖次数')
        return
      }
      axios.post('/api/admin/setting/phone', this.item).then(res => {
        const { code, message } = res.data
        if (code === 200) {
          this.$router.push({ name: 'prize' })
        } else {
          alert(message)
        }
      })
    }
  },
  mounted () {
  },
  created () {
    document.title = '设置用户信息'
  }
}
