import menuBar from '@/components/public/menu-bar'
import axios from 'axios'
import dateUtil from '@/components/public/dateUtil.js'

export default {
  name: 'log-page',
  components: { menuBar },
  data () {
    return {
      isShowOtherList: false,
      activites: [],
      logs: [],
      activityId: 0,
      activityName: '',
      phone: ''
    }
  },
  methods: {
    _initData () {
      axios.get('/api/admin/activites').then(res => {
        const data = res.data.data
        if (data.length > 0) {
          this.activityId = data[0].id
          this.activityName = data[0].activityName
          this._queryData()
        }
        this.activites = data
      })
    },
    _checkedActivity (id, name) {
      this.activityId = id
      this.isShowOtherList = false
      this.activityName = name
      this._queryData()
    },
    _queryData () {
      const param = `activityId=${this.activityId}&phone=${this.phone}`
      axios.get('/api/admin/user/trophes?' + param).then(res => {
        const data = res.data.data
        this.logs = data
      })
    },
    _getTime (time) {
      return dateUtil.dateFormat('hh:mm', new Date(time))
    }
  },
  mounted () {
    this._initData()
  },
  created () {
    document.title = '中奖记录查询'
  }
}
