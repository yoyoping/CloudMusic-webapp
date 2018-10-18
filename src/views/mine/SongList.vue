<template>
  <div>
    <div class="cls">
      <h2>歌单(10)</h2>
      <ul>
        <li>
          <img src="~@/assets/images/default.png" alt="">
          <dl>
            <dt>歌单名字</dt>
            <dd>10首，播放20次</dd>
          </dl>
        </li>
        <li>
          <img src="~@/assets/images/default.png" alt="">
          <dl>
            <dt>歌单名字</dt>
            <dd>10首，播放20次</dd>
          </dl>
        </li>
        <li>
          <img src="~@/assets/images/default.png" alt="">
          <dl>
            <dt>歌单名字</dt>
            <dd>10首，播放20次</dd>
          </dl>
        </li>
        <li>
          <img src="~@/assets/images/default.png" alt="">
          <dl>
            <dt>歌单名字</dt>
            <dd>10首，播放20次</dd>
          </dl>
        </li>
      </ul>
    </div>
    <div class="cls">
      <h2>收藏的歌单</h2>
      <ul>
        <li>
          <img src="~@/assets/images/default.png" alt="">
          <dl>
            <dt>歌单名字</dt>
            <dd>10首，播放20次</dd>
          </dl>
        </li>
        <li>
          <img src="~@/assets/images/default.png" alt="">
          <dl>
            <dt>歌单名字</dt>
            <dd>10首，播放20次</dd>
          </dl>
        </li>
        <li>
          <img src="~@/assets/images/default.png" alt="">
          <dl>
            <dt>歌单名字</dt>
            <dd>10首，播放20次</dd>
          </dl>
        </li>
        <li>
          <img src="~@/assets/images/default.png" alt="">
          <dl>
            <dt>歌单名字</dt>
            <dd>10首，播放20次</dd>
          </dl>
        </li>
      </ul>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.cls{
  h2{
    height: 0.5rem;padding-left: 0.2rem;font-size: 0.23rem;background-color: #eee;color: #888;line-height: 0.5rem;
  }
  ul{
    width: 100%;padding: 0 2vw;
  }
  li{
    display: flex;justify-content: space-between;height: 14vw;margin: 0.1rem 0;
    img{
      width: 14vw;height: 14vw;border-radius: 0.2rem;
    }
    dl{
      width: 78vw;height: 100%;padding: 0;margin: 0;padding-top: 0.1rem;border-bottom: 0.01rem solid #eee;
      dd{
        margin: 0;color: #888;font-size: 0.2rem;
      }
      dt{
        font-size: 0.3rem;
      }
    }
  }
}
</style>

