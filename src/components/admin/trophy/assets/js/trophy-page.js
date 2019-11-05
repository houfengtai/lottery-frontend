import menuBar from '@/components/public/menu-bar'
import addImg from '@/components/public/add-img'
import axios from 'axios'

export default {
  name: 'trophy-page',
  components: { menuBar, addImg },
  data () {
    return {
      trophes: [],
      isShowBgDialog: false,
      id: null
    }
  },
  methods: {
    _initData () {
      axios.get('/api/admin/trophes').then(res => {
        this.trophes = res.data.data
      })
    },
    _updateTrophy (item) {
      window.localStorage.setItem('trophyItem', JSON.stringify(item))
      this.$router.push({ name: 'updateTrophy' })
    },
    _showDialog (id) {
      this.isShowBgDialog = true
      this.id = id
    },
    _deleteTrophy () {
      axios.delete(`/api/admin/trophy/${this.id}`).then(res => {
        const code = res.data.code
        if (code === 200) {
          this.$router.history.go(0)
        }
      })
    }
  },
  mounted () {
    this._initData()
  },
  created () {
    document.title = '奖品管理'
  }
}
