<template>
  <div class="mphoto">
    <slot></slot>

    <ul>
      <li v-for="(data,index) in list" :key="data" @click="handleClick(index)">
        <img :src="data"/>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: ["list"],

  methods:{
    handleClick(index){
      console.log(index)
      this.$emit("event",index)
    }
  }
}
</script>
<style lang="scss" scoped>

  .mphoto{
    position:fixed;
    top:0;
    left:0;
    width:100%;
    height: 100%;
    background:white;
    z-index:10;

    ul{
      display: flex;
      flex-wrap: wrap;
      position: relative;
      top:40px;
      li{
        width:33.3333%;
        padding: 5px;
        box-sizing: border-box;
        img{
          width: 100%;
        }
      }
    }
  }


</style>
