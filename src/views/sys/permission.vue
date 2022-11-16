<template>
  <div>
      <div id="query">
      <el-form
        :model="queryParams"
        ref="queryForm"
        :inline="true"
        label-width="68px"
      >
        <el-form-item label="菜单名称" prop="projectName">
          <el-input
            v-model="queryParams.permissionName"
            placeholder="请输入菜单名称"
            clearable
            size="small"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            icon="el-icon-search"
            size="mini"
            @click="searchFun()"
            >搜索</el-button
          >
          <el-button icon="el-icon-refresh" size="mini"   @click="resehFun()"
            >重置</el-button
          >
        </el-form-item>
      </el-form>
      <el-row :gutter="10" class="mb8">
        <el-col :span="1.5">
          <el-button
            type="primary"
            plain
            icon="el-icon-plus"
            size="mini"
            >新增</el-button
          >
        </el-col>
      </el-row>
    </div>
    <el-table
      v-loading="loading"
      :data="menuList"
      row-key="id"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="label" label="菜单名称" :show-overflow-tooltip="true" width="160"></el-table-column>
      <el-table-column prop="node.icon" label="图标" align="center" width="100">
        <template slot-scope="scope">
          <svg-icon :icon-class="scope.row.icon"/>
        </template>
      </el-table-column>
      <el-table-column prop="node.orderNum" label="排序" width="60"></el-table-column>
      <el-table-column prop="node.permissionPerms" label="权限标识" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="node.component" label="组件路径" :show-overflow-tooltip="true"></el-table-column>
       <el-table-column prop="node.status" label="状态"  width="80">
        <!-- :formatter="statusFormat" -->
        <template slot-scope="scope">
         <el-tag size="small" :type="scope.row.node.status=='0'?'success':'danger'">{{statusFun(scope.row.node.status)}}</el-tag>
        </template>
       </el-table-column>
       <!-- <el-table-column prop="node.component" label="组件路径" :show-overflow-tooltip="true"></el-table-column> -->
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini"
                     type="text"
                     icon="el-icon-edit"
                     @click="handleUpdate(scope.row)"
          >修改
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-plus"
            @click="handleAdd(scope.row)"
          >新增
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
          >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { permissionList } from '@/api/permission'
export default {
  name: "user_list",
  data() {
    return {
      loading:false,
      // 表格数据
      menuList: [],
      // 查询参数
      queryParams: {
        order: 'asc',
        sort: 'order_num',
        permissionName:""//模糊查询
      },
      statusOptions:[
        { value:0,label:"正常"},
        { value:1,label:"停用"},
      ]
    }
  },
  created(){
    this.list();
  },
  methods:{
    list(){
        this.loading = true;
        permissionList(this.queryParams).then(res => {
            //  this.menuList = this.handleTree(res.data,'menuId')
            this.menuList =res.data;
            this.loading = false;
         });
    },
    /**查询 */
    searchFun(){
         this.list();
    },
     /**重置 */
    resehFun(){
       this.queryParams={
        order: 'asc',
        sort: 'order_num',
        permissionName:""//模糊查询
      }
      this.list();
    },
    /** 状态字典翻译 */
    statusFun(val) {
      const data = this.statusOptions.find(n=>n.value==val)||{};
			return data.label;
    },
  }
};
</script>
<style lang="scss" scoped>

</style>

