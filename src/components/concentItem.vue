<template>
  <li class="li">
    <label>
      <input type="checkbox" :checked="todo.done" @change="handlecheckd(todo.id)"/>
      <!-- <input type="checkbox" v-model="todo.done" /> -->
      <span>{{ todo.title }}</span>
    </label>
    <button class="btn btn-danger" @click="del(todo)" :delFun="delFun">删除</button>
  </li>
</template>

<script>
export default {
  name: "concentItem",
  props: {
    todo: {
      type: Object,
      default: () => {},
    },
    chenkTodo:{
        type:Function,
        default: function(){  return []    }
    },
    delFun:{
        type:Function,
        default: function(){  return []    }
    },
  },
  data() {
    return {};
  },
  methods: {
      handlecheckd(id){
        this.chenkTodo(id)
    },
     del(todo) {
        this.$confirm(`确定删除名为`+todo.title+`的事件吗`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.delFun(todo.id)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      }
  },
};
</script>
<style scoped lang="scss">
    .btn-danger{
      display: none !important;
    }
    .li:hover{
      background: #e2e2e2 ;
      .btn-danger{
        display: block !important;
      }
    }
</style>