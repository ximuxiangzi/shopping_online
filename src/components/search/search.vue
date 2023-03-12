<template>
  <div class="search">
    <section class="jumbotron">
      <h3 class="jumbotron-heading">Search Github Users</h3>
      <div>
        <input type="text" placeholder="enter the name you search" v-model="keyWord" />&nbsp;
        <button @click="getUsers">Search</button>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'search',
  data(){
    return{
        keyWord:'',
    }
  },
  methods:{
    getUsers(){
        //请求前更新list数据
        this.$bus.$emit('getData',{isFirst:false,isLoading:true,errMag:"",users:[]})
        axios.get(`https://api.github.com/search/users?q=${this.keyWord}`).then(
            response=>{
                this.$bus.$emit('getData',{isLoading:false,errMag:"",users:response.data.items})
            },err=>{
                this.$bus.$emit('getData',{isLoading:false,errMag:err.message,users:[]})
            }
        )
        // 使用vue-resource请求{了解即可，官方不维护，主要用axios,}
        //  this.$bus.$emit('getData',{isFirst:false,isLoading:true,errMag:"",users:[]})
        // this.$http.get(`https://api.github.com/search/users?q=${this.keyWord}`).then(
        //     response=>{
        //         this.$bus.$emit('getData',{isLoading:false,errMag:"",users:response.data.items})
        //     },err=>{
        //         this.$bus.$emit('getData',{isLoading:false,errMag:err.message,users:[]})
        //     }
        // )
    }
  },
 

  }
</script>

<style scoped>

</style>
