<template>
  <div class="count">
      <h1>当前求和:{{sum}}</h1>
      <h2>当前求和放大10倍:{{bigSum}}</h2>
      <select v-model="n">
        <option :value="1">1</option>
        <option :value="2">2</option>
        <option :value="3">3</option>
      </select>
      <button @click="increment">+</button>
      <button @click="decrement">-</button>
      <button @click="incrementOdd">当前求和数为奇数再加</button>
      <button @click="incrementWait">等一等在加</button>
  </div>
</template>

<script>
import { mapState , mapGetters} from 'vuex'
export default {
  name: 'count',
  data(){
    return{
        n:1,//用户选择的数字
    }
  },
  computed:{
    // 自己写的计算属性
    // sum(){
    //    return this.$store.state.sum
    // },
    //使用mapState 生成计算属性 从state中提取数据 {对象写法}
    // ...mapState({sum:'sum'}),

    //使用mapState 生成计算属性 从state中提取数据 [数组写法]
    ...mapState(['sum']),

    //自己写的getters 计算属性
    // bigSum(){
    //    return this.$store.getters.bigSum
    // },
    //mapGetters 生成计算属性 从getters中提取数据 {对象写法}
    // ...mapGetters({bigSum:'bigSum'}),

    //mapGetters 生成计算属性 从getters中提取数据 {数组写法}
    ...mapGetters(['bigSum']),

    
  },
  methods:{
     increment(){
      this.$store.commit('JIA',this.n)
     },
      decrement(){
        this.$store.commit('JIAN',this.n)
     },
      incrementOdd(){
        this.$store.dispatch('jiaOdd',this.n)
     },
      incrementWait(){
        this.$store.dispatch('jiaWait',this.n)
      
     },
  },
  mounted(){
    const x =mapState({sum:'sum'});
    console.log(x)
  }


  }
</script>

<style scoped>

</style>
