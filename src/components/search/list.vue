<template>
  <div class="row">
    <!-- 展示用户信息 -->
      <div v-show="info.users.length>0" class="card" v-for="user in info.users" :key="user.id">
        <a :href="user.html_url" target="_blank">
          <img :src="user.avatar_url" style='width: 100px'/>
        </a>
        <p class="card-text">{{user.login}}</p>
      </div>
      <!-- 展示欢迎词 -->
      <h1 v-show="info.isFirst">欢迎使用</h1>
      <!-- 展示加载中 -->
      <h1 v-show="info.isLoading">加载中</h1>
      <!-- 展示错误信息 -->
      <h1 v-show="info.errMag">{{info.errMag}}</h1>

    </div>
</template>

<script>
export default {
  name: 'list',
  data(){
    return{
        info:{
           users:[],
           isFirst:true,//是否为第一次加载
           isLoading:false,//是否loading
           errMag:"",//错误信息
        }
    }
  },
 mounted(){
    this.$bus.$on('getData',(data)=>{
        this.info = {...this.info,...data}//拓展运算符 合并对象 重名的参数 以后面的覆盖前面的为准
         console.log(this.info ,"我是list组件,收到数据")
    })
  }

  }
</script>

<style scoped>
.album {
  min-height: 50rem; /* Can be removed; just added for demo purposes */
  padding-top: 3rem;
  padding-bottom: 3rem;
  background-color: #f7f7f7;
}

.card {
  float: left;
  width: 33.333%;
  padding: .75rem;
  margin-bottom: 2rem;
  border: 1px solid #efefef;
  text-align: center;
}

.card > img {
  margin-bottom: .75rem;
  border-radius: 100px;
}

.card-text {
  font-size: 85%;
}

</style>
