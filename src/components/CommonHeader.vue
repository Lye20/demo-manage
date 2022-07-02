<template>
  <div class="header .clearfix">
    <el-dropdown trigger="click" @command='handleCommand'>
      <el-button plain >
        <img :src="userProfile">
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>个人中心</el-dropdown-item>
        <el-dropdown-item :command='logOut'>退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
  import {resetRouter} from "../router"
  export default {
    name: 'MainHeader',
    data(){
      return {
        userProfile: require("../assets/images/bg.jpeg"),
      }
    },
    methods:{
      logOut(){
        this.$store.commit("login/REMOVE_TOKEN")
        this.$store.commit("routes/REMOVE_DYNAMIC_ROUTES")
        this.$router.replace({name:"login"})
        resetRouter()
      },
      handleCommand(callback){
        callback()
      },
    },
    mounted(){
      this.userProfile = this.$store.state.login.profile
    }
  }
</script>

<style lang="stylus" scoped>
  .header
    position relative
    height 80px
    background-color #3f3f3f
    .el-dropdown
      position absolute
      top 0
      bottom 0
      right 20px
      height 64px
      width @height
      border-radius 10px
      margin auto
      overflow hidden
      .el-button
        padding 0
        border 0
        img
          width 100%
  
  .el-dropdown-menu
    border 1px solid #333
    background-color #3f3f3f
    .el-dropdown-menu__item
      color #fff
      &:hover 
        color skyblue
        background-color #222
    >>>.popper__arrow
      border none
      &::after
        border-bottom-color #3f3f3f !important
</style>