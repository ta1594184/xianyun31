<template>
  <div class="header">
    <!-- 中间的内容 -->
    <el-row type="flex" justify="space-between" class="main">
      <!-- logo -->
      <div class="logo">
        <nuxt-link to="/">
          <img src="/images/logo.jpg" alt>
        </nuxt-link>
      </div>

      <!-- 菜单 -->
      <div class="navs">
        <nuxt-link to="/">首页</nuxt-link>
        <nuxt-link to="/post">旅游攻略</nuxt-link>
        <nuxt-link to="/hotel">酒店</nuxt-link>
        <nuxt-link to="/air">国内机票</nuxt-link>
      </div>

      <!-- 登录状态 -->
      <el-row class="box5">
        <!-- 下拉菜单 -->
        <el-dropdown v-if="$store.state.user.userInfo.token">
          <span class="el-dropdown-link">
            <img :src="$axios.defaults.baseURL + $store.state.user.userInfo.user.defaultAvatar" alt="">

            <span>{{$store.state.user.userInfo.user.nickname}}</span>

            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown" class="stateu">
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item><span @click="handleLogOut">退出</span></el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <div v-else>
          <nuxt-link to="/user/login">登录 / 注册</nuxt-link>
        </div>
      </el-row>
    </el-row>
  </div>
</template>

<script>
export default {

methods:{
  handleLogOut(){
  this.$store.commit("user/clearUserInfo",)
}
}
};
</script>

<style scroped lang="less">
.box5{
  

    margin-top:25px; 

}
.el-dropdown-link {
    line-height: 60px;
   
  img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    vertical-align: middle;
    
  }
}
.login {
  width: 156px;
  padding-top: 8px;
  img {
    display: block;
    width: 100%;
  }
}
.header {
  width: 1200px;
  margin: 0 auto;
}

.navs {
    height: 60px;
    line-height: 60px;
  margin: 0 20px;
  flex: 1;
}
.navs {
  a {
    display: block;
    padding: 0 20px;
    height: 60px;
    box-sizing: border-box;
    float: left;
    &:hover {
      border-bottom: 5px #409eff solid;
      color: #409eff;
    }
  }
}
.navs {
  .nuxt-link-exact-active {
    background: #409eff;
    color: white;
    &:hover{
         color:#fff;
        }
        
  }
  
}
</style>
