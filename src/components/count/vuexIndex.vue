<template>
  <div class="count">
      <h1>当前求和:{{sum}}</h1>
      <h2>当前求和放大10倍:{{bigSum}}</h2>
      <h2>下方组建的总人数是:{{personList.length}}</h2>
      <select v-model="n">
        <option :value="1">1</option>
        <option :value="2">2</option>
        <option :value="3">3</option>
      </select>
      <button @click="increment(n)">+</button>
      <button @click="decrement(n)">-</button>
      <button @click="incrementOdd(n)">当前求和数为奇数再加</button>
      <button @click="incrementWait(n)">等一等在加</button>
  </div>
</template>

<script>
import { mapState , mapGetters ,mapMutations,mapActions} from 'vuex'
export default {
  name: 'count',
  data(){
    return{
        n:1,//用户选择的数字
    }
  },
  //  Options,
  // personOptions
  //计算属性优化
  computed:{
    //使用mapState 生成计算属性 从state中提取数据 {对象写法}
    // ...mapState({sum:'sum'}),

    //使用mapState 生成计算属性 从state中提取数据 [数组写法]
    // ...mapState(['Options','personOptions']),//找到store里的对象 需要页面里的再点出你想要的每个值
    ...mapState('Options',['sum']),//找到store里的对象 需要页面里的再点出你想要的每个值
    ...mapState('personOptions',['personList']),//找到store里的对象 需要页面里的再点出你想要的每个值
    //mapGetters 生成计算属性 从getters中提取数据 {对象写法}
    // ...mapGetters({bigSum:'bigSum'}),

    //mapGetters 生成计算属性 从getters中提取数据 {数组写法}
    ...mapGetters('Options',['bigSum']),

    
  },
  methods:{
    //自己写的调用方法
    //  increment(){
    //   this.$store.commit('JIA',this.n)
    //  },
    //   decrement(){
    //     this.$store.commit('JIAN',this.n)
    //  },
    //借助mapMutations生成对应的方法方法中会调用commit 调用mutations 需要在函数页面中传参{对象写法}
     ...mapMutations('Options',{increment:'JIA',decrement:'JIAN',}),
     //借助mapMutations生成对应的方法方法中会调用commit 调用mutations 需要在函数页面中传参{数组}
    //  ...mapMutations(['JIA','JIAN']),//方法名要一致


    //自己写的调用方法
    //   incrementOdd(){
    //     this.$store.dispatch('jiaOdd',this.n)
    //  },
    //   incrementWait(){
    //     this.$store.dispatch('jiaWait',this.n)
      
    //  },

       //借助mmapActions生成对应的方法方法中会调用dispatch 调用Actions 需要在函数页面中传参{对象写法}
     ...mapActions('Options',{incrementOdd:'jiaOdd',incrementWait:'jiaWait',}),
     //借助mapActions生成对应的方法方法中会调用dispatch 调用Actions 需要在函数页面中传参{数组}
    //  ...mapActions(['jiaOdd','jiaWait']),//方法名要一致
  },
  mounted(){
  }

  }
</script>

<style scoped>

</style>
