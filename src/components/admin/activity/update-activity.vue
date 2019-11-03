<template>
<div>
    <back-page></back-page>
    <div class="update-activity">
        <div class="row margin-bottom-10">
            <span class="font-title">活动名称</span>
            <span><input v-model="item.activityName" maxlength="100"></span>
        </div>
        <div class="row border-top">
            <span class="font-title">开始时间</span>
            <span><input type="date"  v-model="item.startTime"></span>
        </div>
        <div class="row margin-bottom-10">
            <span class="font-title">结束时间</span>
            <span><input type="date"  v-model="item.endTime"></span>
        </div>
        <div class="row border-top">
            <span class="font-title float-left">活动说明</span>
            <span><textarea v-model="item.remark" ></textarea></span>
        </div>
        <div class="tips">温馨提示：换行请在后面加上&lt;br&gt;</div>
        <div><button @click="_save()">保 存</button></div>
    </div>
</div>
</template>

<script>
import dateUtil from '@/components/public/dateUtil.js'
import BackPage from '@/components/public/back-page'
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
      this.item.startTime = dateUtil.dateFormat('yyyy-MM-dd', new Date(this.item.startTime))
      this.item.endTime = dateUtil.dateFormat('yyyy-MM-dd', new Date(this.item.endTime))
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
.row{
    min-height: 40px;
    border-bottom: 1px solid #e5e5e5;
    background: #fff;
    padding: 0px 10px;
}
.font-title{
    height:50px;
    line-height:50px;
    width: 70px;
    display: inline-block;
    color:#666;
}
.row span input{
    display: inline-block;
    height:35px;
    line-height: 35px;
    /*text-indent: 1em;*/
    width: calc(100% - 75px);
    border:0;
    border-radius: 16px;
    font-size:14px;
}
.row span input:focus{
    border:0;
}
.row span textarea{
    display: inline-block;
    min-height:120px;
    padding: 5px 10px;
    text-indent: 1em;
    width: calc(100% - 95px);
    resize: none;
    border:0;
}
.float-left{
    float: left;
}
.margin-bottom-10{margin-bottom: 10px}
.border-top{border-top:1px solid #e5e5e5;}
 button{
    display: block;
    width: calc(100% - 20px);
    border: 0px;
    border-radius: 20px;
    height:40px;
    line-height: 40px;
    font-size: 16px;
    margin: 10px auto;
    background: #ffbf02;
    color:#fff;
}
    .tips{color:red;font-size:12px;margin-top:5px;text-indent: 1em;}
</style>
