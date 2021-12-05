<template>
  <div class="login-wrap">
    <div class="login-box">
      <div class="title">用户登录</div>
      <div class="content">
      <el-input placeholder="请输入账号" v-model="username" clearable style="margin-top:10px"> </el-input>
      <el-input
        style="margin-top:10px"
        placeholder="请输入密码"
        v-model="password"
        show-password
      ></el-input>
      <el-button type="primary" style="margin-top:15px" @click="login">登录</el-button>
    </div>
    </div>
  </div>
</template>
<script>
import Api from "@/api";
export default {
  data() {
    return {
        username:"",
        password:""
    };
  },
  methods:{
      login(){
          let { username, password } = this;
        let url = '/user/login';
        let params = {
            username,
            password
        }
        Api.post(url,params).then((res)=>{
            if(res.code == '200'){
                document.cookie = `token=${res.data}`;
                this.$router.push({
                    name:'empty'
                })
            }
        })
      }
  }
};
</script>
<style lang="less" scoped>
.login-wrap {
  width: 100%;
  height: 100%;
  background-color: #f2f2f2;
  display: flex;
  align-items: center;
  justify-content: center;
  .login-box {
    width: 400px;
    // height: 200px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #fff;
    padding: 10px 20px;
    .title {
      height: 34px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
    }
    .content{
        padding: 0 20px;
        box-sizing: border-box;
    }
  }
}
</style>