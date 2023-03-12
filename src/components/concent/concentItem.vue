<template>
<transition name="todo" appear="">
    <li class="li">
    <label>
      <input type="checkbox" :checked="todo.done" @change="handlecheckd(todo.id)"/>
      <span v-show="!todo.isEdit">{{ todo.title }}</span>
      <input v-show="todo.isEdit" type="text" :value="todo.title" 
      @blur="handleBlur(todo,$event)" ref="inputTitle"/>
    </label>
    <button class="btn btn-danger" @click="del(todo)" :delFun="delFun">删除</button>
    <button v-if="!todo.isEdit" class="btn btn-edit" @click="edit(todo)" >编辑</button>
  </li>
</transition>

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
      },
      /*点击编辑*/
      edit(todo){
        //判断对象身上有没有isEdit 如果有 直接改 如果没有 追加一个isEdit
        if(todo.hasOwnProperty('isEdit')){
             todo.isEdit = true
        }else{
          this.$set(todo,'isEdit','true')
        }
        this.$nextTick(()=>{
          this.$refs.inputTitle.focus();
        })
      },
      /**失去焦点事件 */
      handleBlur(todo,e){
        todo.isEdit = false
        if(!e.target.value.trim()){
          return  this.$message.error('输入不能为空');
        }
        this.$bus.$emit('udateTodo',todo.id,e.target.value)
      }
  },
};
</script>
<style scoped lang="scss">
    .btn-danger{
      display: none !important;
    }
    .btn-edit{
        display: none !important;
    }
    .li:hover{
      background: #e2e2e2 ;
      .btn-danger{
        display: block !important;
      }
      .btn-edit{
        display: block !important;
      }
    }
.todo-enter-active{
   animation: identifier 1s linear; 
}
.todo-leave-active{
   animation: identifier 1s linear reverse; 
}
@keyframes identifier {
    from{
        transform: translateX(100%);
    }
    to{
        transform: translateX(0);
    }
}
</style>