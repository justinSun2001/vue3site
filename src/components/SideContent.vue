<template>
  <div class="side">


    <div class="side1">
      <div class="sideline"></div>
      <div class="sidetext">Follow Me</div>
      <div class="side-img">
      <div class="img-item"><img src="../assets/img/qq.png"></div>
      <div class="img-item"><img src="../assets/img/wechat.png"></div>
      <div class="img-item"><img src="../assets/img/bilibili.png"></div>
      <div class="img-item"><img src="../assets/img/linkin.png"></div>
      <div class="img-item"><img src="../assets/img/ins.png"></div>
      </div>
    </div>


    <div class="side1">
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
    ]"
  >
    <el-input v-model="dynamicValidateForm.email" placeholder="Your Email"></el-input>
  </el-form-item>
  <el-button type="primary" plain @click="submitForm('dynamicValidateForm')">提交</el-button>
        </el-form>
  </div>
    </div>


    <div class="side1">
      <div class="sideline"></div>
      <div class="sidetext">Recent Posts</div>
      <div class="line"><el-divider></el-divider></div>
      <div class="text">{{text1}}</div>
      <div class="line"><el-divider></el-divider></div>
      <div class="text">{{text2}}</div>
      <div class="line"><el-divider></el-divider></div>
      <div class="text">{{text3}}</div>
      <div class="line"><el-divider></el-divider></div>
      <div class="text">{{text4}}</div>
      <div class="line"><el-divider></el-divider></div>
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
mounted () {
  this.getText()
},
methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            alert('error submit!!');
            return false;
          }
        });
      },
      getText(){
        this.axios.get("http://localhost:3000/catalog/articlesData").then(result=>{
          let id1=result.data[this.amount]._id;
          let id2=result.data[this.amount-1]._id;
          let id3=result.data[this.amount-2]._id;
          let id4=result.data[this.amount-3]._id;
        this.axios.get("http://localhost:3000/catalog/articlesData/"+id1+"").then(result=>{
          this.text1=result.data.article.genre[0].name+':   '+result.data.article.title;
      });
        this.axios.get("http://localhost:3000/catalog/articlesData/"+id2+"").then(result=>{
          this.text2=result.data.article.genre[0].name+':   '+result.data.article.title;
      });
        this.axios.get("http://localhost:3000/catalog/articlesData/"+id3+"").then(result=>{
          this.text3=result.data.article.genre[0].name+':   '+result.data.article.title;
      });
        this.axios.get("http://localhost:3000/catalog/articlesData/"+id4+"").then(result=>{
          this.text4=result.data.article.genre[0].name+':   '+result.data.article.title;
      });
      })
      }
}
}
</script>

<style>
  .side1 {
    padding-left: 20px;
    padding-top: 20px;
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
  .line {
    width:100%
  }
  .text {
    padding-left: 10px;
    line-height: 18px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 20px;
    color:burlywood;
  }
</style>