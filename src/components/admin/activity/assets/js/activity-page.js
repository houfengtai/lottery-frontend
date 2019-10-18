import menuBar from '@/components/public/menu-bar'
import axios from 'axios'
import dateUtil from '@/components/public/dateUtil.js'

export default {
  name: 'activity-page',
  components: { menuBar },
  data () {
    return {
      activites: []
    }
  },
  methods: {
    _initData () {
      axios.get('/api/admin/activites').then(res => {
        this.activites = res.data.data
      })
    },
    _getTime (startTime, endTime) {
      if (startTime && endTime) return '' + dateUtil.dateFormat('yyyy-MM-dd', new Date(startTime)) + '~' + dateUtil.dateFormat('yyyy-MM-dd', new Date(endTime))
      if (!startTime && !endTime) return '活动时间:不限'
      if (startTime && !endTime) return '活动开始时间:' + dateUtil.dateFormat('yyyy-MM-dd', new Date(startTime))
      if (!startTime && endTime) return '活动结束时间:' + dateUtil.dateFormat('yyyy-MM-dd', new Date(endTime))
    },
    _getStatus (status) {
      switch (status) {
      case 0: return '已暂停'
      case 1: return '已启动'
      }
    },
    _setSelected (index) {
      let obj = this.activites[index]
      obj.isSelected = !this.activites[index].isSelected
      this.$set(this.activites, index, obj)
    },
    _addActivity () {
      this.$router.push({ name: 'addActivity' })
    },
    _stopActivity (id, index) {
      axios.put(`/api/admin/activity/stop/${id}`).then(res => {
        const code = res.data.code
        if (code === 200) {
          let obj = this.activites[index]
          obj.status = 0
          this.$set(this.activites, index, obj)
        }
      })
    },
    _startActivity (id) {
      axios.put(`/api/admin/activity/start/${id}`).then(res => {
        const code = res.data.code
        if (code === 200) {
          this.$router.history.go(0)
        }
      })
    },
    _updateActivity (item) {
      // 先存到缓存中,等到对应的页面需要用到时再获取
      window.localStorage.setItem('activityItem', JSON.stringify(item))
      this.$router.push({ name: 'updateActivity' })
    }
  },
  mounted () {
    this._initData()
  },
  created () {
    document.title = '活动管理'
  }
}
