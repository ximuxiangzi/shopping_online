<template>
  <div id="app">
    <!-- include="systemMenu" 缓存的是哪个名字的组件 不写的话缓存所有组件-->
    <keep-alive include="systemMenu">
       <router-view />
    </keep-alive>

    <!--缓存多个 :include="['systemMenu']" 缓存的是哪个名字的组件 不写的话缓存所有组件-->
    <!-- <keep-alive :include="['systemMenu']">
       <router-view />
    </keep-alive> -->
  </div>
</template>
<script>

export default {
  name: 'App',
  activated(){
    console.log('keep-alive里被激活的钩子')
  },
  deactivated(){
    console.log('keep-alive里失活的钩子')
  }
}
</script>

<style>
body{
   padding:0;
   margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
