<template>
  <div class="agent">
    <button @click="getStudents">获取学生信息</button>
     <button @click="getCars">获取汽车信息</button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'agent',
  data(){
    return{}
  },
  methods:{
    getStudents(){
        axios.get('http://localhost:8080/api/students').then(
           res=>{
            console.log(res.data,'成功了')
           },
           err=>{
            console.log(err,'失败了')
           }
        )
    },
    getCars(){
        axios.get('http://localhost:8080/foo/cars').then(
           res=>{
            console.log(res.data,'成功了')
           },
           err=>{
            console.log(err,'失败了')
           }
        )
    }
  }

  }
</script>

<style scoped>

</style>
