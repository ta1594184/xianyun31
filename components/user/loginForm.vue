<template>
<div class="form">
    <el-form :model="form" :rules="rules" ref="form">
  <el-form-item  prop="username">
    <el-input placeholder="请输入用户名/手机号" v-model="form.username"></el-input>
  </el-form-item>
  <el-form-item   prop="password">
    <el-input placeholder="请输入密码" type="password" v-model="form.password"></el-input>
  </el-form-item>
  <p class="form-text">
            <nuxt-link to="#">忘记密码?</nuxt-link>
 </p>
  <el-button
  type="primary"
  class="submit"
  @click="handleSubmit"
  >
      登陆
  </el-button>
  </el-form>
  </div>
</template>

<script>
export default {
    data(){
        return{
            form:{
                username:"",
                password:""
            },
            rules: {
                username: [
                    { required: true, message: '请输入手机号码', trigger: 'blur' },
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                ],
            }

        }
    },
    methods:{
        handleSubmit(){
            this.$refs.form.validate(valid=>{
                if(valid){
                    this.$axios({
                        url:"/accounts/login",
                        method:"post",
                        data:this.form
                    }).then(res=>{
                       this.$store.commit("user/setUserInfo",res.data)
                    this.$message.success("登录成功，正在跳转...");

                        setTimeout(() => {
                            this.$router.push("/");
                        }, 1000);
                    })
                }
            })
        }
    }
}
</script>

<style scoped lang="less">
.form{
    padding: 20px;
}
.submit{
    display:block;
    width: 100%;
}
.form-text{
        font-size:12px;
        color:#409EFF;
        text-align: right;
        margin-bottom:10px;
        line-height: 1;
 }
</style>
