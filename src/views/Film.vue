<template>
  <div>
    <swiper :key="looplist.length">
      <div class="swiper-slide" v-for="data in looplist" :key="data.bannerId">
        <img :src="data.imgUrl"/>
      </div>
    </swiper>
    <div>
      导航栏
    </div>
    <!-- 路由容器 -->
    <router-view></router-view>
  </div>
</template>
<script>
import http from '@/util/http'
import swiper from '@/components/Swiper'
import {mapState} from 'vuex'
export default {
  data(){
    return {
      looplist:[]
    }
  },
  components:{
    swiper //局部注册swiper组件
  },
  computed:{
    ...mapState("city",["cityId"])
  },
  mounted(){
    http.request({
      url:`/gateway?type=2&cityId=${this.cityId}&k=3529285`,
      headers:{
        'X-Host': 'mall.cfg.common-banner'
      }
    }).then(res=>{
      console.log(res.data)
      // var obj = {
      //   bannerId:22222222222,
      //   imgUrl:"https://static.maizuo.com/pc/v5/usr/movie/f046c5d6b2c397a8194ab14dc439d7dd.jpg"
      // }
      // this.looplist = [...res.data.data,obj]
      // console.log(this.looplist)
      if(res.data.data){
        this.looplist= res.data.data
      }
    })
  }
}
</script>
<style lang="scss" scoped>
  .swiper-slide{
    img{
      width: 100%;
    }
  }
</style>
