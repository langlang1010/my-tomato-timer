<template>
   <div class="outback">
     <p id="title"> tomato 25min</p>
    <div class="content">
    <div class="login-form">
      <img src="../assets/tomato.png">
      <div class="switch">
      <span id="login"  :class="{active:isactive}" @click="change">Login</span><span>/</span>
      <span id="Signup" :class="{active:isactive1}" @click="change1">Signup</span>
      </div>
     <transition name="fade" >
      <div class="txtb"  v-if="showone">    
      <input  placeholder="username" type="text" class="in" >
      <input class="in"  id="passone" type="password"  placeholder="password">
        </div>
     </transition>
     <transition  name="fade">
     <div class="txtb" v-if="show" >    
      <input  placeholder="username" type="text" class="in" >
      <input class="in"  id="passone" type="password"  placeholder="password">
       <input class="in" id="passtwo"   type="password"  placeholder="repeat">
        </div>
     </transition>
        <el-button   id="lbutton" round >Login</el-button>
        
     </div>
    </div>
    </div>
</template>
<script>
import axios from 'axios'
  export default {
    name: 'Login',
    data(){
      return{
            isactive:true,
            isactive1:false,
            show:false,
            showone:true
        
      }
    },
    created(){
        axios.get('/data.json').then((res)=>{
            console.log(res)
        })



    },
    methods:{
      change(){
              this.isactive=!this.isactive
              this.isactive1=!this.isactive1
              if(this.isactive===true){
              this.showone=true
                this.show=false
              }
      },
       change1(){
              this.isactive1=!this.isactive1
              this.isactive=!this.isactive
              if(this.isactive1===true){
              this.show=true
              this.showone=false
         }
       }
     
      }
    
  }
 
</script>
<style scoped>
*{
  margin: 0;
  padding: 0;
}
#title{
  text-align: center;
  position:absolute;
  top:15%;
  left:46%;
  font-size:1rem;
  color:rgb(223,120,103);;
}
.login-form{
  position: relative;
 width: 90rem;
 top: 10%;
 left: 15%;
}
.outback{
 background:linear-gradient(90deg,rgb(181,154,254),rgb(245,189,253));
  width: 100%;
  height: 100vh;
}
.content{
  border-radius: 3rem;
  width:400px;
  height:400px;
  background-color:white;
    position:absolute;
  left:50%;
  top:50%;
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
   transform: translate(-50%, -50%);
  overflow: hidden;
}

.txtb{
 width:20%;
 margin-top: 1rem;

}

.switch span{
  color:#ccc;
  font-size:1.4rem;
}
.switch span.active{
  color:rgb(181,154,254);
}
#lbutton{
  color:#ccc;
  background:linear-gradient(90deg,rgb(181,154,254),rgb(245,189,253));
  width:20.5%;
  margin-top: 1rem;
  font-size:1.2rem;
}
.in{
outline: none;
width:100%;
margin: 1.5rem 0;
color:rgb(181,154,254);
 border:none;
 border-bottom:1px solid rgb(181,154,254);
 font-size:20px;

}
::-webkit-input-placeholder { /* WebKit browsers */
  color: #ccc;
  font-size: 20px;
}
.fade-enter{
  opacity: 0;
}
.fade-enter-active{
  transition:opacity 1s;
  transform: translateY(5px);
}
</style>