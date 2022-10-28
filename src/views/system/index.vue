<template>
  <div class="hello">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'login',
  data(){
   return{
    
   }
  },
  created(){
    console.log(this.$router)
  }
  }
</script>

<style scoped>

</style>
