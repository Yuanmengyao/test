<template>
  <div>
    <div class="query">
       <van-search
          v-model="mytext"
          show-action
          placeholder="请输入搜索关键词"
          @cancel="onCancel"
        />
      <div v-show="mytext">
        <ul v-if="searchDataList.length">
          <!-- <li >
              {{data.name}}
          </li> -->
          <cinema-item v-for="data in searchDataList" :key="data.cinemaId"
          :data="data"></cinema-item>
        </ul>
        <div v-else>
          没有匹配到影院
        </div>
      </div>
    </div>

    <!-- <div class="distance" >
      <ul>
         <li v-for="" :key="index">
           {{data.name}}
         </li>
      </ul>
    </div> -->

    <van-list v-show="!mytext">
        <van-cell v-for="(data, index) in topDataList" :key="index" :title="data.name" />
    </van-list>
  </div>
</template>

<script>
import cinemaItem from './Cinema/CinemaItem'
import { mapState,mapGetters,mapMutations,mapActions} from 'vuex'
import Vue from 'vue';
import { Search,List,Cell } from 'vant';
Vue.use(List).use(Cell).use(Search)

export default {
  data(){
    return {
      mytext:""
    }
  },
  components:{
    cinemaItem
  },
  methods: {
    ...mapMutations("tabbar",["hide","show"]), //把tabbar命名空间的hide,show 截出
    ...mapActions("cinema",["getCinemaAction"]),
    onCancel(){
      this.$router.back();
    }
  },
  mounted(){
    // this.$store.state.isTabbarShow = false

    // 同步状态 -提交到mutation
    // this.$store.commit("tabbar/hide")
    this.hide();
    // 异步请求
    if(this.cinemaList.length===0){
      this.getCinemaAction();
    }else{
      console.log("search","使用缓存")
    }
  },

  computed: {
    ...mapState("cinema",["cinemaList"]),
    ...mapGetters("cinema",["topDataList"]),
    topDataList(){
      return this.cinemaList.slice(0,5)
    },
    searchDataList(){
      return this.cinemaList.filter(item=>item.name.includes(this.mytext) || item.name.toUpperCase().includes(this.mytext)
      || item.name.toLowerCase().includes(this.mytext))
    }
  },

  destroyed(){
    // console.log("destroyed")
    // this.$store.state.isTabbarShow = true

    // this.$store.commit("tabbar/show")
    this.show();
  }
}
</script>
