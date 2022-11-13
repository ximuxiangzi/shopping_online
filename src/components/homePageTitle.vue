<template>
  <div class="hello" >
    <div class="Flex">
      <div class="flex-1">
        <img
          src="../assets/images/peoplelogo.jpg"
          alt=""
          srcset=""
          class="login" />
      </div>
     <div class= "flex-5"></div>
      <el-dropdown class="avatar-container right-menu-item hover-effect">
     <div class="flex-1 imageBox">
       <el-avatar :src="userInfo.headImgUrl" class="avatar"></el-avatar>
         <span class="name">{{userInfo.nickName}}</span>
          <el-dropdown-menu slot="dropdown">
             <!-- <router-link to=""> -->
              <el-dropdown-item @click.native="Personal ">个人中心</el-dropdown-item>
            <!-- </router-link> -->
            <el-dropdown-item divided @click.native="logout">
              <span>退出登录</span>
            </el-dropdown-item>
          </el-dropdown-menu>
           </div>
        </el-dropdown>
 
    </div>
  </div>
</template>
<script>
import {removeToken} from '@/utils/auth'
import {loginOut} from '@/api/login'
module.exports = {
  name: "myhomepagetitle",
  data: function () {
    return {
      userInfo:JSON.parse(this.$store.state.userInfo)
    };
  },

  methods: {
    /**退出登录 */
    logout(){
         loginOut().then(res => {
            console.log(res)
            this.$store.commit("my_userInfo",{});
            removeToken()
            this.$router.push({ path: "/login" })
         });
    },
    /**个人中心 */
    Personal(){
      this.$router.push({ path: "/home" })
    }
  },
};
</script>
<style lang="scss" scoped>
.hello{
  .login {
    width: 50px;
    height: 60px;
    margin-top: 15px;
    margin-left: 20px;
}
.imageBox{
   .avatar{
      position: relative;
      top: 20px;
   }
   .name{
      position: relative;
      top: 7px;
      left: 15px;
      color: #ffffff;
   }
}

}

</style>
