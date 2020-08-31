<template>
  <div>
    <button @click="handleClick()">登录</button>
  </div>
</template>
<script>
export default {
  methods:{
    handleClick(){
      //ajax
      localStorage.setItem("token",JSON.stringify({isLogin:true}))
      this.$router.push('/center')
    }
  }
}
</script>
