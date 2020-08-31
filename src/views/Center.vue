<template>
  <div>
    center
    <van-button type="default">默认按钮</van-button>
    <van-button type="primary">主要按钮</van-button>
    <van-button type="info">信息按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger" @click="handleClick()">危险按钮</van-button>


    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item>1</van-swipe-item>
      <van-swipe-item>2</van-swipe-item>
      <van-swipe-item>3</van-swipe-item>
      <van-swipe-item>4</van-swipe-item>
    </van-swipe>

    <el-button>默认按钮</el-button>
    <el-button type="primary">主要按钮</el-button>
    <el-button type="success">成功按钮</el-button>
    <el-button type="info">信息按钮</el-button>
    <el-button type="warning">警告按钮</el-button>
    <el-button type="danger">危险按钮</el-button>

    <el-row>
      <el-col :span="8"><div class="grid-content bg-purple">11111</div></el-col>
      <el-col :span="16"><div class="grid-content bg-purple-light">22222</div></el-col>
    </el-row>


    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-container>
        <el-header>Header</el-header>
        <el-main>Main</el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import Vue from 'vue';
import { Button ,Swipe, SwipeItem} from 'vant';
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Button);

export default {
  methods:{
    handleClick(){
      console.log("click-button")
    }
  },
  //路由的钩子函数
  beforeRouteEnter (to, from, next) {
    // ...
    // console.log("拦截")
    if(localStorage.getItem("token")){
      next()
    }else{
      console.log('重定向到 login页面')
      next("/login")
    }

  },

  beforeRouteUpdate(to,from,next){
    console.log("beforeRouteUpdate","/detail/1111-->/detail/222222")
  },

  beforeRouteLeave (to, from, next) {
    console.log("beforeRouteLeave")
    // ...
    next()
  }
}
</script>
<style lang="scss" scoped>
  .my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}

</style>
