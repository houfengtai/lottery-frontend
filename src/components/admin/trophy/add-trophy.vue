<template>
    <div>
        <back-page></back-page>
        <div class="trophy-row margin-bottom-10 border-bottom">
            <div class="row-label">所属活动</div>
            <span class="ac-content">
                <span class="ac-title">{{activityName}}</span>
                <span><img src="/next.svg"></span>
            </span>
        </div>
        <div class="trophy-row border-top">
            <div class="row-label">奖品名称</div>
            <span><input v-model="item.trophyName" style="width:calc(100% - 85px);" maxlength="10" placeholder="请输入奖品名称"/></span>
        </div>
        <div class="trophy-row border-top">
            <div class="row-label">奖品概率</div>
            <span><input v-model="item.probability" maxlength="5" type="number" placeholder="请输入奖品概率"/></span>
        </div>
        <div class="trophy-row border-top">
            <div class="row-label">背景颜色</div>
            <span>
                <label style="color: #aaaaaa;font-weight: normal;">#</label>
                <input style="width:120px;" maxlength="6" v-model="selectedColor" placeholder="奖项背景颜色"/>
            </span>
            <span class="color-yl" :style="{background:'#'+ selectedColor}"></span>
        </div>
        <div class="trophy-row border-top border-bottom">
            <div class="row-label">奖品序号</div>
            <span><input v-model="item.seqNo" max="2" type="number" placeholder="请输入奖品序号"/></span>
        </div>
        <div class="tips">
            <div>温馨提示：</div>
            <div>1.中奖概率为正整数,数值越大中奖概率越高,0为不中奖</div>
            <div>2.背景颜色为轮盘奖项背景颜色</div>
            <div>3.奖品序号为该奖项所在的顺序</div>
        </div>
        <div><button @click="_save()">保 存</button></div>
    </div>
</template>

<script>
import BackPage from '@/components/public/back-page'
export default {
  name: 'add-trophy',
  components: { BackPage },
  data () {
    return {
      selectedColor: '',
      activityName: '',
      item: {}
    }
  },
  methods: {
    _save () {

    }
  },
  created () {
    document.title = '新增奖品'
  }
}
</script>

<style scoped>
.trophy-row{
    min-height:50px;
    background: #fff;
    padding: 0px 10px;
    width: calc(100% - 20px);
}
.ac-content{
    display: block;
    width:calc(100% - 80px);
    height:50px;
    line-height:50px;
    float:left;
}
.ac-title{
    width:calc(100% - 20px);
    boarder:1px solid red;
    display: inline-block;
    height: 50px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}
.ac-content img{
    float: right;
    margin-top: 10px;
    margin-right: -10px;
}
.trophy-row span input{
    width:calc(100% - 140px);
    height:35px;
    line-height:35px;
    font-size:14px;
    margin-top: 6px;
    border:0;
}
.margin-bottom-10{
    margin-bottom:10px;
}
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
.row-label{
    line-height:50px;
    display: block;
    height:50px;
    width:70px;
    float:left;
}
.tips{color:red;
    font-size:12px;
    margin-top:5px;
    padding: 0px 10px;
    width: calc(100% - 20px);}
.color-yl{
    width:40px;
    height:20px;
    display: block;
    float: right;
    margin-top:15px;
}
</style>
