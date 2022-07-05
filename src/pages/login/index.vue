<template>
  <div class="body" @keydown.enter="submitForm">
    <el-card class="loginCard">
        <h1>后台管理系统</h1>
        <el-form ref="loginForm" :model="loginForm" :rules="loginFormRules" label-width="100px" hide-required-asterisk>
          <el-form-item label="账号" prop="account" >
            <el-input autocomplete="off" v-model="loginForm.account"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="loginForm.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item class="button-item">
            <el-button type="primary" @click="submitForm">登 录</el-button>
          </el-form-item>
        </el-form>
    </el-card>
  </div>
</template>

<script>
import {loginRequest} from "@/api"
export default {
  name: "LoginPage",
  data(){
    return {
      loginForm: {
        account: "",
        password: ""
      },
      loginFormRules:{
        account: [{required: true, message: "请输入账号", trigger: "blur"}],
        password: [{required: true, message: "请输入密码", trigger: "blur"}]
      }
    }
  },
  methods: {
    submitForm(){
      this.$refs.loginForm.validate(result=>{
        if (result){
          this.sendRequest().catch(err=>alert(err))
        }
      })
    },
    async sendRequest(){
      const response = await loginRequest(this.loginForm)
      if (response.data.code !== 200) return Promise.reject(response.data.message)
      this.$store.commit("SET_TOKEN", response.data.token)
      this.$router.replace({name: "main"})
    }
  }
}
</script>

<style lang="stylus" scoped>
  .body
    width 100vw
    height 100vh
    background url("../../assets/images/bg.jpeg") no-repeat
    background-size cover
    .loginCard
      position relative
      top 40%
      left 50%
      width w=350px !important
      transform: translate(-50%, -50%)
      border-radius 15px
      box-shadow 5px 5px 15px #000
      h1
        width w-40px
        font-size 20px
        font-weight 700
        line-height 20px
        text-align center
        margin-bottom 20px
      .el-form
        width 243px
        margin 0 auto
        >>> .el-form-item__label
          width 40px !important
          padding 0
          text-align left
        >>> .el-form-item__content
          float left
          margin-left 0 !important
          .el-input__inner
            width 202px;
        .button-item
          margin 0 !important
          text-align center
          >>> .el-form-item__content
            float none
</style>