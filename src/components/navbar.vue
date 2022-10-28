<template>
  <div>
    <div>{{name | mySlice}}</div>
    <div>{{addAge}}</div>
    <div>{{x}}</div>
    <button @click="up">点我</button>
  </div>
</template>

<script>
import {  cilckmixins } from '../mixin'
export default {
    name:'Navbar',
    data(){
        return{
           addAge:this.age
        }
    },
    // props:['age','sex',]//简单生命props接收
    // props:{
    //     age:Number,
    //     sex:String,
    // }//接收的同时对数据进行类型限制

    props:{
        age:{
            type:Number,//类型
            default:16//默认值
        },
       name:{
            type:String,//类型
            required:true,//必传
        },
    },//接收的同时对数据全面进行限制
   mixins:[cilckmixins]
}
</script>

<style  scoped>

</style>>
