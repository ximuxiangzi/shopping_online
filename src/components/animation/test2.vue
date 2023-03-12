<template>
  <div class="test">
    <button @click="isShow = !isShow">显示/隐藏</button>
    <!--transition 如果有name name='hello' 那么class 开头要用 hello-enter-active    
    appear 一进来就有这个动态-->
    <transition name='hello' appear>
        <h1 v-show="isShow" class="color">你好</h1>
    </transition>
    <transition-group name='hello' appear>
        <h1 v-show="!isShow" class="color" key="1">你好</h1>
        <h1 v-show="isShow" class="color" key="2">小狮子</h1>
      </transition-group>
  </div>
</template>

<script>
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
/* 进入的起点 进入的终点*/
.hello-enter,.hello-leave-to{
    transform: translateX(-100%);
}
/* 进入的终点 离开的起点*/
.hello-enter-to,.hello-leave{
    transform: translateX(0);
}
/* 动画持续事件*/
.hello-enter-active,.hello-leave-active{
     transition: 1s linear;
}

</style>
