import Vue from 'vue'
import Vuex from 'vuex'
import cinema from './module/cinemaModule'
import tabbar from './module/tabbarshowModule'
import city from './module/cityModule'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

//状态管理(共享)
//缓存数据==>内存， 只要刷新页面，数据就丢了
// 订单，详情，，，不适用vuex缓存数据
/*
  1. 非父子通信的问题
  2. 缓存后端数据，提高用户体验
*/
/*
  注意：
    vuex只能有一个store,
    为了防止多人修改，我们切割成子store, 再合并成唯一一个大的store对象
    模块写法
*/

const store = new Vuex.Store({
  plugins: [createPersistedState({
    reducer(data){
      return {
        city:data.city
      }
    }
  })],
  state: {

  }, // "全局"状态
  mutations:{

  },//唯一修改状态的地方
  //异步处理
  actions:{
  },
  // 对上面的“全局状态”进行数据处理， 类似于vue中的计算属性
  getters:{
  },

  modules:{
    cinema,
    tabbar,
    city
  }
})
export default store
