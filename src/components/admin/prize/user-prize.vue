<template>
    <div>
        <back-page></back-page>
        <div class="row-head">
            <div>手机号码</div>
            <div>所属活动</div>
            <div>必中奖品</div>
            <div>第几次中</div>
            <div>操作</div>
        </div>
        <div class="list-box">
            <div class="row" v-for="item in userPizes" :key="item.id">
                <div>{{item.phone}}</div>
                <div>{{item.activityName}}</div>
                <div>{{item.trophyName}}</div>
                <div>{{item.howManyTime}}</div>
                <div class="action">
                    <img src="/delete.svg" @click="_showDialog(item.id)">
                    <img src="/update.svg" @click="_updateUser(item)">
                </div>
            </div>
        </div>
        <div v-if="isShowBgDialog" class="bg-dialog"></div>
        <div v-if="isShowBgDialog" class="dialog-box">
            <div class="">确定要删除该指定用户吗?</div>
            <div>
                <button @click="isShowBgDialog=false">取 消</button>
                &nbsp;&nbsp;&nbsp;
                <button @click="_deleteUser()">确 定</button>
            </div>
        </div>
        <add-img url="/admin/setting/prize/add"></add-img>
    </div>
</template>

<script>
import backPage from '@/components/public/back-page'
import addImg from '@/components/public/add-img'
import axios from 'axios'
export default {
  name: 'user-prize',
  components: { backPage, addImg },
  data () {
    return {
      userPizes: [],
      isShowBgDialog: false,
      id: null
    }
  },
  methods: {
    _initData () {
      axios.get('/api/admin/setting/users').then(res => {
        if (res.data.code === 200) {
          this.userPizes = res.data.data
        }
      })
    },
    _showDialog (id) {
      this.id = id
      this.isShowBgDialog = true
    },
    _deleteUser () {
      axios.delete(`/api/admin/setting/user/${this.id}`).then(res => {
        const { code, message } = res.data
        if (code === 200) {
          this.$router.history.go(0)
        } else {
          alert(message)
        }
      })
    },
    _updateUser (item) {
      window.localStorage.setItem('userPrizeItem', JSON.stringify(item))
      this.$router.push({ name: 'updateUserPrize' })
    }
  },
  mounted () {
    this._initData()
  },
  created () {
    document.title = '指定中奖人管理'
  }
}
</script>

<style scoped>
@import "./assets/scss/user-prize.scss";
</style>
