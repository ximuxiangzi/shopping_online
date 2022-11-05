<template>
   <div class="todo-header">
        <input type="text" placeholder="请输入你的任务名称，按回车键确认" v-model="inputTitlt" @keyup.enter="addTodo" />
   </div>
</template>

<script>
import {nanoid} from 'nanoid'
export default {
    name:'concent-a',
    data(){
        return{
           inputTitlt:""
        }
    },
    // props:{
    //     inputTodo:{
    //         type:Function,
    //         default: function(){  return [1,1]    }//默认做的事情
    //     }
    // },
    methods:{
        addTodo(){
            if(!this.inputTitlt.trim()){
              return  this.$message('请输入你的任务名称');
            }else{
                const obj={
                    id:nanoid(),
                    title:this.inputTitlt,
                    done:false,
                }
                this.$emit('inputTodo',obj)
                this.inputTitlt = '';
            }
          
        }
    }
}
</script>
