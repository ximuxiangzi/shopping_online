<template>
  <div class="test">
    <button @click="isShow = !isShow">显示/隐藏</button>
    <transition-group
     name='animate__animated animate__bounce'
     enter-active-class="animate__swing"
     leave-active-class="animate__backOutUp"
      appear>
        <h1 v-show="!isShow" class="color" key="1">你好</h1>
        <h1 v-show="isShow" class="color" key="2">小狮子</h1>
      </transition-group>
  </div>
</template>

<script>
import 'animate.css'
export default {
  name: 'demo',
  data(){
   return{
    isShow:true,
   }
  },

  }
</script>

<style scoped>
.color{
  background: orange;
}

</style>
