<template>
  <div class="hello">
    <div class="Flex">
      <div class="flex-1">
        <img
          src="../assets/images/peoplelogo.jpg"
          alt=""
          srcset=""
          class="login"
        />
      </div>
      <div class="flex-4"></div>
      <el-dropdown class="avatar-container right-menu-item hover-effect" :hide-timeout = 1200>
        <div class="flex-1 imageBox posire">
          <el-avatar :src="userInfo.headImgUrl" class="avatar"></el-avatar>
          <span class="name">{{ userInfo.nickName }}</span>
          <el-dropdown-menu slot="dropdown">
      <el-dropdown @command="handleCommand">
      <el-dropdown-item @click.native="Personal"
              >切换角色:{{roleName}}</el-dropdown-item
            >
      <el-dropdown-menu slot="dropdown" class="demo">
        <el-dropdown-item  :command="item" v-for="item in userInfo.roles" :key="item.id"><span>{{item.roleName}}</span></el-dropdown-item>
      </el-dropdown-menu >
    </el-dropdown>
            <el-dropdown-item @click.native="Personal"
              >个人中心</el-dropdown-item
            >
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
import { removeToken } from "@/utils/auth";
import { loginOut,switchRole } from "@/api/login";
module.exports = {
  name: "myhomepagetitle",
  data: function () {
    return {
      userInfo: JSON.parse(this.$store.state.Options.userInfo),
      roleNameRoles:null,
    };
  },
  computed:{
    roleName(){
      console.log(this.roleNameRoles)
      if(this.roleNameRoles === null){
              return this.userInfo.roles[0].roleName
      }else{
        return this.roleNameRoles
      }
    }
  },
  created() {
    // this.getCommand(null);
  },
  methods: {
    /**退出登录 */
    logout() {
      loginOut().then((res) => {
        console.log(res);
        this.$store.commit("Options/my_userInfo", {});
        removeToken();
        this.$router.push({ path: "/login" });
      });
    },
    /**个人中心 */
    Personal() {
      console.log(this.userInfo)
      // this.$router.push({ path: "/home" })
    },
    /*切换角色*/
    handleCommand(row){
       switchRole(row.id).then((res) => {
        console.log(res)
        this.roleIdRoles = row.id
        this.getCommand(row.id)
        this.roleNameRoles = row.roleName
      });
    },
    getCommand(id){
        let dynamicList = [];
        let list = JSON.parse(this.$store.state.Options.userInfo).roles;
        let menuData = list.filter(n=>n.id==id)
        if(id === null){
            dynamicList = list[0].treeNodes;
        }else{
            dynamicList = menuData[0].treeNodes;
        }
        localStorage.setItem('statusMenu','0')
         this.$store.commit('Options/menuData',dynamicList)
        this.$emit('getCommand',dynamicList)
        this.$router.push({path:'/homePage'})
    }
  },
};
</script>
<style lang="scss" scoped>
.hello {
  .login {
    width: 50px;
    height: 60px;
    margin-top: 15px;
    margin-left: 20px;
  }
  .imageHight {
    line-height: 100px;
    text-align: center;
    color: #999999;
  }
  .imageBox {
    .avatar {
      position: relative;
      top: 20px;
    }
    .name {
      position: relative;
      top: 7px;
      left: 15px;
      color: #ffffff;
    }
  }
  .posire{
    position: relative;
  //  &:hover {
  //     .posiab{
  //       display: block;
  //     }
  //   }
  }
  .posiab{
    //  display: none;
     position: absolute;
     left: -135px;
     top: 100px;
     box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    .posiabName{
       padding: 10px;
       box-sizing: border-box;
    }
  }
}

.demo{
  top: 80px !important;
  margin-left: -100%;
  overflow: auto; 
}

.el-popper {
}

</style>
