<template>
<div>
    <back-page></back-page>

</div>
</template>

<script>
import BackPage from '../../public/back-page'
export default {
  name: 'update-activity',
  components: { BackPage },
  data () {
    return {
      item: {}
    }
  },
  methods: {
    _initData () {
      const item = window.localStorage.getItem('activityItem')
      if (!item) {
        alert('数据异常，请退回重新再试')
        return
      }
      this.item = JSON.parse(item)
    }

  },
  mounted () {

  },
  created () {
    document.title = '编辑活动'
    this._initData()
  }
}
</script>

<style scoped>

</style>
