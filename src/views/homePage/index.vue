<template>
  <div class="hello">
    <el-row :gutter="10">
        <el-col :span="6"> <el-input v-model="input" placeholder="请输入表名称"></el-input></el-col>
        <el-col :span="4"> <el-button type="primary" icon="el-icon-download" @click="downFun">下载</el-button></el-col>
        <el-col :span="4"> <el-button type="primary" icon="el-icon-download" @click="downExcelFun">导出Excel</el-button></el-col>
    </el-row>
  </div>
</template>
<script>

export default {
  name: "login",
  data() {
    return {
      input:"",
    };
  },
  methods:{
    /**点击下载 */
    downFun(){
      if(this.input !==''){
         this.downloadBy("/sys/gen/download",{tableName:this.input})
      }else{
         this.$message({
          message: '请输入表名称',
          type: 'warning'
        });
      }
    },
    downExcelFun(){
        this.downloadBy("/sys/file",{pageNum:10,pageSize:1})
    }
  }

};
</script>

<style scoped></style>
