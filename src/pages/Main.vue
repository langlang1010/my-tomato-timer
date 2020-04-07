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
    <div style="margin-top:2%; height:200px">
      <div id="timer" style="text-align:center">
        <el-card class="box-card" style="float:left;width:48%">
          <div slot="header" class="clearfix">
            <el-button style="width:100%" @click="timeset">开始计时</el-button>
          </div>
          <div>
            <el-progress type="circle" style="height:150px" :percentage="time_percentage"></el-progress>
            <p v-if="seconds === 0">{{minutes}}:{{seconds}}0</p>
            <p v-else>{{minutes}}:{{seconds}}</p>
          </div>
        </el-card>
      </div>
      <div id="task">
        <el-card class="box-card" style="float:right; width:48%">
          <div slot="header" class="clearfix">
            <el-input v-model="input_msg" placeholder="现在要做什么" style="width:100%"></el-input>
          </div>
          <div style="height:172px"></div>
        </el-card>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Main",

  data() {
    return {
      maxtime: 10,
      minutes: 25,
      seconds: 0,
      timer: "",
      time_percentage: 100,
      input_msg: ''
    };
  },
  methods: {
    countdown() {
      if (this.seconds === 0) {
        if (this.minutes === 0) {
          return;
        }
        this.minutes = this.minutes - 1;
        this.seconds = 59;
      } else {
        this.seconds = this.seconds - 1;
      }

      // 计算剩余时间的百分数
      this.time_percentage = parseInt(
        (this.minutes * 60 + this.seconds) / (25 * 0.6)
      );
    },
    timeset() {
      this.timer = setInterval(this.countdown, 1000);
    }
  }
};
</script>
<style scoped>
* {
  margin: 0;
}
.total {
  margin-left: 10%;
  margin-right: 10%;
  width: 80%;
}
.top {
  height: 130px;
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
  clear: both;
}

.box-card {
  width: 480px;
}
</style>