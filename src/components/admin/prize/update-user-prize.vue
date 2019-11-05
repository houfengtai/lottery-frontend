<template>
    <div>
        <back-page></back-page>
        <div class="trophy-row border-bottom">
            <div class="row-label">所属活动</div>
            <span class="ac-content" @click="_showActivity()">
                <span class="ac-title">{{item.activityName}}</span>
                <span><img src="/next.svg"></span>
            </span>
        </div>
        <div class="trophy-row margin-bottom-10 border-bottom">
            <div class="row-label">必中奖品</div>
            <span class="ac-content" @click="isShowTrophes=!isShowTrophes">
                <span class="ac-title">{{item.trophyName}}</span>
                <span><img src="/next.svg"></span>
            </span>
        </div>
        <div class="trophy-row border-top">
            <div class="row-label">手机号码</div>
            <span><input v-model="item.phone" style="width:calc(100% - 85px);" maxlength="11" placeholder="请输入中奖手机号码"/></span>
        </div>
        <div class="trophy-row border-top border-bottom">
            <div class="row-label">第几次中</div>
            <span><input v-model="item.howManyTime" max="2" type="number" placeholder="请输入奖品序号"/></span>
        </div>

        <div class="tips">
            <div>温馨提示：</div>
            <div>1.中奖概率为正整数,数值越大中奖概率越高,0为不中奖</div>
            <div>2.背景颜色为轮盘奖项背景颜色[1~9a~z]6位数</div>
            <div>3.奖品序号为该奖项所在的顺序</div>
        </div>
        <div><button @click="_save()">保 存</button></div>

        <div v-if="isShowDialogBg" class="bg-dialog"></div>
        <div class="activity-box" v-show="isShowActivites">
            <div class="activity-row" v-for="(entity, index) in activites" :key="entity.id" @click="_checkedActivity(entity.id,entity.activityName)">
                <span class="seq-no">{{index + 1}}</span>
                <span class="activity-title">{{entity.activityName}}</span>
                <img v-if="entity.id===item.activityId" src="/selected.svg">
            </div>
        </div>
        <div class="activity-box" v-show="isShowTrophes">
            <div class="activity-row" v-for="(entity, index) in trophes" :key="entity.id" @click="_checkedTrophy(entity.id,entity.trophyName)">
                <span class="seq-no">{{index + 1}}</span>
                <span class="activity-title">{{entity.trophyName}}</span>
                <img v-if="entity.id===item.trophyId" src="/selected.svg">
            </div>
        </div>
    </div>
</template>

<script>
import backPage from '@/components/public/back-page'
import axios from 'axios'
export default {
  name: 'add-user-prize',
  components: { backPage },
  data () {
    return {
      isShowActivites: false,
      isShowTrophes: false,
      isShowDialogBg: false,
      activites: [],
      trophes: [],
      item: {}
    }
  },
  methods: {
    _initData () {
      const item = window.localStorage.getItem('userPrizeItem')
      if (!item) {
        alert('数据异常，请退回重新再试')
        return
      }
      this.item = JSON.parse(item)

      axios.get('/api/admin/activites').then(res => {
        const data = res.data.data
        if (data.length > 0) {
          this._findTrophys()
        }
        this.activites = data
      })
    },
    _showActivity () {
      this.isShowActivites = !this.isShowActivites
      this.isShowDialogBg = !this.isShowDialogBg
    },
    _checkedActivity (id, name) {
      this.item.activityId = id
      this.item.activityName = name
      this.isShowActivites = false
      this.isShowDialogBg = false
      this._findTrophys()
    },
    _checkedTrophy (id, name) {
      this.item.trophyId = id
      this.item.trophyName = name
      this.isShowTrophes = false
      this.isShowDialogBg = false
    },
    _findTrophys () {
      axios.get(`/api/admin/trophes?activityId=${this.item.activityId}`).then(res => {
        const data = res.data.data
        this.trophes = data
      })
    },
    _save () {
      if (!this.item.activityId) {
        alert('请选择所属活动')
        return
      }
      if (!this.item.trophyId) {
        alert('请选择必中的奖品')
        return
      }
      if (!this.item.phone) {
        alert('请输入中奖号码')
        return
      }
      if (!this.item.howManyTime) {
        alert('请输入第几次才中奖')
        return
      }
      let param = Object.assign({}, this.item)
      param.prizeTime = 1
      delete param.trophyName
      delete param.activityName
      axios.put('/api/admin/setting/user', param).then(res => {
        const { code, message } = res.data
        if (code === 200) {
          window.localStorage.removeItem('userPrizeItem')
          this.$router.push({ name: 'userPrize' })
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
    document.title = '编辑指定中奖人信息'
  }
}
</script>

<style scoped>
    @import "./assets/scss/prize.scss";
</style>
