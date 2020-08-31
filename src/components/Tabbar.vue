<template>
  <nav>
    <!-- <ul>
      <router-link :to="navlist[0]" tag="li" activeClass="kerwinactive">电影</router-link>
      <router-link :to="navlist[1]" tag="li" activeClass="kerwinactive">影院</router-link>
      <router-link :to="navlist[2]" tag="li" activeClass="kerwinactive">我的</router-link>
    </ul> -->
    <ul>
      <router-link tag="li" :to="data.path" v-for="data in navlist"
      :key="data.text" activeClass="kerwinactive">
        <i class="iconfont" :class="data.icon"></i>
        <span>{{data.text}}</span>
      </router-link>
    </ul>
  </nav>
</template>
<script>
export default {
  // a 声明式 导航
  // location.href 编程式导航
  data(){
    return {
      navlist:[
        {
          path:'/film',
          text:'电影1',
          icon:'icon-all'
        },
        {
          path:'/cinema',
          text:'影院1',
          icon:'icon-category'
        },
         {
          path:'/center',
          text:'我的1',
          icon:'icon-account'
        }
      ]
    }
  }
}
</script>
<style lang="scss">
  .kerwinactive{
    color:red;
  }

  nav{
    z-index:10;
    position: fixed;
    left:0px;
    bottom: 0px;
    width: 100%;
    height: 50px;
    background: white;
    ul{
      display: flex;
      li{
        flex:1;
        line-height:25px;
        text-align: center;
        display: flex;
        flex-direction: column;
      }
    }
  }
</style>
