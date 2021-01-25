<template>
  <div id="main">
     <div class="auto">
       <div class="head"><h3>UNI-ADMIN</h3></div>
       <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="4%" class="demo-ruleForm" style="margin-right:4%;margin-top:5%">
        <el-form-item prop="uname">
          <el-input type="text" v-model="ruleForm.uname" placeholder="请输入用户名" maxlength="10" show-word-limit autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="pass">
          <el-input type="password" v-model="ruleForm.pass" placeholder="请输入密码" show-password autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')" :loading="load" style="width:100%;background-color:#339999;border:1px solid #339999">立即登入</el-button>
        </el-form-item>
      </el-form>
     </div>
  </div>
</template>

<script>
 export default{
    data() {
      var validateUname = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'));
        } else {
          callback();
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          uname: '',
          pass: '',
        },
        rules: {
          uname: [
            { validator: validateUname, trigger: 'blur' }
          ],
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
        },
        load:false
      };
    },
    created(){
       if(!sessionStorage.getItem("token") && sessionStorage.getItem("Url")){
          this.$message.error('非法token,请重新登陆');
       }
      sessionStorage.removeItem('token');//令牌
      sessionStorage.removeItem('uname');//用户名
      sessionStorage.removeItem('pass');//密码
    },
    methods: {
      //提交表单内容
      submitForm(formName) {
        this.load = true;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.axios.post(`/admin/login`,{
                username:this.ruleForm.uname,
                password:this.ruleForm.pass,
              }).then((response) => {
                this.$message({
                  message: '登陆成功',
                  type: 'success'
                });
                  sessionStorage.setItem('token',response.data.data.token);//令牌
                  sessionStorage.setItem('uname',this.ruleForm.uname);//用户名
                  sessionStorage.setItem('pass',this.ruleForm.pass);//密码
                  this.$router.replace({path:'/Home/Administrator'});
                  this.load = false;
              }).catch((error) => {
                this.$message.error('登陆失败');
                this.load = false
              })
          } else {
            this.$message.error('你输入的账户和密码不能为空');
            this.load = false
            return false;
          }
        });
      },
    }
}
</script>

<style lang="scss" scoped>
#main{
  width: 100%;
  display: flex;
  &>.auto{
    width: 450px;
    height: 300px;
    border: 1px solid #DFDFDF;
    margin:200px auto;
    &>.head{
      width: 100%;
      height: 60px;
      border-bottom: 1px solid #DFDFDF;
      color: #6c757d;
      text-align: center;
      line-height: 60px;
    }
  }
}

</style>