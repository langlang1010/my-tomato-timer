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
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link" style="color:#66CCFF">
            你好,{{ username }}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="注销" icon="el-icon-switch-button">注销</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <el-container>
      <el-main>
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
                <p v-if="seconds === 0">{{ minutes }}:{{ seconds }}0</p>
                <p v-else>{{ minutes }}:{{ seconds }}</p>
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
              <template>
                <div style="height:172px;overflow-y:scroll">
                  <el-row>
                    <el-col :span="12">
                      <p style="color:#66CCFF">需要完成</p>
                      <div class="grid-content bg-purple">
                        <el-checkbox
                          v-for="item in list"
                          :key="item.id"
                          @change="checkclick(item.id)"
                          :checked="false"
                          style="display:block;"
                        >{{ item.taskName }}</el-checkbox>
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <p style="color:#66CCFF">已经完成</p>
                      <div class="grid-content bg-purple-light">
                        <el-checkbox
                          v-for="item in list_finished"
                          :key="item.id"
                          @change="checkfinish(item.id)"
                          :checked="true"
                          style="display:block;"
                        >{{ item.taskName }}</el-checkbox>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </template>
            </el-card>
          </div>
        </div>
      </el-main>
      <el-footer>
        <p>累计完成</p>
        <p style="color:#66CCFF;font-size:2rem">{{list_finished.length}}</p>
        <p>个任务</p>
      </el-footer>
    </el-container>
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
      chencknow: true,
      time_percentage: 100,
      input_msg: "",
      checked: false,
      running: false,
      message: "任务",
      props: {
        label: "name",
        children: "zones",
        isLeaf: "leaf"
      },
      list: [],
      list_finished: [],
      username: ""
    };
  },
  mounted: function() {
    this.loadTaskData();
  },
  methods: {
    loadTaskData() {
      // 获得授权码
      var that = this;
      var token = window.localStorage["token"];
      if (token === null) {
        alert("fffff");
      }
      var url = this.$global_msg.host + "/user/tasks/" + token;
      // 拿到用户名
      this.username = window.localStorage["username"];
      // 把后台拿到的数据保存到this.list
      this.axios.get(url).then(response => {
        let res = response.data;
        if (res.code === 200) {
          var total_list = res.data;
          // 判断需要删除的元素
          var list1 = [];
          var list2 = [];
          // 遍历
          for (var i = 0; i < total_list.length; i++) {
            if (total_list[i].finished === true) {
              list1.push(total_list[i]);
            } else {
              list2.push(total_list[i]);
            }
          }
          // 把最近的放在前面
          this.list_finished = list1.reverse();
          this.list = list2.reverse();
        } else {
          this.$message({
            message: res.msg + "，即将前去登录...",
            type: "error",
            duration: 1000,
            onClose: function() {
              that.$router.push({ path: "/" });
            }
          });
        }
      });
    },
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
    // 注销登录
    handleCommand(command) {
      // 1. 清空localstorage
      window.localStorage["token"] = null;
      // 2. 跳转登录界面
      var that = this;
      this.$message({
        message: command + "注销成功，前往登录界面",
        type: "success",
        duration: 3000,
        onClose: function() {
          that.$router.push({ path: "/" });
        }
      });
    },
    // 开始倒计时与暂停倒计时
    timeset() {
      // 如果正在运行，就暂停（即删除定时任务）
      if (this.running === true) {
        window.clearInterval(this.timer);
        this.running = false;
      } else {
        // 如果还没有开始运行
        this.running = true;
        this.timer = setInterval(this.countdown, 1000);
      }
    },

    // 添加任务
    pushtask() {
      var taskName = this.input_msg;
      var that = this;
      var token = window.localStorage["token"];
      var postData = new URLSearchParams();
      if (taskName.trim() === "") {
        return;
      } else {
        postData.append("taskName", taskName);
        postData.append("token", token);
        this.axios
          .post(this.$global_msg.host + "/user/add", postData)
          .then(function(response) {
            let res = response.data;
            var task = res.data;
            // 第一次倒序
            that.list = that.list.reverse();
            // 添加在最后
            that.list.push(task);
            // 再次倒过来
            that.list = that.list.reverse();
            that.$message({
              message: '添加成功',
              type: "success",
              duration: 2000
            });
          });
      }
      this.input_msg = "";
    },
    // 完成任务
    checkclick(taskId) {
      var token = "" + window.localStorage["token"];
      var postData = new URLSearchParams();
      var that = this;
      postData.append("taskId", taskId);
      postData.append("token", token);
      this.axios
        .post(this.$global_msg.host + "/user/finish", postData)
        .then(function(response) {
          var data = response.data;
          console.log(data);
          that.loadTaskData();
        });
    },
    checkfinish(taskId) {
      var token = "" + window.localStorage["token"];
      var postData = new URLSearchParams();
      var that = this;
      postData.append("taskId", taskId);
      postData.append("token", token);
      this.axios
        .post(this.$global_msg.host + "/user/restart", postData)
        .then(function(response) {
          var data = response.data;
          console.log(data);
          that.loadTaskData();
        });
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
