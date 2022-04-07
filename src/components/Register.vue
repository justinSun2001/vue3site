<template>
  <div class="r2">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleFormRef" class="demo-ruleForm">
      <el-form-item prop="email">
        <el-input v-model="ruleForm.email" placeholder="邮箱"></el-input>
      </el-form-item>
      <el-form-item prop="userName">
        <el-input v-model="ruleForm.userName" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item prop="pass">
        <el-input type="password" v-model="ruleForm.pass" placeholder="密码" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" placeholder="确认密码" autocomplete="off"></el-input>
      </el-form-item>
      <el-button type="primary" @click="submitForm('ruleFormRef')"> 
        注册
      </el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data(){
    const validatePass = (rule,value,callback) => {
      if(value==='') {
        callback(new Error('请输入密码'));
      }else {
        let pwdRegex = new RegExp('(?=.*[0-9])(?=.*[a-zA-Z]).{8,30}');
        if(!pwdRegex.test(value)){
          callback(new Error('密码必须包含字母和数字，且不少于8个字符'));
        }
        if(this.ruleForm.checkPass!=='') {
          this.$refs.ruleFormRef.validateField('checkpass');
        }
        callback();
      }
    };
    const validatePass2 = (rule,value,callback) => {
      if(value==='') {
        callback(new Error('请再次输入密码'));
      }else if(value!==this.ruleForm.pass) {
        callback(new Error('密码不一致'))
      }else{
        callback();
      }
    };
    return {
      ruleForm: {
        email:'',
        userName:'',
        pass: '',
        checkPass: '',
      },
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        userName: [
          {required: true, message: '请输入用户名', trigger:'blur' },
        ],
        email:[
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
    },
  };
  },
methods: {
      submitForm(formName) {
        if (!formName) return
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // const params = new URLSearchParams();
            // params.append('email',this.dynamicValidateForm.email);
            const qs = require('qs');
            this.axios.post('/user/register', qs.stringify(this.ruleForm))
            .then((response)=>{
              console.log(response);
              alert('注册成功，请登录！');
              })
            .catch(function(error){
              if(error.response){
              // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
              alert('该邮箱已被注册')
            }else if (error.request) {
              // 请求已经成功发起，但没有收到响应
              // `error.request` 在浏览器中是 XMLHttpRequest 的实例，
              // 而在node.js中是 http.ClientRequest 的实例
              console.log(error.request);
            }else {
              // 发送请求时出了点问题
              console.log('Error', error.message);
            }
          });
          }else {
            alert('错误');
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
</style>