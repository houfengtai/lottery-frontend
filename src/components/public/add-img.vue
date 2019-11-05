<template>
    <div class="add-box" ref='remove' @touchstart='touchStart' @touchmove='touchMove' @touchend='touchEnd' :style="slideEffect">
        <img ref='btnImg' src="/add.svg">
    </div>
</template>

<script>
export default {
  name: 'add-img',
  data () {
    return {
      timeOutEvent: 0, // 定时器
      startX: 0, // 开始触摸的位置
      moveX: 0, // 滑动时的位置
      endX: 0, // 结束触摸的位置
      moveY: 0, // 滑动时的位置
      endY: 0, // 结束触摸的位置
      disX: 0, // 移动距离
      slideEffect: '' // 滑动时的效果,使用v-bind:style="deleteSlider"
    }
  },
  props: ['url'],
  methods: {
    touchStart: function (ev) {
      ev = ev || event
      ev.preventDefault()
      if (ev.touches.length === 1) { // tounches类数组，等于1时表示此时有只有一只手指在触摸屏幕
        this.startX = ev.touches[0].clientX // 记录开始位置
        // eslint-disable-next-line no-implied-eval
        this.timeOutEvent = setTimeout(() => this._move(), 500)
      }
    },
    touchMove: function (ev) {
      ev = ev || event
      ev.preventDefault()
      clearTimeout(this.timeOutEvent)
      this.timeOutEvent = 0
      if (ev.touches.length === 1) {
        // 滑动时距离浏览器左侧的距离
        this.moveX = ev.touches[0].clientX
        // 滑动时距离浏览器顶部的距离
        this.moveY = ev.touches[0].clientY

        // 实时的滑动的距离-起始位置=实时移动的位置
        this.disX = this.moveX - this.startX
        this.slideEffect = `left: ${this.moveX}px; top: ${this.moveY}px;`
      }
    },
    touchEnd: function (ev) {
      ev = ev || event
      ev.preventDefault()
      if (ev.changedTouches.length === 1) {
        // 滑动时距离浏览器左侧的距离
        this.moveX = ev.changedTouches[0].clientX
        // 滑动时距离浏览器顶部的距离
        this.moveY = ev.changedTouches[0].clientY
        if (this.timeOutEvent !== 0) {
          this.$router.push({ path: this.url })
        }
      }
    },
    _move () {
      this.timeOutEvent = 0
    }
  }
}
</script>

<style scoped>
.add-box{position: fixed;right:10px;bottom:85px;border-radius: 50%;width:40px;height:40px;}
.add-box img{width:40px;height:40px;}
</style>
