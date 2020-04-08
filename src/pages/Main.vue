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
          <template>
            <div style="height:172px;overflow-y:scroll">
              <el-row>
                <el-col :span="12">
                  <div class="grid-content bg-purple">
                    <el-checkbox
                      v-for="item in list"
                      :key="item.id"
                      @change="checkclick(item.id)"
                      :checked="false"
                      style="display:block;"
                    >{{item.taskName}}</el-checkbox>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="grid-content bg-purple-light">
                    <el-checkbox
                      v-for="item in list_finished"
                      :key="item.id"
                      :checked="false"
                       style="display:block;"
                    >{{item.taskName}}</el-checkbox>
                  </div>
                </el-col>
              </el-row>
            </div>
          </template>
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
      list_finished: []
    };
  },
  mounted: function() {
    this.loadTaskData();
  },
  methods: {
    loadTaskData() {
      // 从后台拿到数据
      var url =
        "https://smileyan.cn/demo/user/tasks/4fb1131f57fd42529a56334e4dcacb06";
      this.axios.get(url).then(response => {
        let res = response.data;
        // 把后台拿到的数据保存到this.list
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
        this.list_finished = list1;
        this.list = list2;
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
      /* this.list.push(this.input_msg);*/
      // var that = this
      // var postData = new URLSearchParams()
      // postData.append('username', this.login_username)
      // postData.append('password', this.login_password)
      // this.axios
      //   .post('https://smileyan.cn/demo/login', postData)
      //   .then(function(response) {
      //     var data = response.data
      //     that.show_message(data, '登录成功，即将跳转...')
      //   })

      var data = { taskName: this.input_msg, finished: false };
      this.list.push(data);
      this.input_msg = "";
    },
    // 完成任务
    checkclick(taskId) {
      // alert(taskId);

      // 需要提交toekn和taskId
      var postData = new URLSearchParams();
      var that = this;
      postData.append("taskId", taskId);
      postData.append("token", "4fb1131f57fd42529a56334e4dcacb06");
      this.axios
        .post("https://smileyan.cn/demo/user/finish", postData)
        .then(function(response) {
          var data = response.data;
          console.log(data);
          // alert(data.msg)
          that.loadTaskData();
          // that.show_message(data, '修改成')
        });
      // alert(this.list)
      // var data = { taskName: this.input_msg, finished: false };
      // this.list.push(data);
      // this.input_msg = "";
    },

    loadNode(node, resolve) {
      if (node.level === 0) {
        return resolve([{ name: "region" }]);
      }
      if (node.level > 1) return resolve([]);

      setTimeout(() => {
        const data = [
          {
            name: "leaf",
            leaf: true
          },
          {
            name: "zone"
          }
        ];

        resolve(data);
      }, 500);
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