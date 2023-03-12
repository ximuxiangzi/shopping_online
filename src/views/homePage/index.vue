<template>
  <div class="hello">
    <el-row :gutter="10">
      <el-col :span="6">
        <el-input v-model="input" placeholder="请输入表名称"></el-input
      ></el-col>
      <el-col :span="4">
        <el-button type="primary" icon="el-icon-download" @click="downFun"
          >下载</el-button
        ></el-col
      >
      <el-col :span="4">
        <el-button type="primary" icon="el-icon-download" @click="downExcelFun"
          >导出Excel</el-button
        ></el-col
      >
    </el-row>

    <StopUpload></StopUpload>
    <!--  v-if="isPersonShow" 异步获取数据以后才会渲染子组件 -->
    <!-- <Person :detail="detail" v-if="isPersonShow" ></Person> -->
    <!-- 子组件做监听解决 -->
    <Person :detail="detail" ></Person>
    <!-- <button @click="atProps">点击传值给子组件</button> -->
  </div>
</template>
<script>
import StopUpload from "@/components/videoDemo/StopUpload.vue";
import { userList } from "@/api/user";
import Person from "@/components/count/person.vue";
export default {
  name: "login",
  data() {
    return {
      input: "",
      detail: 0,
      isPersonShow:false,
      // 查询参数
      queryParams: {
        nickName: "", //用户名
        pageNum: 1,
        pageSize: 10,
      },
    };
  },
  components: {
    StopUpload,
    Person,
  },
  created() {
    this.atProps();
    console.log('我是父组件的created',this.detail)

  },
   beforeMount(){
    console.log('我是父组件的beforeMount',this.detail)
  },
  mounted(){
    console.log('我是父组件的mounted',this.detail)
  },

  methods: {
    /**点击下载 */
    downFun() {
      if (this.input !== "") {
        this.downloadBy("/sys/gen/download", { tableName: this.input });
      } else {
        this.$message({
          message: "请输入表名称",
          type: "warning",
        });
      }
    },
    downExcelFun() {
      this.downloadBy("/sys/file", { pageNum: 10, pageSize: 1 });
    },
    atProps() {
      userList(this.queryParams).then((res) => {
        console.log(res);
        this.detail = res.data.total;
        this.isPersonShow = true
      });
    },
  },
};
</script>

<style scoped></style>
