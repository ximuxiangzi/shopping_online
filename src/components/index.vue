<template>
  <div class="">
    <el-container>
      <el-header style="height: 100px; background: #545c64">
        <HomePageTitle @getCommand="getCommand"></HomePageTitle>
      </el-header>
      <el-container>
        <el-aside width="220px">
          <Menu :dynamicList="data"></Menu>
        </el-aside>
        <el-container>
          <el-main>
            <Main></Main>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Main from './main'
import HomePageTitle from './homePageTitle'
import Menu  from './menu'
export default {
  name: "login",
  data() {
    return {
      data:[],
    };
  },
   methods:{
     getCommand(val){
       this.data =val
     }
   },
  created(){
      this.data= JSON.parse(this.$store.state.Options.menuData)
  },
  components:{
    Main,
    HomePageTitle,
    Menu,
  }
};
</script>

<style scoped>
.el-main {
  height: 89vh;
}
</style>
