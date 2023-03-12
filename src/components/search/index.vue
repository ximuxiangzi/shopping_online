<template>
  <div class="container">
   <Search></Search>
    <List></List>
  </div>
</template>

<script>
import Search from './search.vue'
import List from './list.vue'
export default {
  name: 'list',
  data(){
    return{}
  },
 components:{
      Search,List
    }
  }
</script>

<style scoped>
</style>
