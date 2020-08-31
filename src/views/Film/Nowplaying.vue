<template>
  <div>
    <ul>
      <li v-for="data in datalist" :key="data.filmId" @click="handleClick(data.filmId)">
        <img :src="data.poster"/>
        <h4>{{data.name}}</h4>
        <p>观众评分:{{data.grade}}</p>
        <p class="actor">主演：{{data.actors | actorFilter}}</p>
      </li>
    </ul>
  </div>
</template>
<script>
import http from '@/util/http'
import {mapState} from 'vuex'
export default {
  data(){
    return {
      datalist:[]
    }
  },
  computed:{
    ...mapState("city",["cityId"])
  },
  mounted() {
    http.request({
      url:`/gateway?cityId=${this.cityId}&pageNum=1&pageSize=10&type=1&k=8317728`,
      headers:{
        'X-Host': 'mall.film-ticket.film.list'
      }
    }).then(res=>{
      console.log(res.data)
      this.datalist = res.data.data.films
    })
  },
  methods: {
    handleClick(id){
      // console.log()
      this.$router.push(`/detail/${id}`) //切换页面
    }
  },
}
</script>
<style lang="scss" scoped>
li{
  overflow: hidden;
  padding: 5px;
  img{
    float: left;
    width: 100px;
  }

  .actor{
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow:hidden;
  }
}
</style>
