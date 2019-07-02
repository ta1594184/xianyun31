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
          <span
            v-for="(item,index) in options"
            :class="{active:index===currentOption}"
            :key="index"
            @click="handleOption(index)"
          >
            <i>{{item.name}}</i>
          </span>
        </el-row>
        <!-- 搜索框 -->
        <!-- placeholder动态输入框内的提示数字 -->
        <el-row type="flex" class="search-input" align="middle">
          <input
          
            :placeholder="options[currentOption].placeholder"
            v-model="searchValue"
            @keyup.enter="handleSearch"
          >
          <i class="el-icon-search" @click="handleSearch"></i>
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
          placeholder: "请输入城市",
          pageUrl: "/post?city="
        },
        {
          name: "酒店",
          placeholder: "请输入城市搜索酒店",
          pageUrl: "/post?city="
        },
        {
          name: "机票",
          placeholder: "请输入出发地",
          pageUrl: "/air"
        }
      ],
      // searchValue输入框值储存
      searchValue: "",
      // currentOption当前选择我索引
      currentOption: 0
    };
  },
  mounted() {
    this.$axios({
      url: "/scenics/banners"
    }).then(res => {
      const { data } = res.data;
      this.banners = data;
    });
  },
  methods: {
    //设置点击选项Tab
    handleOption(index) {
      //设置当前选项
      this.currentOption=index
      const item=this.options[index]
      if(item.name==="机票"){
        return this.$router.push(item.pageUrl)
      }
    },
    // 输入框按下回车搜索跳转
    handleSearch() {
      const item=this.options[this.currentOption]
      //跳转和输入框内的值一并发送
      return this.$router.push(item.pageUrl+this.searchValue)
    },
  }
};
</script>

<style scoped lang="less">
//搜索框

.banner-content {
  position: absolute;
  z-index: 10;
  margin-left: -500px;
  top: 50%;
  left: 50%;
  width: 1000px;
  // background: red;
  .search-bar {
    width: 552px;
    margin: 0 auto;
    .search-tab {
      .active {
        i {
          color: #333;
        }
        &:after {
          background: #eee;
        }
      }
      span {
        width: 82px;
        height: 36px;
        display: block;
        margin-right: 8px;
        cursor: pointer;
        position: relative;
        i {
          position: absolute;
          z-index: 2;
          width: 100%;
          height: 100%;
          display: block;
          line-height: 30px;
          text-align: center;
          color: #fff;
        }
        &:after {
          position: absolute;
          left: 0;
          top: 0;
          display: block;
          content: "";
          width: 100%;
          height: 100%;
          border: 1px rgba(255, 255, 255, 0.2) solid;
          // transform形状
          transform: scale(1.1, 1.3) perspective(0.7em) rotateX(2.2deg);
          transform-origin: bottom left;
          border-bottom: none;
          border-radius: 1px 2px 0 0;
          box-sizing: border-box;
          background: rgba(0, 0, 0, 0.5);
        }
      }
    }
    .search-input {
      width: 552px;
      height: 47px;
      background: #fff;
      border-radius: 0 5px 5px 5px;
      border: 1px rgba(255, 255, 255, 0.2);
      box-sizing: unset;
      input {
        flex: 1;
        height: 20px;
        padding: 13px 15px;
        border: none;
        outline: 0;
        font-size: 16px;
      }
      .el-icon-search {
        cursor: pointer;
        font-size: 22px;
        padding: 0 10px;
        font-weight: bold;
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