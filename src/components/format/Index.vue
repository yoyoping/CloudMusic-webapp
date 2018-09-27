<template>
	<span>{{time}}</span>
</template>

<script>
export default {
  props: {
    count: {
      type: Number,
      default: 0
    }
  },
  computed: {
    // 将时间戳转换成 00：00：00 格式
    time () {
      let hour = parseInt(this.count / 3600)
      let minute = parseInt((this.count - (hour * 3600)) / 60)
      let second = this.count % 60
      hour = hour < 10 ? '0' + hour : hour
      minute = minute < 10 ? '0' + minute : minute
      second = second < 10 ? '0' + second : second
      if (this.count <= 0) {
        return '00:00'
      } else if (this.count < 3600) {
        return minute + ':' + second
      }
      return hour + ':' + minute + ':' + second
    }
  }
}
</script>
