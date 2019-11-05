import BackPage from '@/components/public/back-page'
import axios from 'axios'
export default {
  name: 'update-trophy',
  components: { BackPage },
  data () {
    return {
      selectedColor: '',
      activityName: '',
      item: {},
      isShowActivites: false,
      activites: []
    }
  },
  methods: {
    _initData () {
      const item = window.localStorage.getItem('trophyItem')
      if (!item) {
        alert('数据异常，请退回重新再试')
        return
      }
      this.item = JSON.parse(item)
      this.selectedColor = this.item.bgColor.substr(1, 6)

      axios.get('/api/admin/activites').then(res => {
        const data = res.data.data
        if (data.length > 0) {
          this.activityName = data.find(x => x.id === this.item.activityId).activityName
        }
        this.activites = data
      })
    },
    _checkedActivity (id, name) {
      this.item.activityId = id
      this.activityName = name
      this.isShowActivites = false
    },
    _save () {
      if (!this.item.activityId) {
        alert('请选择所属活动')
        return
      }
      if (!this.item.trophyName) {
        alert('请输入奖品名称')
        return
      }
      if (!this.item.probability) {
        alert('请输入奖品概率')
        return
      }
      if (!this.selectedColor) {
        alert('请输入奖品背景颜色')
        return
      } else {
        this.item.bgColor = '#' + this.selectedColor
      }
      if (!this.item.seqNo) {
        alert('请输入奖品序号')
      }
      axios.put('/api/admin/trophy', this.item).then(res => {
        const { code, message } = res.data
        if (code === 200) {
          window.localStorage.removeItem('trophyItem')
          this.$router.push({ name: 'trophy' })
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
    document.title = '编辑奖品'
  }
}
