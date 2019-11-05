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
