<template>
  <div class="hello">
    我是菜单管理
    <router-link to="/role">23</router-link>
    <router-link :to="{ path: '/role' }" replace>45</router-link>
    <!-- 路由跳转并携带query参数，to的字符串写法 -->
    <router-link :to="`/role?n=${n}&m=${m}`">23</router-link>
    <!-- 路由跳转并携带query参数，to的对象写法 -->
    <router-link
      :to="{
        path: '/role',
        query: {
          n: n,
          m: m,
        },
      }"
      >23</router-link
    >

    <!-- replace 替换 用于点击跳转地址被替换掉了 替换掉当前记录 不能再后退了 -->
    <!-- 路由跳转并携带params参数，to的字符串写法   需要在roter 中：n 声明接收配置-->
    <router-link replace :to="`/role/n=${n}&m=${m}`">23</router-link>
    <!-- 路由跳转并携带params参数，to的对象写法 -->
    <router-link
      :to="{
        name: '/role', //只能写name 不能使用path
        params: {
          n: n,
          m: m,
        },
      }"
      >23</router-link
    >

    <button @click="pushCilck">push</button>
    <button @click="replaceCilck">replace</button>
    <button @click="back">路由回退</button>
    <button @click="forword">路由前进</button>
    <button @click="go">测试go</button>
  </div>
</template>

<script>
export default {
  name: "systemMenu",
  data() {
    return {
      n: "we",
      m: "er",
    };
  },
  methods: {
    //加一的动作
    pushCilck() {
      this.$router.push({
        path: "/role",
        query: {
          n: this.n,
          m: this.m,
        },
      });
    },
    //替换的动作
    replaceCilck() {
      this.$router.push({
        path: "/role",
        query: {
          n: this.n,
          m: this.m,
        },
      });
    },
    //路由回退
    back() {
      this.$router.back();
    },
    //路由前进
    forword() {
      this.$router.forword();
    },
    // 可前进可后退
    go(){
      this.$router.go(-1);//后退一步
      // this.$router.go(2)//前进两步

    }
  },
};
</script>

<style scoped></style>
