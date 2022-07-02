<template>
  <el-row ref="mainRow">
    <el-col :span="24/spanN">
      <el-card class="sales-line" shadow="hover">
        <div class="salesBarChart" ref="salesBarChart"></div>
      </el-card> 
      <el-row>
        <el-col :span="12">
          <el-card  class="sales-bar" shadow="hover">
            <div class="salesLineChart" ref="salesLineChart"></div>
          </el-card> 
        </el-col>
        <el-col :span="12">
          <el-card class="sales-pie" shadow="hover">
            <div class="salesPieChart" ref="salesPieChart"></div>
          </el-card> 
        </el-col>
      </el-row>
    </el-col>
    <el-col :span="24/homeData.length">
        <el-card class="staffs-line" shadow="hover">
          <div class="staffsLineChart" ref="staffsLineChart"></div>
        </el-card> 
        <el-card class="staffs-bar" shadow="hover">
          <div class="staffsBarChart" ref="staffsBarChart"></div>
        </el-card> 
    </el-col>
  </el-row>

</template>

<script>
import {loadHomeData} from "../../api/homeData"
import barChart from "../../echarts/BarChart"
import lineChart from "../../echarts/LineChart"
import pieChart from "../../echarts/PieChart"
export default {
  name: 'HomePage',
  data(){
    return {
      homeData: [],
      salesData: {},
      staffsData: {},
      chartList: []
    }
  },
  computed:{
    spanN(){
      return Object.keys(this.homeData).length
    }
  },
  methods: {
    resizeChart(){
      for (let chart of this.chartList) {
        chart.resize()
      }
    },
    initSalesData(){
      const keys = Object.keys(this.homeData.salesData.data)
      let temp = {category: this.homeData.salesData.category, date: keys, sales: {}, totalOrders: {}}
        this.homeData.salesData.category.forEach(category=>{
          temp.sales[category] = []
          temp.totalOrders[category] = []
      })
      keys.forEach(key=>{
        this.homeData.salesData.data[key].forEach(item=>{
          temp.sales[item.category].push(item.sales)
          temp.totalOrders[item.category].push(item.totalOrders)
        })
      })
      this.salesData = temp
    },
    initStaffsData(){
      const keys = Object.keys(this.homeData.staffsData.data)
      
      let temp = {name: this.homeData.staffsData.name, date: keys, onlineTime: {}, dpi: {}}
        this.homeData.staffsData.name.forEach(name=>{
          temp.onlineTime[name] = []
          temp.dpi[name] = []
      })
      keys.forEach(key=>{
        this.homeData.staffsData.data[key].forEach(item=>{
          temp.onlineTime[item.name].push(item.onlineTime)
          temp.dpi[item.name].push(item.dpi)
        })
      })
      this.staffsData = temp
    },
    mountedSalesLineChart(){
      const series = []
      this.salesData.category.forEach(name=>{
        series.push({name, type: "line", data: this.salesData.sales[name]})
      })
      const option = {
        title: {text: '销售额'},
        tooltip: {trigger: 'axis', axisPointer: { type: 'shadow'}},
        legend: {},
        grid: {left: '3%', right: '4%', bottom: '3%', containLabel: true},
        xAxis: {type: "category", boundaryGap: false, data: this.salesData.date},
        yAxis: {type: "value"},
        series
      }
      this.chartList.push(lineChart(option, this.$refs.salesLineChart))
    },
    
    mountedSalesBarChart(){
      const series = []
      this.salesData.category.forEach(name=>{
        series.push({name, type: "bar", data: this.salesData.totalOrders[name]})
      })
      const option = {
        title: {text: '订单量'},
        tooltip: {trigger: 'axis', axisPointer: { type: 'shadow'}},
        legend: {},
        grid: {left: '3%', right: '4%', bottom: '3%', containLabel: true},
        xAxis: {type: "category", data: this.salesData.date},
        yAxis: {type: "value", boundaryGap: [0, 0.01]},
        series
      }
      this.chartList.push(barChart(option, this.$refs.salesBarChart))
    },

    mountedSalesPieChart(){
      const series = [{
        type: "pie",
        radius: '70%',
        data: this.salesData.category.map(name=>{
          const totalSales = Math.floor(this.salesData.sales[name].reduce((a,b)=>{return a+b}, 0) * 100) / 100
          return {name, value: totalSales}
        }),
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }]
      const option = {
        title: {text: '销售额占比'},
        tooltip: {trigger: 'item'},
        legend: {},
        grid: {left: '3%', right: '4%', bottom: '3%', containLabel: true},
        series
      }
      this.chartList.push(pieChart(option, this.$refs.salesPieChart))
    },
    mountedStaffsLineChart(){
      const series = []
      this.staffsData.name.forEach(name=>{
        series.push({name, type: "line", data: this.staffsData.onlineTime[name]})
      })
      const option = {
        title: {text: '销售额'},
        tooltip: {trigger: 'axis', axisPointer: { type: 'shadow'}},
        legend: {},
        grid: {left: '3%', right: '4%', bottom: '3%', containLabel: true},
        xAxis: {type: "category", boundaryGap: false, data: this.staffsData.date},
        yAxis: {type: "value"},
        series
      }
      this.chartList.push(lineChart(option, this.$refs.staffsLineChart))
    },
    mountedStaffsBarChart(){
      const series = []
      this.staffsData.name.forEach(name=>{
        series.push({name, type: "bar", data: this.staffsData.dpi[name]})
      })
      const option = {
        title: {text: '订单量'},
        tooltip: {trigger: 'axis', axisPointer: { type: 'shadow'}},
        legend: {},
        grid: {left: '3%', right: '4%', bottom: '3%', containLabel: true},
        xAxis: {type: "category", data: this.staffsData.date},
        yAxis: {type: "value", boundaryGap: [0, 0.01]},
        series
      }
      this.chartList.push(barChart(option, this.$refs.staffsBarChart))
    },
  },
  mounted(){
    loadHomeData().then(response=>{
        this.homeData = response.data
        this.initSalesData()
        this.$nextTick(()=>{
          this.mountedSalesBarChart()
          this.mountedSalesLineChart()
          this.mountedSalesPieChart()
        })
        if (this.homeData.staffsData) {
          this.initStaffsData()
          this.$nextTick(()=>{
            this.mountedStaffsBarChart()
            this.mountedStaffsLineChart()
          })
        }
      }).catch(err=>{
        console.log(err)
      })
    window.onresize = ()=>{
      this.resizeChart()
    }
  }
}
</script>

<style lang="stylus" scoped>
  .sales-bar, .sales-line, .sales-pie
    border: 1px solid #ccc
    margin 0 20px 20px 0
    .salesBarChart, .salesLineChart, .salesPieChart
      width 100%
      height 450px

  .staffs-bar, .staffs-line
    border: 1px solid #ccc
    margin-bottom 20px
    .staffsBarChart, .staffsLineChart
      width 100%
      height 450px
</style>