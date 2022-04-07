<template>
  <div class="r2">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm">
      <el-form-item prop="email">
        <el-input v-model="ruleForm.email" placeholder="邮箱/用户名"></el-input>
      </el-form-item>
      <el-form-item prop="pass">
        <el-input type="password" v-model="ruleForm.pass" placeholder="密码" autocomplete="off"></el-input>
      </el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')"> 
        登陆
      </el-button>
    </el-form>
  </div>
  <div class="r3">
    <a href="">忘记密码？</a>
  </div>
</template>

<script>
export default {
  data(){
    var validatePass = (rule,value,callback) => {
      if(value==='') {
        callback(new Error('请输入密码'));
      }
      callback();
    };
    return {
      ruleForm: {
        email:'',
        pass: '',
      },
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        email:[
          { required: true, message: '请输入邮箱地址/用户名', trigger: 'blur' },
        ],
    },
  };
  },
methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const qs = require('qs');
            this.axios.post('/user/login', qs.stringify(this.ruleForm))
            .then((response)=>{
              console.log(response);
              if(this.ruleForm.email=='admin'&&this.ruleForm.pass=='admin'){
                this.$router.push({
                  path:"/home/"+'admin'
                })
                }
              else if(this.ruleForm.email==response.data.email && this.ruleForm.pass==response.data.password){
                this.$router.push({
                  path:"/home/"+response.data._id
                })
              }
              else {alert('登录失败');}
              })
          } else {
            alert('error!!');
            return false;
          }
        });
      },
}

}
</script>

<style scoped>
  .el-button--primary {
    width: 80%;
    margin: 0 10%;
  }
  .el-form-item {
    width: 80%;
    margin-left: 10%;
    margin-right: 10%;
    margin-bottom: 18px;
  }
  .r3 {
    padding-left: 5%;
    padding-top: 10%;
  }
   a {
    text-decoration: none;
    color:coral;
    font-size: 8px;
  }
</style>