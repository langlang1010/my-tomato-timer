<template>
  <div class="outback">
    <div class="content">
      <div class="login-form">
        <img src="../assets/tomato.png" />
        <div class="switch">
          <span id="login" :class="{ active: isactive }" @click="change"
            >Login</span
          >
          <span>/</span>
          <span id="Signup" :class="{ active: isactive1 }" @click="change1"
            >Signup</span
          >
        </div>
        <transition name="fade">
          <div class="txtb" v-if="showone">
            <input
              placeholder="username"
              type="text"
              class="in"
              v-model="login_username"
            />
            <input
              class="in"
              v-model="login_password"
              id="passone"
              type="password"
              placeholder="password"
            />
          </div>
        </transition>
        <transition name="fade">
          <div class="txtb" v-if="show">
            <input
              placeholder="username"
              type="text"
              class="in"
              v-model="username"
            />
            <input
              placeholder="E-mail"
              type="text"
              class="in"
              v-model="email"
            />
            <input
              class="in"
              id="passone"
              type="password"
              placeholder="password"
              v-model="password1"
            />
            <input
              class="in"
              id="passtwo"
              type="password"
              placeholder="repeat"
              v-model="password2"
            />
          </div>
        </transition>
        <el-button @click="login" id="lbutton" round v-if="showone"
          >Login</el-button
        >
        <el-button @click="submit" id="sbutton" round v-if="show"
          >Submit</el-button
        >
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Login',
  data() {
    return {
      isactive: true,
      isactive1: false,
      show: false,
      showone: true,
      username: '',
      email: '',
      password1: '',
      password2: '',
      login_username: '',
      login_password: '',
    }
  },

  methods: {
    change() {
      this.isactive = !this.isactive
      this.isactive1 = !this.isactive1
      if (this.isactive === true) {
        this.showone = true
        this.show = false
      }
    },
    change1() {
      this.isactive1 = !this.isactive1
      this.isactive = !this.isactive
      if (this.isactive1 === true) {
        this.show = true
        this.showone = false
      }
    },
    show_message(data, msg, username) {
      var that = this
      // 如果返回值code为200则说明登录成功
      if (data.code === 200) {
        // 把 token 保存起来
        window.localStorage.token = data.data
        // 保存用户名，如果是login则保存login_username
        // if(isLogin) {
        //   window.localStorage.username = this.login_username
        // } else {
        //   window.localStorage.username = this.username
        // }
        window.localStorage.username = username
        this.$message({
          message: msg,
          type: 'success',
          duration: 3000,
          onClose: function() {
            that.$router.push({ path: '/home' })
          },
        })
      } else {
        that.$message({
          message: data.msg + '',
          type: 'error',
          duration: 10000,
        })
      }
    },
    login() {
      var that = this
      var postData = new URLSearchParams()
      postData.append('username', this.login_username)
      postData.append('password', this.login_password)
      this.axios
        .post('https://smileyan.cn/demo/login', postData)
        .then(function(response) {
          var data = response.data
          that.show_message(data, '登录成功，即将跳转...', that.login_username)
        })
    },
    submit() {
      // 两次密码不一致
      if (this.password1 != this.password2) {
        this.$message.error('输入的两次密码不一致')
        return
      }
      var that = this
      // 获得数据
      var postData = new URLSearchParams()
      var username =   this.username
      postData.append('username', username)
      postData.append('password', this.password1)
      postData.append('email', this.email)

      this.axios
        .post('https://smileyan.cn/demo/register', postData)
        .then(function(response) {
          var data = response.data
          that.show_message(data, '注册成功，即将跳转...', username)
        })
        .catch(function(error) {
          console.log(error)
        })
    },
  },
}
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
}
.login-form {
  position: relative;
  width: 90rem;
  top: 10%;
  left: 20%;
}
.outback {
  background: linear-gradient(90deg, rgb(181, 154, 254), rgb(245, 189, 253));
  width: 100%;
  height: 100vh;
}
.content {
  border-radius: 3rem;
  width: 500px;
  height: 500px;
  background-color: white;
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  overflow: hidden;
}

.txtb {
  width: 20%;
  margin-top: 1rem;
}

.switch span {
  color: #ccc;
  font-size: 1.4rem;
}
.switch span.active {
  color: rgb(181, 154, 254);
}
#lbutton {
  color: rgb(223, 120, 103);
  background: linear-gradient(90deg, rgb(181, 154, 254), rgb(245, 189, 253));
  width: 20.5%;
  margin-top: 1rem;
  font-size: 1.2rem;
}
#sbutton {
  color: rgb(223, 120, 103);
  background: linear-gradient(90deg, rgb(181, 154, 254), rgb(245, 189, 253));
  width: 20.5%;
  margin-top: 1rem;
  font-size: 1.2rem;
}
.in {
  outline: none;
  width: 100%;
  margin: 1.5rem 0;
  color: rgb(181, 154, 254);
  border: none;
  border-bottom: 1px solid rgb(181, 154, 254);
  font-size: 20px;
}
::-webkit-input-placeholder {
  /* WebKit browsers */
  color: #ccc;
  font-size: 20px;
}
.fade-enter {
  opacity: 0;
}
.fade-enter-active {
  transition: opacity 1s;
  transform: translateY(5px);
}
</style>
