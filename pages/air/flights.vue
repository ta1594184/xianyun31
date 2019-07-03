<template>
    <section class="contianer">
        <el-row  type="flex" justify="space-between">

            <!-- 顶部过滤列表 -->
            <div class="flights-content">
                <!-- 过滤条件 -->
                <FlightsFilters :data="flightsData"/>
                
                <!-- 航班头部布局 -->
                    <FightstHead />
                
                
                <!-- 航班信息 -->
                    <FlightsLtem  v-for="(item,index) in dateList"
                    :key="index"
                    :data="item"/>
                    <el-row type="flex" justify="center" style="margin-top:10px;">
                        <!-- size-change：切换条数时候触发 -->
                        <!-- current-change：选择页数时候触发 pageSize 改变时会触发 每页条数-->
                        <!-- current-page: 当前页数 currentPage 改变时会触发 当前页-->
                        <!-- page-size：当前条数 -->
                        <!-- total：总条数 -->
                        <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="pageIndex"
                        :page-sizes="[5, 10, 15, 20]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                        </el-pagination>
                    </el-row>
            </div>

            <!-- 侧边栏 -->
            <div class="aside">
                <!-- 侧边栏组件 -->
            </div>
        </el-row>
    </section>
</template>

<script>
import FightstHead from "@/components/air/fightsListHead"
import FlightsLtem from "@/components/air/flightsItem"
import FlightsFilters from "@/components/air/flightsFilters"
import moment from "moment";

export default {
    data(){
        return {
            dateList:[], //分页之后每页的数据
            flightsData:{
                //机票默认值
                flights: [],
                info:{},
                options: {}
            },
            pageIndex: 1, // 当前页数
            pageSize: 5,  // 显示条数
        }
    },
mounted(){
    this.$axios({
        url:"airs",
        params:this.$route.query
    }).then(res=>{
        
        this.flightsData=res.data
        console.log(this.flightsData)
        this.total=res.data.total
        //每页条数切割
        this.dateList=res.data.flights.slice(0, 5)
    })
},
methods:{
    //change：切换条数时候触发
    handleSizeChange(value){
        //每页条数切换
        this.pageSize=value
    },
    //选择页数的时候触发
    handleCurrentChange(value){
        //计算列表数据
        this.pageIndex = value
        this.dateList=this.flightsData.flights.slice(
            (this.pageIndex - 1) * this.pageSize,
            this.pageIndex * this.pageSize
        )
    },
},

    components:{
        FightstHead,
        FlightsLtem,
        FlightsFilters
    }
}
</script>

<style scoped lang="less">
    .contianer{
        width:1000px;
        margin:20px auto;
    }

    .flights-content{
        width:745px;
        font-size:14px;
    }

    .aside{
        width:240px;
    } 
</style>