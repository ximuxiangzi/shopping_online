<template>
  <div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      @select="handleSelect"
    >
      <template v-for="item in dynamicList">
        <!-- <el-submenu v-if="item.children.length  && item.node.menuType == 0" :index="item.node.path" :key="item.id"  >
          <template slot="title">
            {{ item.label }}
          </template>
          <el-menu-item
            v-for="(items, index) in item.children"
            :key="items.id"
            :index="items.node.path"
          >
            {{ items.label }}
          </el-menu-item>
        </el-submenu> -->
        <!-- <el-menu-item v-else :index="item.id" :key="item.id">
          {{ item.label }}
        </el-menu-item> -->
         <el-menu-item
            v-for="(items) in item.children"
            :key="items.node.path"
            :index="items.node.path"
          >
            <template v-if="items.node.menuType == 1">
                {{ items.label }}
           </template>
          </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "Menu",
  data() {
    return {
      activeIndex:"/home",
      
    };
  },
  computed:{
    //菜单
    dynamicList(){
      let userInfoList = JSON.parse(this.$store.state.userInfo).roles[0].treeNodes
      let setChildren ={
                label:"首页",
                parentId: "4",
                node:{
                  menuType:1,
                  path:'/home',
                  }
        }
      userInfoList.forEach(e => {
       e.children.unshift(setChildren);
      });
      return  userInfoList
    }
  },
  methods: {
    // 菜单选择事件
    handleSelect(key) {
       this.activeIndex = key;
       this.$router.push({ path: key });
    }
  },
  
};
</script>
<style lang="scss" scoped>
.el-menu-demo{
  height: calc(100vh - 100px);
}
.el-menu--horizontal>.el-menu-item.is-active{
  width: 100%;
}
</style>
