<template>
  <div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
    >
      <template v-for="item in dynamicList">
        <el-submenu v-if="item.children.length" :index="item.key" :key="item.key">
          <template slot="title">
            {{ item.title }}
          </template>
          <el-menu-item
            v-for="(items, key) in item.children"
            :key="key"
            :index="items.key"
          >
            {{ items.name }}
          </el-menu-item>
        </el-submenu>
        <el-menu-item v-else :index="item.key" :key="item.key">
          {{ item.title }}
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
      activeIndex:"1",
      dynamicList: [
        {
          title: "首页",
          key: "1",
          path: "",
          children:[],
        },
        {
          title: "企业动态",
          key: "2",
          path: "",
          children:[],
        },
        {
          title: "核心技术",
          key: "3",
          path: "",
          children: [
            {
              name: "IOT物联网",
              key: "3-1",
              path: "",
            },
          ],
        },
        {
          title: "轨道交通",
          key: "4",
          path: "",
          children: [
            {
              name: "设施设备资产生命周期管理",
              key: "4-1",
              path: "",
            },
            {
              name: "机车整备综合管理",
             key: "4-2",
              path: "",
            },
          ],
        },
        {
          title: "能源电力",
          key: "5",
          path: "",
          children: [
            {
              name: "能源大数据",
              key: "5-1",
              path: "",
            },
            {
              name: "电力主设备知识库",
              key: "5-2",
              path: "",
            },
          ],
        },
         {
          title: "工业制造",
          key: "6",
          path: "",
          children: [
            {
              name: "MES制造执行系统",
              key: "6-1",
              path: "",
            },
            {
              name: "数字化电焊",
              key: "6-2",
              path: "",
            },
          ],
        },
        {
          title: "其他领域",
          key: "7",
          path: "",
          children: [
            {
              name: "智慧社区",
              key: "7-1",
              path: "",
            },
            {
              name: "智慧工地",
              key: "7-2",
              path: "",
            },
          ],
        },
        {
          title: "关于我们",
          key: "8",
          path: "",
          children: [
            {
              name: "企业介绍",
              key: "8-1",
              path: "",
            },
            {
              name: "合作伙伴",
              key: "8-2",
              path: "",
            }
          ],
        },
      ],
    };
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
.el-menu--horizontal>.el-menu-item.is-active{
  width: 100%;
}
</style>
