<template>
  <div class="person">
    <h1>人员列表</h1>
    <h1>count组件的求和为{{sum}}</h1>
    <h3>列表中的第一个人的名字是{{firstPersonName}}</h3>

    <input type="text" placeholder="请输入名字" v-model="name">
    <button @click="add">添加</button>
    <button @click="addWang">添加一个姓王的人</button>
    <button @click="addPersonServer">添加一句随机的话</button>
    <ul>
      <li v-for="p in personList " :key="p.id">{{p.name}}</li>
    </ul>
    <div>我是父组件异步传过来的总数:{{this.setDetail}}</div>
  </div>
</template>

<script>
// import {mapState} from 'vuex'
import {nanoid} from 'nanoid'
export default {
  name: 'person',
  props:{
    detail:{
     type:Number, //类型
     default:0 //默认值
    }
  },
  data(){
    return{
        name:"",
        setDetail:0
    }
  },
  watch:{
    detail(newV,oldV){
      console.log(newV,oldV)
      this.setDetail = this.detail+'个'
    }

  },
  computed:{
    personList(){
      return this.$store.state.personOptions.personList
    },
    sum(){
      return this.$store.state.Options.sum
    },
    firstPersonName(){
      return this.$store.getters['personOptions/firstPersonName']
    }
  //  ...mapState(['personList','sum']),
  },
  methods:{
    add(){
      const personObj ={id:nanoid(),name:this.name};
      this.$store.commit('personOptions/APP_PERSON',personObj)
      this.name=''
    },
    // 联系action
    addWang(){
      const personObj ={id:nanoid(),name:this.name};
      this.$store.dispatch('personOptions/addPersonwang',personObj)
      this.name=''
    },
    addPersonServer(){
      this.$store.dispatch('personOptions/addPersonServer')
    }
  },
  created(){
    // this.setDetail = this.detail+'个'
    // console.log('我是子组件的created',this.detail)
  },

  }
</script>

<style scoped>

</style>
