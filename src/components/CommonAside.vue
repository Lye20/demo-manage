<template>
  <el-menu :default-active="$route.name" class="el-menu-vertical-demo" :collapse="isCollapse" background-color="#333" text-color="#fff">
    <el-button plain icon="el-icon-menu" @click="changeCollapse"></el-button>
    <el-menu-item v-for="nav of mainNavList" :index="nav.name" :key="nav.name" @click="goTo(nav.name)">       
        <i :class="nav.meta.icon" ></i>
        <span>{{nav.meta.title}}</span>
    </el-menu-item>

    <el-submenu v-for="nav of otherNavList" :index="nav.meta.title" :key="nav.meta.icon">
      <template slot="title">
        <i :class="nav.meta.icon"></i>
        <span>{{nav.meta.title}}</span>
      </template>
      <el-menu-item class="other-item" v-for="subNav of nav.children" :index="subNav.name" :key="subNav.name" @click="goTo(subNav.name)">        
          <i :class="subNav.meta.icon" ></i>
          <span>{{subNav.meta.title}}</span>
      </el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
  import { mapState } from "vuex"
  export default {
    name: 'MainAside',
    data(){
      return {
        isCollapse: false,
      }
    },
    computed: {
      ...mapState(["dynamicRoutes"]),
      mainNavList(){
        return this.dynamicRoutes.filter(item=>!item.children)
      },
      otherNavList(){
        return this.dynamicRoutes.filter(item=>item.children)
      }
    },
    methods: {
      goTo(route_name){
        this.$router.replace({
          name: route_name
        })
      },
      changeCollapse(){
        this.isCollapse = !this.isCollapse
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .el-menu-vertical-demo
    width 85px
    min-height 100%
    overflow hidden
    border-right black 1px solid
    &:not(.el-menu--collapse) 
      width 180px
      min-height 100%

    .el-button 
      display block
      padding: 0
      width w=30px
      height w
      margin 25px auto
      &:hover,&:focus
        border-color gold
        color gold
      >>>.el-icon-menu::before
        font-size (w/1.4)

    .el-menu-item, >>>.el-submenu__title
      height h=50px
      width 180px
      line-height h
      padding-left 26px !important
      text-align center
      span,i
        float left
        height h
        margin-right 15px
        line-height h
        font-size 16px
      i
        width 30px

      &.is-active
        background-color #222 !important
        color gold

    &.el-menu--collapse
      .el-submenu.is-active
        >>>.el-submenu__title
          background-color #222 !important
          i
            color gold !important

    >>>.el-submenu__icon-arrow
        margin-top: -23px
        margin-right: 0 !important

    .other-item
      padding-left 50px !important
 
  .el-menu--vertical
    .other-item
      &.is-active
        background-color #222 !important
        color gold
</style>