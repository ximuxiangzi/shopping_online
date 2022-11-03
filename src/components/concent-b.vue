<template>
      <ul class="todo-main">
          <concentItem v-for="todo in list"  :key="todo.id" :todo="todo" :chenkTodo="chenkTodo" :delFun="delFun"></concentItem>
      </ul>
</template>

<script>
import concentItem from './concentItem.vue'
export default {
    name:'concent',
    data(){
      return{
      }
    },
    props:{
         list: {
                type: Array,
                default: () => []
            },
          chenkTodo:{
            type:Function,
            default: function(){  return []    }
          },
           delFun:{
            type:Function,
            default: function(){  return []    }
          }
    },
    components:{
      concentItem
    },
 
}
</script>
