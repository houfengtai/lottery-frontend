import menuBar from '@/components/public/menu-bar'
import addImg from '@/components/public/add-img'
import axios from 'axios'

export default {
  name: 'prize-page',
  components: { menuBar, addImg },
  data () {
    return {
      useres: [],
      phone: '',
      isShowBgDialog: false,
      id: null
    }
  },
  methods: {
    _initData () {
      axios.get('/api/admin/prize/user').then(res => {
        if (res.data.code === 200) {
          this.useres = res.data.data
        } else {
          alert(res.data.message)
        }
      })
    },
    _deleteUser () {
      axios.delete(`/api/admin/prize/user/${this.id}`).then(res => {
        if (res.data.code === 200) {
          this.$router.history.go(0)
        } else {
          alert(res.data.message)
        }
      })
    },
    _updateUser (item) {
      window.localStorage.setItem('userItem', JSON.stringify(item))
      this.$router.push({ name: 'updatePrize' })
    },
    _showDialog (id) {
      this.isShowBgDialog = true
      this.id = id
    },
    _go () {
      this.$router.push({ name: 'userPrize' })
    }
  },
  mounted () {
    this._initData()
  },
  created () {
    document.title = '抽奖人管理'
  }
}
