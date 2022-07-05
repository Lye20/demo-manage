<template>
  <div class="header .clearfix">
    <el-dropdown trigger="click" @command='handleCommand'>
      <el-button plain >
        <img :src="this.infoForm.profile">
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item :command="showInfoForm">修改资料</el-dropdown-item>
        <el-dropdown-item :command="showPwdForm">修改密码</el-dropdown-item>
        <el-dropdown-item :command='logOut'>退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
   <el-dialog title="个人资料" :visible.sync="infoFormVisible">
     <el-form :model="newInfo" ref="infoForm" :rules="infoFormRules">
        <el-form-item label='电话' prop="phoneNumber">
          <el-input v-model.number="newInfo.phoneNumber" autocomplete="off"></el-input>
        </el-form-item>
       <el-form-item label="年龄">
          <el-input v-model.number.trim="newInfo.age" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model.trim="newInfo.gender" placeholder="请选择类别">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="头像" prop="profile">
          <el-upload action :http-request="()=>{}" :on-change="uploadImg" :show-file-list="false">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <img :src="newInfo.profile" alt="" style="vertical-align: top; margin: 5px; width:150px">
          </el-upload>
        </el-form-item>
      </el-form>
     <div slot="footer" class="dialog-footer">
        <el-button @click="cancelInfoForm">取 消</el-button>
        <el-button type="primary" @click="submitInfo">确 定</el-button>
      </div>
    </el-dialog>
   <el-dialog title="修改密码" :visible.sync="pwdFormVisible">
    <el-form :model="pwdForm" ref="pwdForm" :rules="pwdFormRules">
      <el-form-item label='新密码' prop="pwd">
        <el-input type="password" v-model="pwdForm.pwd" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label='确认密码' prop="confirmPwd">
        <el-input type="password" v-model="pwdForm.confirmPwd" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
      <div slot="footer" class="dialog-footer">
       <el-button @click="cancelPwdForm">取 消</el-button>
       <el-button type="primary" @click="submitPwd">确 定</el-button>
     </div>
    </el-dialog>
  </div>
</template>

<script>
  import {requestInfo, updateInfo, changePassword} from "@/api"
  import {resetRouter} from "../router"
  export default {
    name: 'MainHeader',
    data(){
      let checkPhone = (rule, value, callback)=>{
        console.log(!/^\d{11}$/.test(value))
        if (!/^\d{11}$/.test(value)) callback(new Error("手机号码有误"))
        else callback()
      }
      let checkPwd = (rule, value, callback)=>{
        if (value !== this.pwdForm.pwd) callback(new Error("两次输入的密码不一致"))
        else callback()
      }
      return {
        infoForm: {},
        newInfo: {},
        pwdForm: {},
        infoFormVisible: false,
        infoFormRules: {
          phoneNumber: [
            {required: true, message:"请输入手机号", trigger: "blur"},
            {validator: checkPhone, trigger: "blur"}
          ],
          profile: [{required:true, message: "请上传头像", trigger: "blur"}],
        },
        pwdFormVisible: false,
        pwdFormRules: {
          pwd: [{required:true, message: "请输入密码", trigger: "blur"}],
          confirmPwd: [
            {required:true, message: "请确认密码", trigger: "blur"},
            {validator: checkPwd, trigger: "blur"}
          ],
        }
      }
    },
    methods:{
      showInfoForm(){
        this.newInfo = {...this.infoForm}
        this.infoFormVisible = true
      },
      showPwdForm(){
        this.pwdForm = {pwd:"", confirmPwd:""}
        this.pwdFormVisible = true
      },
      uploadImg(file){
        let reader = new FileReader()
        reader.onload = (event=>{
          const total = event.total
          const result = event.target.result
          if (!/^data:image\/jpeg;base64,/.test(result)) alert("仅支持jpg格式图片")
          else if (total / 1024 > 40) alert("图片不能大于40kB")
          else this.newInfo.profile = result
          })
        reader.readAsDataURL(file.raw)
      },
      submitInfo(){
        this.$refs.infoForm.validate(result=> {
          if (result) {
            updateInfo(this.newInfo).then(response=>{
              if (response.data.code !== 200) return Promise.reject(response.data.message)
              alert(response.data.message)
              this.infoFormVisible = false
              this.getInfo()
            }).catch(err=>alert(err))
          }
        })
      },
      submitPwd(){
        this.$refs.pwdForm.validate(result=> {
          if (result) {
            changePassword(this.pwdForm.pwd).then(response=>{
              if (response.data.code !== 200) return Promise.reject(response.data.message)
              alert(response.data.message)
              this.pwdFormVisible = false
              this.getInfo()
            }).catch(err=>alert(err))
          }
        })
      },
      logOut(){
        this.$store.commit("REMOVE_TOKEN")
        this.$store.commit("REMOVE_DYNAMIC_ROUTES")
        this.$router.replace({name:"login"})
        resetRouter()
      },
      handleCommand(callback){
        callback()
      },
      getInfo(){
        requestInfo().then(response=>{
          if (response.data.code !== 200) return Promise.reject(response.data.message)
          this.infoForm = response.data.data
        })
      },
      cancelPwdForm(){
        this.pwdFormVisible =  false
        this.$refs.pwdForm.resetFields()
      },
      cancelInfoForm(){
        this.infoFormVisible = false
        this.$refs.infoForm.resetFields()        
      }
    },
    mounted(){
      this.getInfo()
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
      width 60px
      color #fff
      text-align center
      &:hover 
        color gold
        background-color #222
      input 
        &:hover
          cursor pointer
    >>>.popper__arrow
      border none
      &::after
        border-bottom-color #3f3f3f !important
  >>>.el-dialog
    width 500px
</style>