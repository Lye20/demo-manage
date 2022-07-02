<template>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="注册日期" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="id" label="编号" width="180"></el-table-column>
      <el-table-column prop="gender" label="性别" width="180"></el-table-column>
      <el-table-column prop="age" label="年龄" width="180"></el-table-column>
      <el-table-column prop="jobTitle" label="职务" width="180"></el-table-column>
      <el-table-column prop="address" label="住址"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: 'AdminsPage',
  data() {
    return {
      tableData: [{
        date: '2016-05-02',
        name: 'tom',
        id: "201605029932",
        gender: "男",
        age: "35",
        address: '上海市普陀区金沙江路 1518 弄',
        jobTitle: "高级管理员"
      }, 
      {
        date: '2016-05-04',
        name: 'jerry',
        id: "201605047747",
        gender: "男",
        age: "25",
        address: '上海市普陀区金沙江路 1517 弄',
        jobTitle: "普通管理员"
      }]
    }
  },
  methods: {
    handleDelete(row) {
      this.tableData = this.tableData.filter(item => item.id !== row.id)
    }
  }
}
</script>

<style>

</style>