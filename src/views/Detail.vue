<template>
  <div v-if="filminfo" class="detail">
    <!-- <div class="detailtitle" v-title="40">
      <i class="iconfont icon-back" @click="handleBack()"></i>
      <span>{{filminfo.name}}</span>
    </div> -->
    <m-title v-title="40" @back="handleBack">
      {{filminfo.name}}
    </m-title>
    <!-- m-title， back 事件，  -->


    <img :src="filminfo.poster"/>
    <h4>{{filminfo.name}}{{filminfo.filmType.name}}</h4>
    <p>{{filminfo.premiereAt | dateFilter}}上映</p>
    <div :class="isActive?'synopsis':''">
      {{filminfo.synopsis}}
    </div>
    <button @click="isActive=!isActive">button</button>
    <h4>演职人员</h4>
    <swiper :kerwindata="{
      slidesPerView: 3,
      spaceBetween: 30,
      freeMode: true
    }" kerwinclass="actor">
      <div class="swiper-slide" v-for="(data,index) in filminfo.actors"
      :key="index">
        <img :src="data.avatarAddress"/>
      </div>
    </swiper>
    <h4 @click="isPhotoShow=true">剧照</h4>
    <swiper :kerwindata="{
      slidesPerView: 2,
      spaceBetween: 10,
      freeMode: true
    }" kerwinclass="photo">
      <div class="swiper-slide" v-for="(data,index) in filminfo.photos" :key="data" @click="handlePreview(index)">
        <img :src="data"/>
      </div>
    </swiper>

    <photo v-show="isPhotoShow" :list="filminfo.photos" @event="handlePreview($event)">
      <m-title @back="handlePhotoShow">
        剧照 ( {{filminfo.photos.length}} )
      </m-title>
    </photo>

  </div>
</template>
<script>
import http from '@/util/http'
import swiper from '@/components/Swiper'
import photo from './Detail/Photo'
import Vue from 'vue';
import { ImagePreview,Dialog } from 'vant';
Vue.use(ImagePreview).use(Dialog)

export default {
  // filters:{
  //   //局部
  // },
  data(){
    return {
      filminfo:null,
      isActive:true,
      isShow:false,
      isPhotoShow:false
    }
  },
  components:{
    swiper,
    photo
  },
  methods: {
    handleBack(){
      //this.$router.push("/det")
      this.$router.back() //返回功能
    },
    handlePhotoShow(){
      this.isPhotoShow = false;
    },
    handlePreview(index){
      ImagePreview({
        images: this.filminfo.photos,
        startPosition: index,// 从0
        closeable:true,
        closeIconPosition:"top-left",
        onClose() {
          // do something
        }
      });
    }
  },
  beforeMount(){
    Dialog.confirm({
      title: '该影片没有排期',
      message: '弹窗内容',
      confirmButtonText:"同意",
      cancelButtonText:"拒绝"
    }).then(() => {
      // on confirm
      this.$router.back()
    }).catch(() => {
      // on cancel
    });

  },
  mounted() {
    // this.$router //路由对象
    // this.$route 当前唯一匹配的路由对象
    console.log(this.$route.params.targetid,"利用id去请求接口数据")

    http.request({
      url:`/gateway?filmId=${this.$route.params.targetid}&k=893882`,
      headers:{
        'X-Host': 'mall.film-ticket.film.info'
      }
    }).then(res=>{
      console.log(res.data)
      this.filminfo = res.data.data.film
    })
  }
}
</script>
<style scoped lang="scss">
img{
  width:100%;
}
.synopsis{
  height:40px;
  overflow:hidden;
}
.detail{
  margin-bottom:50px;
}
</style>
