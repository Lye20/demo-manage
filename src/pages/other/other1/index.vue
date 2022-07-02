<template>
  <div><el-button @click="test($event)">测试</el-button></div>
</template>

<script>
export default {
  name: "OtherPage1",
  methods:{
    test(e){
      console.log(e)
    }
  }
}
</script>

<style>

</style>