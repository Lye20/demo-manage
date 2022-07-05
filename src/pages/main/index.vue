<template>
  <el-container class="main-container">
    <el-aside><Aside/></el-aside>
    <el-container>
      <el-header><Header/></el-header>
      <el-main><router-view></router-view></el-main>
    </el-container>
  </el-container>
</template>

<script>
import Aside from "@/components/CommonAside"
import Header from "@/components/CommonHeader"
import "../home"
export default {
  name: 'MainPage',
  components: {
    Aside,
    Header
  },
}
</script>

<style lang="stylus" scoped>
  .main-container
    height: 100vh
    min-width: 1280px

  .el-aside
    user-select: none
    width auto !important
    
  .el-header
    padding: 0
    height auto !important

  .el-main
    height auto !important
</style>