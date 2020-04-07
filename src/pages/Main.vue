<template>
  <div class="total">
    <div class="top">
      <div id="title">
        <div>
          <span>
            <img src="../assets/tomato2.png" style="vertical-align: middle" />
          </span>
          <span id="fontstyle" style="font-size:3rem;">Tomato Timer</span>
        </div>
      </div>
      <div id="user">
        <span style="color:#66CCFF">你好，浪浪</span>
        <span>
          <img src="../assets/out.png" style="vertical-align: middle" />
        </span>
      </div>
    </div>
    <div  style="margin-top:2%; height:200px">
     <div id="timer" >
        <el-card class="box-card" style="float:left;width:48%">
          <div slot="header" class="clearfix">
            <el-button style="width:100%" @click="timeset">开始计时</el-button>
          </div>
        <el-progress type="circle" :percentage="25" style="height:150px"></el-progress>
        </el-card>
      </div>
      <div id="task" >
         <el-card class="box-card" style="float:right; width:48%" >
          <div slot="header" class="clearfix">
           <el-input v-model="input" placeholder="现在要做什么" style="width:100%"></el-input>
          </div>
          <div  style="height:150px"> </div>
        </el-card>
      </div>
      </div>
  </div>
</template>
<script>
export default {
  name: "Main",
  data(){
    return {
      totaltime:25
    }
  },
  methods:{
    timeset(){

    }
  }
};
</script>
<style scoped>
* {
  margin: 0;
}
.total{
 margin-left: 10%;
  margin-right: 10%;
  width: 80%;
}
.top {
 
  height: 130px;
  outline: none;
  border: none;
  border-bottom: 1px solid #ccc;
}
#fontstyle {
  vertical-align: middle;
}
#title {
  position: absolute;
  top: 8%;
}
#user {
  display: block;
  float: right;
  padding-top: 5%;
}
 .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
  }
</style>