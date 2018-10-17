<template>
  <div class="mine">
    <div class="info">
      <p class="mark"></p>
      <div class="top">
        <img src="~@/assets/images/logo.jpg" class="avatar" alt="">
        <h1>张三</h1>
        <p class="fan">
          <span>关注 5</span>
          <span>粉丝 5</span>
        </p>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.info{
  width: 100%;height: 47vh;background: url('~@/assets/images/default.png') no-repeat;background-size: 103% 103%;
  background-position: 50% 50%;box-sizing: border-box;padding: 0.9rem 5vw 0;text-align: center;position: relative;
  .avatar{
    width: 1.5rem;height: 1.5rem;border-radius: 50%;
  }
  .mark{
    background-color: rgba(0,0,0,0.1);position: absolute;left: 0;top: 0;z-index: 0;width: 100%;height: 100%;
  }
  .top{
    position: relative;z-index: 2;color: #fff;
  }
  h1{
    font-size: 0.4rem;font-weight: bold;margin-top: 0.1rem;
  }
  .fan{
    margin-top: 0.1rem;text-align: center;color: #eee;font-size: 0.25rem;
    span{
      display: inline-block;height: 0.25rem;line-height: 0.25rem;
    }
    span:nth-of-type(1){
      padding-right: 0.2rem;margin-right: 0.2rem;border-right: 0.01rem solid #999;
    }
  }
}
</style>

