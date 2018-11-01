<template>
  <div class="login">
    <img src="~@/assets/images/logo.jpg" class="logo" alt="">
    <div class="form">
      <van-field type="tel" v-model="loginData.phone" :clearable="true" placeholder="请输入手机号" :error-message="errMessage.phone" label="手机号：" @blur="onblur" />
      <van-field type="password" v-model="loginData.password" :clearable="true" placeholder="请输入密码" :error-message="errMessage.password" label="密码："  />
    </div>
    <van-button type="danger" class="loginBtn" @click="login">登录</van-button>
  </div>
</template>
<script>
import { Field, Button } from 'vant'
import { phoneNumber } from '@/util/check'
import Cookies from 'js-cookie'
import { mapActions } from 'vuex'
export default {
  components: {
    [Field.name]: Field,
    [Button.name]: Button
  },
  data () {
    return {
      loginData: { // 登录信息
        phone: '',
        password: ''
      },
      errMessage: {
        phone: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapActions(['getplaylist']),
    /**
     * 手机号输入框失去焦点判断是否是手机号
     */
    onblur () {
      if (phoneNumber(this.loginData.phone)) {
        this.errMessage.phone = ''
      } else {
        this.errMessage.phone = '手机号码格式不正确'
      }
    },
    /**
     * 登录
     */
    async login () {
      if (this.loginData.phone === '') {
        this.errMessage.phone = '请输入手机号'
        return
      }
      if (this.loginData.password === '') {
        this.errMessage.password = '请输入密码'
        return
      } else {
        this.errMessage.password = ''
      }
      const params = {
        urlCode: 'CD010',
        phone: this.loginData.phone,
        password: this.loginData.password
      }
      const res = await this.$axios(params)
      Cookies.set('uid', res.account.id)
      Cookies.set('loginStatus', true)
      // 登陆成功获取我的歌单列表
      this.getplaylist()
      this.$router.push('/mine')
    }
  }
}
</script>
<style lang="scss" scoped>
.login{
  width: 100%;overflow: hidden;
}
.logo{
  width: 50vw;display: block;margin: 0 auto 0.5rem;
}
.van-cell{
  width: 100%;
}
.form{
  width: 90vw;margin: 0 auto;
}
.loginBtn{
  width: 90%;margin: 0.5rem auto;display: block;border-radius: 0.1rem;
}
</style>

