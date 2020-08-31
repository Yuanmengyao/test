import Vue from 'vue'
import moment from 'moment'

Vue.filter("dateFilter",function(data){
  return moment(data*1000).format('YYYY-MM-DD')
}) //时间戳 毫秒数

//自定义过滤器  数组====>字符串
Vue.filter("actorFilter",function(data){
  // console.log()
  return data.map(item=>item.name).join(" ")
})
