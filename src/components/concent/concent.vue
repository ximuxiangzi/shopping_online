<template>
  <div id="root">
  <div class="todo-container">
    <div class="todo-wrap">
      <Minput @inputTodo ="inputTodo"></Minput>
      <Mlist :list="list" :chenkTodo="chenkTodo" :delFun="delFun"></Mlist>
      <Mfooter :list="list" v-show="list.length>0" :todoCheck='todoCheck' :clear="clear" @some.once="some" ref="refSome"></Mfooter>
    </div>
  </div>
</div>
</template>

<script>
import Minput from './concent-a.vue'
import Mlist from './concent-b.vue'
import Mfooter from './concent-c.vue'

export default {
    name:'concent',
    data(){
        return{
          list:JSON.parse(localStorage.getItem('listStorage')) || []
        }
    },
    watch:{
        list:{
          deep:true,
          handler(val){
             localStorage.setItem('listStorage',JSON.stringify(val));
          }
        }
    },
    mounted(){
      // this.$refs.refSome.some()
      this.$bus.$on('hello',(data)=>{
           console.log('我是',data)
      })
      
      this.$bus.$on('udateTodo',this.udateTodo)
    },
   methods:{
     inputTodo(obj){
        this.list.unshift(obj)
     },
     chenkTodo(id){
      console.log(id)
        this.list.forEach(n=>{
           if(n.id === id){
            n.done = !n.done
           }
        })
        console.log(this.list)
     },
     delFun(id){
      this.list=this.list.filter(n=>n.id !==id)
      this.$message({
            type: 'success',
            message: '删除成功!'
      });
     },
     todoCheck(done){
        this.list.forEach(n=>{
          n.done =done
        })
     },
     clear(){
      this.list =this.list.filter(n=>n.done !== true)
     },
     some(val){
      console.log(val)
     },
     //更新一个
      udateTodo(id,title){
        this.list.forEach(n=>{
           if(n.id === id){
            n.title = title
           }
        })
     },
   },
    components:{
      Minput,Mlist,Mfooter
    }
}
</script>

<style lang="scss">
  
/*base*/
body {
  background: #fff;
}


.todo-container {
  width: 600px;
  margin: 0 auto;

      .btn {
      display: inline-block;
      padding: 4px 12px;
      margin-bottom: 0;
      font-size: 14px;
      line-height: 20px;
      text-align: center;
      vertical-align: middle;
      cursor: pointer;
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);
      border-radius: 4px;
    }

    .btn-danger {
      color: #fff;
      background-color: #da4f49;
      border: 1px solid #bd362f;
    }

    .btn-danger:hover {
      color: #fff;
      background-color: #bd362f;
    }
    .btn-edit {
      color: #fff;
      background-color: rgb(104, 104, 209);
      border: 1px solid rgb(104, 104, 209);
    }

    .btn-edit:hover {
      color: #fff;
      background-color: rgb(104, 104, 209);
    }
    .btn:focus {
      outline: none;
    }


    .todo-wrap {
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 5px;
    }
    /*header*/
    .todo-header input {
      width: 560px;
      height: 28px;
      font-size: 14px;
      border: 1px solid #ccc;
      border-radius: 4px;
      padding: 4px 7px;
    }

    .todo-header input:focus {
      outline: none;
      border-color: rgba(82, 168, 236, 0.8);
      box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(82, 168, 236, 0.6);
    }

    /*main*/
    .todo-main {
      margin-left: 0px;
      border: 1px solid #ddd;
      border-radius: 2px;
      padding: 0px;
    }

    .todo-empty {
      height: 40px;
      line-height: 40px;
      border: 1px solid #ddd;
      border-radius: 2px;
      padding-left: 5px;
      margin-top: 10px;
    }
    /*item*/
    li {
      list-style: none;
      height: 36px;
      line-height: 36px;
      padding: 0 5px;
      border-bottom: 1px solid #ddd;
    }

    li label {
      float: left;
      cursor: pointer;
    }

    li label li input {
      vertical-align: middle;
      margin-right: 6px;
      position: relative;
      top: -1px;
    }

    li button {
      float: right;
      display: none;
      margin-top: 3px;
    }

    li:before {
      content: initial;
    }

    li:last-child {
      border-bottom: none;
    }

    /*footer*/
    .todo-footer {
      height: 40px;
      line-height: 40px;
      padding-left: 6px;
      margin-top: 5px;
    }

    .todo-footer label {
      display: inline-block;
      margin-right: 20px;
      cursor: pointer;
    }

    .todo-footer label input {
      position: relative;
      top: -1px;
      vertical-align: middle;
      margin-right: 5px;
    }

    .todo-footer button {
      float: right;
      margin-top: 5px;
    }
}


</style>>
