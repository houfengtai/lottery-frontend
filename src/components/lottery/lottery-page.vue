<template>
    <div class="main">
        <img src="./assets/images/game-bg.jpg" alt="" style="position: absolute;width: 100%;height: 100%;">
        <div class="content" style="margin-top: 58%;">
            <img src="./assets/images/8.png" id="fen-img" style="display:none;" />
            <div class="banner">
                <div class="turnplate">
                    <canvas class="item" id="wheelcanvas" width="422px" height="422px" :style="{transform:turnplate.angle,transition:(turnplate.rotateTransition == ''?'transform 4s ease-in-out':turnplate.rotateTransition) }"></canvas>
                    <img class="pointer" @click="_beginLottery()" src="./assets/images/turnplate-pointer.png">
                </div>
            </div>
            <div class="info-tips">欢迎您参与【三味蒸火】举办的抽奖活动，您还有 <span style="color:red;">{{time}}</span> 次抽奖机会!</div>
            <div id="sbtn">
                <a><img src="./assets/images/btn-rule.png" @click="_showRule()" alt=""></a>
                <a><img src="./assets/images/btn-zjcx.png" @click="_queryTrophy()" alt=""></a>
            </div>
            <div class="rule" v-if="isShowRule" v-html="remark">{{remark}}</div>
            <div class="rule" v-if="isShowLogs">
                <p v-if="trophyLogs.length==0" style="line-height: 100px;text-align: center;color:#666;">暂无中奖记录哦^_^</p>
                <p v-for="trophy in trophyLogs" :key="trophy.id">{{trophy.content}}<span class="show-time">{{_getDate(trophy.createTime)}}</span></p>
            </div>
        </div>
        <div v-if="isShowBgDialog" class="bg-dialog"></div>
        <div v-if="!isLogin" class="login-box">
            <div>请输入下单时预留的手机号码</div>
            <div><input v-model="telPhone" ></div>
            <div><button @click="_settingPhone()">确定</button></div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import dateUtil from '@/components/public/dateUtil.js'

export default {
  name: 'lottery-page',
  metaInfo: {
    title: '三味蒸火-幸运大抽奖'
  },
  data () {
    return {
      turnplate: {
        // 大转盘奖品名称
        restaraunts: [],
        // 大转盘奖品区块对应背景颜色
        colors: [],
        // 大转盘外圆的半径
        outsideRadius: 192,
        // 大转盘奖品位置距离圆心的距离
        textRadius: 155,
        // 大转盘内圆的半径
        insideRadius: 68,
        // 开始角度
        startAngle: 0,
        // 将要旋转的角度
        angle: 0,
        // 转动圈数
        animateNum: 5,
        // 动画过渡时间 s
        duration: 5,
        // 控制过渡效果
        rotateTransition: '',
        // false:停止;ture:旋转
        bRotate: false
      },
      // 活动标题
      title: '',
      // 活动说明
      remark: '',
      // 可抽奖次数
      time: 0,
      // 是否已登录
      isLogin: false,
      // 是否显示背景蒙版
      isShowBgDialog: true,
      // 手机号码
      telPhone: '',
      tokenId: '',
      isShowRule: true,
      isShowLogs: false,
      trophyLogs: []
    }
  },
  methods: {
    _getInitData () {
      axios.get('/api/init').then(res => {
        const data = res.data.data
        const { bgColorList, remark, trophyList, title } = data
        this.turnplate.colors = bgColorList
        this.turnplate.restaraunts = trophyList
        this.title = title
        this.remark = remark
        // 初始化转盘
        this._drawRouletteWheel()
      })
    },
    _beginLottery () {
      if (this.turnplate.bRotate) return
      this.turnplate.bRotate = !this.turnplate.bRotate
      axios.get(`/api/lottery?tokenId=${this.tokenId}`).then(res => {
        const code = res.data.code
        if (code === 200) {
          const { angles, msg } = res.data.data
          this.rotate(angles, msg)
          this.time = this.time - 1
        } else if (code === 401) {
          this._clearLoginInfo()
        } else {
          alert(res.data.message)
        }
      })
    },
    /**
       * 绑定手机号码
       **/
    _settingPhone () {
      axios.post('/api/verify', { phone: this.telPhone, randomId: new Date().getTime() }).then(res => {
        if (res.data.code === 200) {
          const { tokenId, time } = res.data.data
          this.tokenId = tokenId
          this.time = time
          window.localStorage.setItem('randomId', tokenId)
          this.isShowBgDialog = false
          this.isLogin = true
        } else {
          this.isShowBgDialog = true
          this.isLogin = false
          alert(res.data.message)
        }
        this.telPhone = ''
      })
    },
    /**
       * 查询可抽奖次数
       * */
    _getLotteryTime (tokenId) {
      axios.get(`/api/time?tokenId=${tokenId}`).then(res => {
        const code = res.data.code
        if (code === 200) {
          this.time = res.data.data
        } else if (code === 401) {
          this._clearLoginInfo()
        } else {
          alert(res.data.message)
        }
      })
    },
    _queryTrophy () {
      axios.get(`/api/trophy?tokenId=${this.tokenId}`).then(res => {
        const code = res.data.code
        if (code === 200) {
          this.trophyLogs = res.data.data
          this.isShowRule = false
          this.isShowLogs = true
        } else if (code === 401) {
          this._clearLoginInfo()
        } else {
          alert(res.data.message)
        }
      })
    },
    _showRule () {
      this.isShowRule = true
      this.isShowLogs = false
    },
    _getDate (date) {
      const newDate = new Date(date)
      return dateUtil.dateFormat('yyyy-MM-dd hh:mm:ss', newDate)
    },
    _clearLoginInfo () {
      this.isLogin = false
      this.isShowBgDialog = true
      this.telPhone = ''
      this.tokenId = ''
      window.localStorage.removeItem('randomId')
    },
    /**
   * 转动轮盘方法(只转动，不做其他操作)
   * */
    rotate (angle, msg) {
      // 旋转结束前不允许再次触发
      this.turnplate.bRotate = true
      // 真正转动的角度
      this.turnplate.angle = `rotate(${this.turnplate.animateNum * 360 + angle}deg)`
      // 旋转结束后允许再次触发
      setTimeout(() => {
        this.turnplate.bRotate = false
        if (msg === '谢谢参与') {
          alert(msg)
        } else {
          alert('恭喜获得了' + msg)
        }
        this._gameOver()
      }, this.turnplate.duration * 1000 + 200)
    },
    /**
       * 游戏结束重置方法
      * */
    _gameOver () {
      // 游戏结束，重置旋转初始位置
      this.turnplate.angle = `rotate(0deg)`
      this.turnplate.rotateTransition = 'transform 0.05s ease-in-out' // 控制转动过渡效果的
      setTimeout(() => {
        this.turnplate.rotateTransition = ''
      }, 100)
    },
    /**
   * 绘画转盘方法
   **/
    _drawRouletteWheel () {
      let canvas = document.getElementById('wheelcanvas')
      // alert(canvas.getContext('2d').strokeStyle = '#FFBE04')
      if (canvas.getContext) {
        // 根据奖品个数计算圆周角度
        let arc = Math.PI / (this.turnplate.restaraunts.length / 2)
        let ctx = canvas.getContext('2d')
        // 在给定矩形内清空一个矩形
        ctx.clearRect(0, 0, 422, 422)
        // strokeStyle 属性设置或返回用于笔触的颜色、渐变或模式
        ctx.strokeStyle = '#FFBE04'
        // font 属性设置或返回画布上文本内容的当前字体属性
        ctx.font = '16px Microsoft YaHei'
        for (let i = 0; i < this.turnplate.restaraunts.length; i++) {
          let angle = this.turnplate.startAngle + i * arc
          ctx.fillStyle = this.turnplate.colors[i]
          ctx.beginPath()
          // arc(x,y,r,起始角,结束角,绘制方向) 方法创建弧/曲线（用于创建圆或部分圆）
          ctx.arc(211, 211, this.turnplate.outsideRadius, angle, angle + arc, false)
          ctx.arc(211, 211, this.turnplate.insideRadius, angle + arc, angle, true)
          ctx.stroke()
          ctx.fill()
          // 锁画布(为了保存之前的画布状态)
          ctx.save()

          // ----绘制奖品开始----
          ctx.fillStyle = '#E5302F'
          let text = this.turnplate.restaraunts[i]
          let lineHeight = 17
          // translate方法重新映射画布上的 (0,0) 位置
          ctx.translate(211 + Math.cos(angle + arc / 2) * this.turnplate.textRadius, 211 + Math.sin(angle + arc / 2) * this.turnplate.textRadius)

          // rotate方法旋转当前的绘图
          ctx.rotate(angle + arc / 2 + Math.PI / 2)

          /** 下面代码根据奖品类型、奖品名称长度渲染不同效果，如字体、颜色、图片效果。(具体根据实际情况改变) **/
          if (text.indexOf('M') > 0) { // 流量包
            let texts = text.split('M')
            for (let j = 0; j < texts.length; j++) {
              ctx.font = j === 0 ? 'bold 20px Microsoft YaHei' : '16px Microsoft YaHei'
              if (j === 0) {
                ctx.fillText(texts[j] + 'M', -ctx.measureText(texts[j] + 'M').width / 2, j * lineHeight)
              } else {
                ctx.fillText(texts[j], -ctx.measureText(texts[j]).width / 2, j * lineHeight)
              }
            }
          } else if (text.indexOf('M') === -1 && text.length > 6) { // 奖品名称长度超过一定范围
            text = text.substring(0, 6) + '||' + text.substring(6)
            let texts = text.split('||')
            for (let j = 0; j < texts.length; j++) {
              ctx.fillText(texts[j], -ctx.measureText(texts[j]).width / 2, j * lineHeight)
            }
          } else {
            // 在画布上绘制填色的文本。文本的默认颜色是黑色
            // measureText()方法返回包含一个对象，该对象包含以像素计的指定字体宽度
            ctx.fillText(text, -ctx.measureText(text).width / 2, 0)
          }

          // 添加对应图标
          if (text.indexOf('分') > 0) {
            let img = document.getElementById('fen-img')
            img.onload = function () {
              ctx.drawImage(img, -15, 10)
            }
            ctx.drawImage(img, -15, 10)
          } else if (text.indexOf('足疗') >= 0) {
            let img = document.getElementById('zuliao-img')
            img.onload = function () {
              ctx.drawImage(img, -15, 10)
            }
            ctx.drawImage(img, -15, 10)
          } else if (text.indexOf('保温') >= 0) {
            let img = document.getElementById('baowen-img')
            img.onload = function () {
              ctx.drawImage(img, -15, 10)
            }
            ctx.drawImage(img, -15, 10)
          } else if (text.indexOf('电熨斗') >= 0) {
            let img = document.getElementById('yundou-img')
            img.onload = function () {
              ctx.drawImage(img, -15, 10)
            }
            ctx.drawImage(img, -15, 10)
          } else if (text.indexOf('橄榄') >= 0) {
            let img = document.getElementById('ganlan-img')
            img.onload = function () {
              ctx.drawImage(img, -15, 10)
            }
            ctx.drawImage(img, -15, 10)
          } else if (text.indexOf('雨伞') >= 0) {
            let img = document.getElementById('yusan-img')
            img.onload = function () {
              ctx.drawImage(img, -15, 10)
            }
            ctx.drawImage(img, -15, 10)
          }

          // 把当前画布返回（调整）到上一个save()状态之前
          ctx.restore()
          // ----绘制奖品结束----
        }
      }
    }
  },
  mounted () {
    this._getInitData()
    // 判断是否已绑定手机
    const tokenId = window.localStorage.getItem('randomId')
    if (tokenId == null || tokenId === '' || tokenId === 'null' || tokenId === 'NULL' || tokenId === undefined || tokenId === 'undefined') {
      this.isLogin = false
      this.isShowBgDialog = true
    } else {
      this.isLogin = true
      this.isShowBgDialog = false
      this.tokenId = tokenId
      this._getLotteryTime(this.tokenId)
    }
  }
}
</script>

<style scoped>
    @import "./assets/scss/lottery.scss";
</style>
