<template>
  <div class="container">
    <!-- 幻灯片 -->
    <el-carousel>
      <el-carousel-item v-for="(item, index) in banners" :key="index">
        <div
          class="banner-image"
          :style="`
                background:url(${$axios.defaults.baseURL}${item.url})center center no-repeat;
              background-size:contain contain;
                `"
        ></div>
      </el-carousel-item>
    </el-carousel>
    <div class="banner-content">
      <div class="search-bar">
        <el-row type="flex" class="search-tab">
          <span v-for="(item,index) in options" :key="index">
            <i>{{item.name}}</i>
          </span>
        </el-row>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      banners: [], // 轮播图数据
      options: [
        {
          name: "攻略",
          placeholder: "请输入城市"
        },
        {
          name: "酒店",
          placeholder: "请输入城市搜索酒店"
        },
        {
          name: "机票",
          placeholder: "请输入出发地"
        }
      ]
    };
  },
  mounted() {
    this.$axios({
      url: "/scenics/banners"
    }).then(res => {
      const { data } = res.data;
      this.banners = data;
    });
  }
};
</script>

<style scoped lang="less">
.banner-content {
  position: absolute;
  z-index: 10;
  margin-left: -500px;
  top: 50%;
  left: 50%;
  width: 1000px;
  background: red;
  .search-bar {
    width: 552px;
    margin: 0 auto;
    .search-tab{
       span {
      width: 82px;
      height: 36px;
      display: block;
      margin-right: 8px;
      cursor: pointer;
      position: relative;
      i{
        position: absolute;
        z-index: 2;
        width: 100%;
        height: 100%;
        display: block;
        line-height: 30px;
        text-align: center;
        color: #fff
      }
      &:after{
        position: absolute;
        left: 0;
        top: 0;
        display: block;
        content: "";
        width: 100%;
        height: 100%;
        border: 1px rgba(255, 255, 255, .2) solid;
        border-bottom: none;
        transform: scale(1.1,1.3) perspective(.7em) rotateX(2.2deg);
      }
    }
    }
  }
}
.banner-image {
  width: 100%;
  height: 100%;
}
.container {
  min-width: 1000px;
  margin: 0 auto;
  position: relative;

  /deep/ .el-carousel__container {
    height: 700px;
  }
}
</style>