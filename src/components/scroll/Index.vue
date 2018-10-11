<template>
  <div class="wrapper" ref="wrapper" @click="$emit('switch')">
    <ul class="content">
      <li>111111111</li>
      <li>222222222</li>
      <li>222222222</li>
      <li>222222222</li>
      <li>222222222</li>
      <li>222222222</li>
      <li>222222222</li>
      <li>222222222</li>
      <li>222222222</li>
      <li>222222222</li>
      <li>222222222</li>
      <li>222222222</li>
      <li>222222222</li>
      <li>222222222</li>
      <li>222222222</li>
      <li>222222222</li>
      <li>222222222</li>
      <li>222222222</li>
      <li>222222222</li>
      <li>222222222</li>
      <li>222222222</li>
      <li>222222222</li>
      <li>222222222</li>
      <li>222222222</li>
      <li>222222222</li>
      <li>222222222</li>
      <li>222222222</li>
      <li>222222222</li>
      <li>222222222</li>
      <li>222222222</li>
      <li>222222222</li>
      <li>222222222</li>
      <li>222222222</li>
      <li>222222222</li>
      <li>222222222</li>
      <li>222222222</li>
      <li>222222222</li>
    </ul>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    props: {
      probeType: {
        type: Number,
        default: 1
      },
      click: {
        type: Boolean,
        default: true
      },
      listenScroll: {
        type: Boolean,
        default: false
      },
      object: {
        type: Object,
        default: null
      },
      data: {
        type: Array,
        default: null
      },
      string: {
        type: String,
        default: ''
      },
      pullup: {
        type: Boolean,
        default: false
      },
      beforeScroll: {
        type: Boolean,
        default: false
      },
      refreshDelay: {
        type: Number,
        default: 20
      }
    },
    mounted() {
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.rongqi, {
            click: true
          });
        } else {
          this.scroll.refresh();
        };
      })
    },
    methods: {
      _initScroll() {
        if (!this.$refs.wrapper) {
          return
        }
        debugger
        this.scroll = new BScroll(this.$refs.wrapper, {
          probeType: this.probeType,
          click: this.click
        })
        console.log(this.scroll)
        if (this.listenScroll) {
          let me = this
          // pos为位置参数
          this.scroll.on('scroll', (pos) => {
            me.$emit('scroll', pos)
          })
        }

        if (this.pullup) {
          this.scroll.on('scrollEnd', () => {
            if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
              this.$emit('scrollToEnd')
            }
          })
        }

        if (this.beforeScroll) {
          this.scroll.on('beforeScrollStart', () => {
            this.$emit('beforeScroll')
          })
        }
      },
      disable() {
        this.scroll && this.scroll.disable()
      },
      enable() {
        this.scroll && this.scroll.enable()
      },
      refresh() {
        this.scroll && this.scroll.refresh()
      },
      scrollTo() {
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
      },
      scrollToElement() {
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
      }
    },
    watch: {
      data() {
        setTimeout(() => {
          this.refresh()
        }, this.refreshDelay)
      },
      string() {
        setTimeout(() => {
          this.refresh()
        }, this.refreshDelay)
      },
      object() {
        setTimeout(() => {
          this.refresh()
        }, this.refreshDelay)
      }
    }
  }
</script>
<style lang="scss" scoped>
.wrapper{
  height: 50vh;overflow: auto;
}
</style>