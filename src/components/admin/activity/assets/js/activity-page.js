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
    }
  },
  mounted () {
    this._initData()
  },
  created () {
    document.title = '活动管理'
  }
}
