<template>
  <div class="progress" ref="progress">
    <div class="drag" ref="drag"
    :style="{position: 'absolute',left: 'calc('+ currentTime +'% - 0.135rem)'}"
    @touchmove.prevent="touchMove">
      <span></span>
    </div>
    <i class="iconfont jiazai"></i>
    <p class="line-b"></p>
    <p class="current" :style="{width: currentTime + '%'}"></p>
  </div>
</template>
<script>
export default {
  props: {
    currentTime: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      progressRate: 20
    }
  },
  methods: {
    touchMove (e) {
      const pageX = e.touches[0].pageX // 距离屏幕左边的距离
      const progressLeft = this.$refs.progress.getBoundingClientRect().left // 整个滚动条距离页面左边的距离
      this.progressRate = (pageX - progressLeft) / this.$refs.progress.clientWidth * 100 // 拖动的点距离滚动条左边的距离百分比
      if (this.progressRate <= 0) { // 超出左边就为0%
        this.progressRate = 0
      } else if (this.progressRate >= 100) { // 超出右边就为100%
        this.progressRate = 100
      }
      this.$emit('change', this.progressRate)
    }
  }
}
</script>

<style lang="scss" scoped>
.progress{
  width: 100%;height: 0.27rem;position: relative;
}
.line-b{
  width: 100%;height: 0.03rem;background-color: #999;position: absolute;left: 0;border-radius: 0.01rem;top:0;bottom: 0;margin: auto;z-index: 1;
}
.drag{
  width: 0.27rem;height: 0.27rem;background-color: #fff;border-radius: 50%;z-index: 3;
  position: relative;
  span{
    width: 0.07rem;height: 0.07rem;background-color: #d44439;position: absolute;left: 0;right: 0;top: 0;bottom: 0;margin: auto;display: block;
    border-radius: 50%;
  }
}
.current{
  height: 0.03rem;background-color: #d44439;position: absolute;left: 0;border-radius: 0.01rem;top:0;bottom: 0;margin: auto;z-index: 2;
}
</style>
