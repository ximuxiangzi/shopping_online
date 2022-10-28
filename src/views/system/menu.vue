<template>
  <div class="hello">
    我是菜单管理
    <router-link to='/role'>23</router-link>
    <router-link :to="{path:'/role'}" replace>45</router-link>
  </div>
</template>

<script>
export default {
  name: 'login',
  data(){
   return{
    
   }
  }
  }
</script>

<style scoped>

</style>
