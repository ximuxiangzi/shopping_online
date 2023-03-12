<template>
  <div class="test">
    <button @click="isShow = !isShow">显示/隐藏</button>
    <!--transition 如果有name name='hello' 那么class 开头要用 hello-enter-active    
    appear 一进来就有这个动态-->
    <transition name='hello' appear>
       <h1 v-show="isShow" class="color">你好</h1>
    </transition>
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
.hello-enter-active{
   animation: identifier 1s linear; 
}
.hello-leave-active{
   animation: identifier 1s linear reverse; 
}
@keyframes identifier {
    from{
        transform: translateX(-100%);
    }
    to{
        transform: translateX(0);
    }
}
</style>
