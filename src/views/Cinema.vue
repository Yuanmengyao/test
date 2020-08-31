<template>
  <div>
    <div class="title">
        <div class="left" @click="handleChangePage('/city')">{{cityName}}</div>
        <div>影院</div>
        <div class="right" ><i class="iconfont icon-search" @click="handleChangePage('/cinema/search')"></i></div>
    </div>

    <div class="select">
        <div @click="isAreaShow=!isAreaShow" :class="isAreaShow?'active':''">{{current}}</div>
        <div>App订票</div>
        <div>最近去过</div>
    </div>

    <div class="area" v-show="isAreaShow">
      <ul>
        <li v-for="data in arealist" :key="data" @click="handleArea(data)"
        :class="data===current?'active':''">
          {{data}}
        </li>
      </ul>
    </div>

    <div class="content" :style="{height:scrollHeight}">
        <ul>
          <cinema-item v-for="data in computedDatalist" :key="data.cinemaId"
          :data="data" @click.native="handleClick(data.cinemaId)"
          ></cinema-item>
        </ul>
    </div>
  </div>
</template>
<script>
import cinemaItem from './Cinema/CinemaItem'
import { mapState,mapMutations } from 'vuex' //mapState 是vuex提供的切割函数，
import Vue from 'vue';
import { Toast } from 'vant';
import BetterScroll from 'better-scroll'
Vue.use(Toast);

export default {
  data(){
    return {
      // datalist:[],
      isAreaShow:false,
      current:"全城",//选中是哪个区
      scrollHeight:"0px"
    }
  },
  components:{
    cinemaItem
  },

  beforeMount(){
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      overlay:true, //是否显示背景遮罩层
      duration:0 //不会消失
    });
  },
  mounted(){
    this.scrollHeight = document.documentElement.clientHeight-80-50+"px"
    //初始化betterscroll
    new BetterScroll(".content",{
       scrollbar: {
        fade: true,
        interactive: false // 1.8.0 新增
       },
       click:true //支持click事件
    })

   // disptch 到 vuex中action
   if(this.cinemaList.length===0){
     this.$store.dispatch("cinema/getCinemaAction",this.cityId).then(res=>{
       console.log("异步结束，已经存到vuex")
       Toast.clear();
     })
   }else{
     console.log("cinema","使用缓存")
     Toast.clear();
   }
  },
  methods: {
    handleArea(data){
      //改变current值， current值改变， 计算属性自动计算一遍
      this.current = data;
      this.isAreaShow = false;
    },
    handleChangePage(path){
      if(path === '/city'){
        //清空共享状态 vuex cinemaList
        this.setCinemaList([]);
      }
      this.$router.push(path) //跳转路径
    },

    handleClick(id){
      console.log(id)
    },

    ...mapMutations("cinema",["setCinemaList"])
  },



  computed: {
    ...mapState("cinema",["cinemaList"]),
    ...mapState("city",["cityName","cityId"]),
    //所有区的计算属性
    arealist(){
      //对象=>里面的某个属性
      var newarr = this.cinemaList.map(item=>item.districtName)
      //利用set结构进行数组去重，Array.from 把类数组结构转换成数组结构
      var arealist =["全城",...Array.from(new Set(newarr))]
      return arealist
    },
    //根据选择的不同区域，过滤出相应区域的影院
    computedDatalist(){
      if(this.current ==="全城") return this.cinemaList
      return this.cinemaList.filter(item=>item.districtName===this.current)
    }
  },
}
// var obj = {
//   cinemaList:function(){

//   }
// }

// computed:{
//   ...obj,
//   // cinemaList(){

//   // },
//   a(){

//   }
// }
</script>
<style lang="scss" scoped>
  .active{
    border:1px solid red !important;
  }
  .title{
    display: flex;
    position:fixed;
    top:0px;
    left:0px;
    width: 100%;
    height: 40px;
    line-height: 40px;
    background: white;
    z-index:10;
    div{
      flex:1;
      text-align: center;
    }
    .left{
      text-align: left;
    }
    .right{
      text-align: right;
    }
  }

  .select{
    display: flex;
    position:fixed;
    top:40px;
    left:0px;
    width: 100%;
    height: 40px;
    line-height: 40px;
    background: white;
    z-index: 10;
    div{
      flex:1;
      text-align: center;
    }
  }
  .content{
    position: relative;
    top:80px;
    height:300px;
    overflow:hidden;
  }

  .area{
    position:fixed;
    top:80px;
    left:0px;
    width: 100%;
    background: white;
    z-index:10;
    ul{
      display: flex;
      flex-wrap: wrap;
      li{
        width: 25%;
        padding:5px;
        box-sizing: border-box;
        text-align: center;
        // border:1px solid gray;
      }
    }
  }

</style>
