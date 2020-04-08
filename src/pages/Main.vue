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
            <template v-if="running === false">
              <el-button style="width:100%" @click="timeset">开始计时</el-button>
            </template>
            <template v-else>
              <el-button style="width:100%" @click="timeset">暂停计时</el-button>
            </template>
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
            <el-input
              v-model="input_msg"
              placeholder="现在要做什么"
              @keyup.enter.native="pushtask"
              style="width:100%"
            ></el-input>
          </div>
          <div class="infinite-list" style="height:172px;overflow:auto">
            <el-checkbox
              v-model="checked"
              @click="finish"
              v-for="(item, index) in list"
              :key="index"
              style="display:block"
            >{{item}}</el-checkbox>
          </div>
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
      input_msg: "",
      checked: false,
      running: false,
      message: "任务",
      list: []
    };
  },
  methods: {
    countdown() {
      if (this.seconds === 0) {
        // 如果时间都用完了
        if (this.minutes === 0) {
          this.running = false;
          this.minutes = 25;
          // 需要clear一下时间
          window.clearInterval(this.timer);
          this.time_percentage = 100;
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
      // 如果正在运行，就暂停（即删除定时任务）
      if (this.running === true) {
        window.clearInterval(this.timer);
        this.running = false;
      } else {
        // 如果还没有开始运行
        this.running = true;
        this.timer = setInterval(this.countdown, 10);
      }
    },
    pushtask() {
      this.list.push(this.input_msg);
      this.input_msg = "";
    },
    finish() {
      this.checked = !this.checked;
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