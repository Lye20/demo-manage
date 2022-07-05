<template>
  <el-container class="goods-container">
    <el-header class="goods-header">
      <input class="header-input" v-model.trim="inp" @keydown.enter="search($event)" placeholder="请输入内容">
      <div class="header-buttons">
        <el-button type="primary" @click="search">搜 索</el-button>
        <el-button type="primary" @click="reset">重 置</el-button>
      </div>
      <div class="keywords-box">
        <el-tag size="medium" v-for="kw in keywords" :key="kw" closable @close='delKeyword(kw)'>{{kw}}</el-tag>
      </div>
    </el-header>
    <el-main class="goods-main">  
      <el-table class="goods-table" ref="multipleTable" :data="showTableData" tooltip-effect="dark" :default-sort="{prop: 'id'}" height="100%" @selection-change="handleSelectionChange" :select-on-indeterminate="false" highlight-current-row>
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="id" label="ID" width="135px"></el-table-column>
        <el-table-column prop="name" label="名称" show-overflow-tooltip></el-table-column>
        <el-table-column prop="item" label="项目" width="120px"></el-table-column>
        <el-table-column prop="price" label="价格" width="100px" ></el-table-column>
        <el-table-column prop="number" label="数量" width="80px">
        </el-table-column>
        <el-table-column prop="category" label="类别" width="100px"></el-table-column>
        <el-table-column label="图片" width="70px">
          <template slot-scope="scope"><img :src="scope.row.img" style="width: 100%"></template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100px">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="edit(scope.row)">编辑</el-button>
            <el-button type="text" size="small" @click="delItem(scope.row)">下架</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-footer class="goods-footer">
      <div class="table-buttons" style="margin-top: 20px">
        <el-button type="info" @click="clearSelection">取消选择</el-button>
        <el-button type="danger" @click="del">下架选中商品</el-button>
        <el-button type="warning" @click="add">上架商品</el-button>
      </div>
      <el-dialog class="good-dialog" :title="formMode" :visible.sync="goodFormVisible">
        <el-form :model="goodForm" :rules="goodFormRules" ref="goodForm">
          <el-form-item label="名称" prop="name">
            <el-input v-model.trim="goodForm.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="项目" prop="item">
            <el-input v-model.trim="goodForm.item" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="价格" prop="price">
            <el-input v-model.trim="goodForm.price" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label='数量' prop="number">
            <el-input v-model="goodForm.number" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="类别" prop="category">
            <el-select v-model.trim="goodForm.category" placeholder="请选择类别">
              <el-option label="computer" value="computer"></el-option>
              <el-option label="book" value="book"></el-option>
              <el-option label="phone" value="phone"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="图片" prop="img">
            <el-upload action :http-request="()=>{}" :on-change="uploadImg" :show-file-list="false">
              <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
              <img :src="goodForm.img" alt="" style="vertical-align: top; margin: 5px; width:150px">
            </el-upload>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="submitForm">确 定</el-button>
        </div>
      </el-dialog>
      <el-pagination class="goods-pagination" :current-page.sync="currentPage" :page-size="pageSize" :total="tableData.length" layout="prev, pager, next, jumper" hide-on-single-page></el-pagination>
    </el-footer>
  </el-container>
</template>

<script>
  import { requestGoods, addGood, deleteGood, editGood } from "@/api"
  import day from "dayjs"
  export default {
    name: 'GoodsPage',
    data(){
      return {
        inp: '',
        keywords: [],
        currentPage: 1,
        pageSize: 10,
        goodsData: [],
        multipleSelection: [],
        allSelection: [],
        goodFormVisible: false,
        goodForm: {},
        goodFormRules: {
          name: [{required:true, message: "请输入名称", trigger: "blur"}],
          item: [{required:true, message: "请输入项目", trigger: "blur"}],
          price: [{required:true, message: "请输入价格", trigger: "blur"}],
          number: [{required:true, message: "请输入数量", trigger: "blur"}],
          category: [{required:true, message: "请选择类别", trigger: "blur"}],
          img: [{required:true, message: "请上传图片"}]
        },
        formMode: "",
      }  
    },
    computed:{
      tableData(){
        let temp = this.goodsData
        this.keywords.forEach(keyword => {
          temp = temp.filter(item=>item.name.indexOf(keyword)!==-1)
        })
        return temp
      },
      showTableData(){
        return this.tableData.slice((this.currentPage-1)*this.pageSize, this.currentPage*this.pageSize)
      }
    },
    methods: {
      keepSelected(oldItem){
        oldItem = new Set(oldItem)
        this.allSelection = [...this.allSelection.filter(item=>!oldItem.has(item)), ...this.multipleSelection]
        this.$nextTick(()=>{
          this.showTableData.forEach(item=>{
            (new Set(this.allSelection)).has(item) && this.$refs.multipleTable.toggleRowSelection(item, true)
          })
        })
      },
      jumpHead(){
        this.$nextTick(()=>this.currentPage = 1)
      },
      jumpTail(){
        this.$nextTick(()=>this.currentPage = Math.ceil(this.tableData.length/this.pageSize))
      },
      uploadImg(file){
        let reader = new FileReader()
        reader.onload = (event=>{
          const total = event.total
          const result = event.target.result
          if (!/^data:image\/jpeg;base64,/.test(result)) alert("仅支持jpg格式图片")
          else if (total / 1024 > 40) alert("图片不能大于40kB")
          else this.goodForm.img = result
          })
        reader.readAsDataURL(file.raw)
      },
      submitForm(){
        this.$refs.goodForm.validate((result)=> {
          if (result) {
            if (this.formMode === "上架商品") {
              addGood({...this.goodForm}).then(response=>{
                if (response.data.code !== 200) return Promise.reject(response.data.message)
                alert(response.data.message)
                this.getData()
                this.jumpTail()
              }).catch(err=>alert(err))
            } else {
              editGood({...this.goodForm}).then(response=>{
                if (response.data.code !== 200) return Promise.reject(response.data.message)
                alert(response.data.message)
                this.getData()
              }).catch(err=>alert(err))
            }
            this.goodFormVisible = false
          }
        })
      },
      add(){
        this.formMode = "上架商品"
        this.goodForm = {id:day(Date()).format("YYYYMMDDHHmmss"), name: "", item: "", img: "", price: "", number: "", category: ""}
        this.goodFormVisible = true
      },
      delItem(item){
        deleteGood(item.id).then(response=>{
          if (response.data.code !== 200) return Promise.reject(response.data.message)
          this.getData()
        }).catch(err=>alert(err))
      },
      async del(){
        this.keepSelected()
        for (let item of this.allSelection) {
          let response = await deleteGood(item.id)
          if (response.data.code !== 200) {
            alert(`${item.id}下架失败`)
          }
        }
        this.allSelection = []
        this.multipleSelection = []
        this.getData()
      },
      search(){
        this.inp && this.keywords.push(this.inp)
        this.keywords = [...new Set(this.keywords)]
        this.inp = ""
        this.jumpHead()
      },
      delKeyword(keyword){
        this.keywords = this.keywords.filter(item=>item !== keyword)
        this.jumpHead()
      },
      edit(rowData){
        this.formMode = "编辑商品"
        this.goodForm = {...rowData}
        this.goodFormVisible = true
      },
      reset(){
        this.keywords = []
        this.$refs.multipleTable.clearSelection()
        this.$refs.multipleTable.clearSort()
        this.allSelection = []
        this.jumpHead()
      },
      clearSelection() {
        this.$refs.multipleTable.clearSelection();
        this.allSelection = []
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      getData(){
        requestGoods().then(response=>{
          if (response.data.code !== 200) return Promise.reject()
          this.goodsData = response.data.data
        }).catch(err=>(console.log(err)))
      },
      cancel(){
        this.goodFormVisible = false
        this.$refs.goodForm.resetFields()
      }
    },
    watch: {
      showTableData(newItem, oldItem){
        this.keepSelected(oldItem)
      }
    },
    mounted(){
      this.getData()
    }
  }
</script>

<style lang="stylus" scoped>
  .goods-container
    height 97% !important
    .goods-header
      height 80px !important
      .header-input
        box-sizing border-box
        float left
        height 40px
        width calc(100% - 180px)
        padding 0 20px
        border 1px #777 solid
        border-radius 10px
        &:focus
          border 1px skyblue solid
          outline 1px skyblue solid
      .header-buttons
        float right
        width 160px
        margin-left 10px
      .keywords-box
        margin-top 45px
        .el-tag
          margin 5px
    .goods-main
      padding-top 0
    .goods-footer
      text-align center
      .table-buttons
        width 100%
        height 40px
        margin 0 !important
        .el-button
          float left
          &:nth-child(3)
            float right
      .good-dialog
        text-align left 
      .goods-pagination
        display inline-block
  .alert 
    position fixed
    width 630rpx
    border-radius 16px
    top 50%
    left 50%
    transform translate(-50%, -50%)
</style>