<template>
  <div class="hello">
    <el-container>
      <el-header style="height:100px;">
        <HomePageTitle :age="age" :name="header"></HomePageTitle>
      </el-header>
      <el-container >
        <el-aside width="220px" >
          <Menu></Menu>
        </el-aside>
        <el-container>
          <el-main style="background:pink;height:300px">
            <Navbar :name="main"></Navbar>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Navbar from '@/components/navbar'
import HomePageTitle from '@/components/homePageTitle'
import Menu  from '@/components/menu'
export default {
  name: "login",
  data() {
    return {
      age:18,
      header:"Header",
      Aside:"Aside",
      main:"Main",
      Footer:"Footer",
    };
  },
  components:{
    Navbar,
    HomePageTitle,
    Menu
  }
};
</script>

<style scoped></style>
