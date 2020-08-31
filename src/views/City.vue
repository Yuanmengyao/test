<template>
  <div>
    <van-index-bar :index-list="indexList">
      <div v-for="(data,index) in datalist" :key="index">
        <van-index-anchor :index="data.index">{{data.index}}</van-index-anchor>
        <van-cell :title="item.name" v-for="(item,index) in data.list" :key="index" @click="handleClick(item)"/>
      </div>
    </van-index-bar>
  </div>
</template>
<script>
import Vue from 'vue';
import { IndexBar, IndexAnchor } from 'vant';
import http from '@/util/http'
import {mapMutations} from 'vuex'
Vue.use(IndexBar);
Vue.use(IndexAnchor);

export default {
  data(){
    return {
      indexList:[],
      datalist:[]
    }
  },
  mounted(){
    http.request({
      url:"/gateway?k=6373009",
      headers:{
        'X-Host': 'mall.film-ticket.city.list'
      }
    }).then(res=>{
      // console.log(res.data.data.cities)
      this.dataFilter(res.data.data.cities)
    })
  },
  methods:{
    dataFilter(cities){
      // var arr =["A","B","C","D","E"]
      var letterArr = []
      for(var i=65;i<91;i++){
        letterArr.push(String.fromCharCode(i))
      }
      console.log(letterArr)

      //filter 遍历26个字母， 跟cities数据.pinyin.首字母.大写 进行过滤
      var cityArr = []
      for(var j=0;j<letterArr.length;j++){
        // console.log()
        var temparr = cities.filter(item=>item.pinyin.substring(0,1).toUpperCase()===letterArr[j])
        //收集datalist数据
        temparr.length && cityArr.push({
          index:letterArr[j],
          list:temparr
        })

        // 收集indexList，右边的数据
        temparr.length && this.indexList.push(letterArr[j])
      }

      this.datalist = cityArr
    },
    //点击城市处理函数
    handleClick(item){
      // console.log("1111111")

      // 修改vuex 共享的 城市数据
      this.setCityName(item.name)
      this.setCityId(item.cityId)

      // localStoreage
      // localStorage.setItem("cityId",item.cityId)
      // localStorage.setItem("cityName",item.name)

      this.$router.back();
    },

    ...mapMutations("city",["setCityName","setCityId"]) //city命名空间中，取出setCityName
  }
}
</script>
