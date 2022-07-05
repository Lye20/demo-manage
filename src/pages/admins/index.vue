<template>
  <div class="adminsTable">
    <el-table :data="adminsData" style="width: 1500px">
       <el-table-column prop="signUpDate" label="注册日期" width="200"></el-table-column>
        <el-table-column prop="name" label="姓名" width="120"></el-table-column>
        <el-table-column prop="number" label="编号" width="180"></el-table-column>
        <el-table-column prop="gender" label="性别" width="120"></el-table-column>
        <el-table-column prop="age" label="年龄" width="120"></el-table-column>
        <el-table-column prop="position" label="职务" width="180"></el-table-column>
        <el-table-column prop="phoneNumber" label="联系电话" width="200"></el-table-column>
        <el-table-column prop="account" label="账号" width="200"></el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="handleRemove(scope.row)">移除</el-button>
            <el-button size="mini" type="danger" @click="handleReset(scope.row)">重置密码</el-button>
          </template>
        </el-table-column>
    </el-table>
    <el-form class="signUpRow" :model="newAdmins" ref="newAdmins" :rules="newAdminsRules" v-if="showSignUpRow">
      <label for="name">姓名:</label>
      <el-form-item prop="name">
        <el-input id="name" class="name" v-model="newAdmins.name" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item>
        <label style="font-size:16px">职务:</label>
        <el-radio v-model="newAdmins.position" label="generalStaff">generalStaff</el-radio>
        <el-radio v-model="newAdmins.position" label="seniorStaff">seniorStaff</el-radio>
      </el-form-item>
      <label for="phoneNumber">电话:</label>
      <el-form-item prop="phoneNumber">
        <el-input id="phoneNumber" class="phoneNumber" v-model.number="newAdmins.phoneNumber" placeholder="请输入电话"></el-input>
      </el-form-item>
      <label for="account">账号:</label>
      <el-form-item prop="account">
        <el-input id="account" class="account" v-model="newAdmins.account" placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-button type="primary" @click="sendRequest">确定</el-button>
      <el-button type="info" @click="cancel">取消</el-button>
    </el-form>
    <el-button class="addButton" type="primary" @click="initSignUp" v-if="!showSignUpRow"><i class="el-icon-circle-plus-outline"></i><span>新增管理员</span></el-button>
  </div>
</template>

<script>
  import {requestAdmins, signUpAdmin, removeAdmin, resetPassword} from "@/api"
  export default {
    name: 'AdminsPage',
    data() {
      let checkPhone = (rule, value, callback)=>{
        if (!/\d{11}/.test(value)) callback(new Error("电话号码有误"))
        else callback()
      }
      return {
        adminsData: [],
        showSignUpRow: false,
        newAdmins: {},
        newAdminsRules: {
          name: [{required:true, message: "请输入姓名", trigger: "blur"}],
          phoneNumber: [
            {required: true, message:"请输入电话", trigger: "blur"},
            {validator: checkPhone, trigger: "blur"}
          ],
          account: [{required:true, message: "请输入账号", trigger: "blur"}],
        }
      }
    },
    methods: {
      handleRemove(row) {
        removeAdmin(row.account).then(response=>{
          if (response.data.code !== 200) return Promise.reject(response.data.message)
          alert(response.data.message)
          this.getAdmins()
        }).catch(err=>alert(err))
      },
      handleReset(row) {
        resetPassword(row.account).then(response=>{
          if (response.data.code !== 200) return Promise.reject(response.data.message)
          alert(response.data.message)
          this.getAdmins()
        }).catch(err=>alert(err))
      },
      initSignUp(){
        this.showSignUpRow = true
        this.newAdmins = {
          name: "",
          position: "generalStaff",
          phoneNumber: "",
          account: ""
        }
      },
      sendRequest(){
        this.$refs.newAdmins.validate(result=> {
          if (result) {
            signUpAdmin(this.newAdmins).then(response=>{
              if (response.data.code !== 200) return Promise.reject(response.data.message)
              alert(response.data.message)
              this.showSignUpRow = false
              this.getAdmins()
            }).catch(err=>alert(err))
          }
        })
      },
      cancel(){
        this.showSignUpRow = false
      },
      getAdmins(){
        requestAdmins().then(response=>{
          if (response.data.code !== 200) return Promise.reject(response.data.message)
          this.adminsData = response.data.adminsList
        })
      }
    },
    mounted(){
      this.getAdmins()
    }
  }
</script>

<style lang="stylus" scoped>
  .adminsTable
    width 1500px
    margin 0 auto
    text-align center
    overflow hidden
    .signUpRow
      width 1200px
      height 40px
      line-height 40px
      margin 15px auto 0
      label
        float left
        line-height 40px
      .el-form-item
        float left
        padding 0 10px
        .el-radio
          margin-left 10px
          margin-right 0
          >>>.el-radio__label
            padding-left 5px
            font-size 16px
      .name
        width 150px
      .phoneNumber, .account
        width 200px
      button
        padding 0
        height 40px
        width 70px
        vertical-align center
  
    .addButton
      padding 0
      width 160px
      height 60px
      font-size 16px
      margin-top 15px
      i
        display block
        height 20px
        font-size 20px
        margin-bottom 5px
      span
        display block
        margin 0
        height 16px
        font-size 16px
</style>