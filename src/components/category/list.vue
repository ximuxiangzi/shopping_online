<template>
  <div class="categorylist">
      <h3>{{title}}分类</h3>
      <!-- 默认插槽 -->
      <slot name="center">我是一个插槽 如果没有传给我东西就会显示这个</slot>
      <!-- 具名插槽 带名字的--> 
       <slot name="footer">我是一个插槽 如果没有传给我东西就会显示这个</slot>
       <!-- 作用域插槽 -->
       <slot :data="data">我是作用域插槽</slot>

  </div>
</template>

<script>

export default {
  name: 'categorylist',
  props:['title'],
  data(){
    return{
      data:["游戏1", "游戏2", "游戏3", "游戏4"],
    }
  },
 components:{
    }
  }
</script>

<style scoped>
.categorylist{
    background: skyblue;
    width: 200px;
    padding: 10px;
    box-sizing: border-box;    
}
h3{
  background: orange;
  text-align: center;
}
</style>
