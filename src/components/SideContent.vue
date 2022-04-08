<template>
  <div class="side">


    <div class="side1">
      <div class="sideline"></div>
      <div class="sidetext">Follow Me</div>
      <div class="side-img">
      <div class="img-item"><a href="https://space.bilibili.com/613598276"><img src="../assets/img/bilibili.png"></a></div>
      <div class="img-item"><a href="https://user.qzone.qq.com/2464334130/main"> <img src="../assets/img/qq.png"></a></div>
      <div class="img-item"><a href="https://github.com/justinSun2001?tab=repositories"><img src="../assets/img/github.png"></a></div>
      <div class="img-item"><a href="https://www.linkedin.com/in/justin-sun-744810193/"><img src="../assets/img/linkin.png"></a></div>
      <div class="img-item"><a href="https://weibo.com/u/7707589860"><img src="../assets/img/weibo.png"></a></div>
      </div>
    </div>


    <div class="side2">
      <div class="sideline"></div>
      <div class="sidetext">Articles Letter</div>
      <div class="sidecontent">
        Get all latest content delivered a few times a week.
      </div>
      <div>
        <el-form :inline="true" :model="dynamicValidateForm" ref="dynamicValidateForm" class="demo-dynamic">
          <el-form-item
            prop="email"
            :rules="[
              { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
            ]">
            <el-input v-model="dynamicValidateForm.email" placeholder="Your Email"></el-input>
          </el-form-item>
            <el-button type="primary" plain @click="submitForm('dynamicValidateForm')">提交</el-button>
        </el-form>
      </div>
    </div>


    <div class="side3">
      <div class="sideline"></div>
      <div class="sidetext">Recent Posts</div>
      <el-divider></el-divider>
      <div class="text">{{text1}}</div>
      <el-divider></el-divider>
      <div class="text">{{text2}}</div>
      <el-divider></el-divider>
      <div class="text">{{text3}}</div>
      <el-divider></el-divider>
      <div class="text">{{text4}}</div>
      <el-divider></el-divider>
    </div>

  </div>
</template>

<script>
export default {
name:"SideContent",
props: {
  amount:Number
},
data() {
      return {
        dynamicValidateForm: {
          email: ''
        },
        text1:'',
        text2:'',
        text3:'',
        text4:''
      };
    },
created () {
  this.axios.get("/catalog/articlesData").then((result)=>{
        let id1=result.data[this.amount]._id;
        let id2=result.data[this.amount-1]._id;
        let id3=result.data[this.amount-2]._id;
        let id4=result.data[this.amount-3]._id;
      this.axios.get("/catalog/articlesData/"+id1+"").then((result)=>{
        this.text1=result.data.article.genre[0].name+':   '+result.data.article.title;
    });
      this.axios.get("/catalog/articlesData/"+id2+"").then((result)=>{
        this.text2=result.data.article.genre[0].name+':   '+result.data.article.title;
    });
      this.axios.get("/catalog/articlesData/"+id3+"").then((result)=>{
        this.text3=result.data.article.genre[0].name+':   '+result.data.article.title;
    });
      this.axios.get("/catalog/articlesData/"+id4+"").then((result)=>{
        this.text4=result.data.article.genre[0].name+':   '+result.data.article.title;
    });
    })
},
methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // const params = new URLSearchParams();
            // params.append('email',this.dynamicValidateForm.email);
            const qs = require('qs');
            this.axios.post('/user/email', qs.stringify(this.dynamicValidateForm))
            .then((response)=>console.log(response));

            alert('submit!');
          } else {
            alert('error submit!!');
            return false;
          }
        });
      },
}
}
</script>

<style scoped>
  .side {
    display: flex;
    flex-direction: column;
    
  }
  .side1 {
    padding-top:20px;
    padding-bottom: 20px;
  }
  .sideline {
    width:3px;
    height:15px;
    background-color: rgb(64, 158, 149);
  }
  .sidetext {
    padding-left: 20px;
    margin-top: -20px;
  }
  img {
    width:40px;
    height:40px;
  }
  .side-img {
    display:flex;
    flex-wrap: wrap;
    padding-left: 30px;
    padding-top: 20px;
  }
  .img-item {
    padding-right: 15px;
  }
  .sidecontent {
    padding-top: 10px;
    padding-left: 10px;
    font-size:14px;
    color:darkgrey;
  }
  .demo-dynamic {
    padding-left: 10px;
    padding-top: 15px;
  }
  .text {
    padding-left: 10px;
    line-height: 15px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 15px;
    color:burlywood;
  }
  /* 修改el-divider的样式 */
  .el-divider--horizontal{
     margin: 18px 0;
     background: 0 0;
     border-top: 1px dashed burlywood;
 } 
</style>