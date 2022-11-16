<template>
  <div>
      <div id="query">
      <el-form
        :model="queryParams"
        ref="queryForm"
        :inline="true"
        label-width="68px"
      >
        <el-form-item label="用户名" prop="projectName">
          <el-input
            v-model="queryParams.projectName"
            placeholder="请输入用户名称"
            clearable
            size="small"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            icon="el-icon-search"
            size="mini"
            >搜索</el-button
          >
          <el-button icon="el-icon-refresh" size="mini" 
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
      ref="table"
      v-loading="loading"
      :data="tableList"
    >
      <el-table-column label="序号" type="index" width="50" align="center">
        <template slot-scope="scope">
          <span>{{
            (queryParams.pageNum - 1) * queryParams.pageSize + scope.$index + 1
          }}</span>
        </template>
      </el-table-column>

      <template v-for="(col, index) in columns">
        <el-table-column
          :key="index"
          v-if="(col.visible && col.prop !== 'headImgUrl') && (col.visible && col.prop !== 'sex') "
          v-bind="col"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          :key="index"
          v-if="col.visible && col.prop === 'headImgUrl'"
          v-bind="col"
        >
          <template slot-scope="scope">
            <el-avatar :src="scope.row.headImgUrl"></el-avatar>
          </template>
        </el-table-column>
        <el-table-column
          :key="index"
          v-if="col.visible && col.prop === 'sex'"
          v-bind="col"
        >
          <template slot-scope="scope">
            <span>{{scope.row.sex == 1?'男':'女'}}</span>
          </template>
        </el-table-column>
      </template>

      <el-table-column
        label="显示顺序"
        align="center"
        width="120"
        :fixed="'right'"
      >
        <template slot-scope="scope">
          <el-button-group>
            <el-button
              size="mini"
              plain
              icon="el-icon-sort-down"
            ></el-button>
            <el-button
              size="mini"
              plain
              icon="el-icon-sort-up"
            ></el-button>
          </el-button-group>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" width="180" :fixed="'right'">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-view"
            >预览
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            >修改</el-button
          >
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            >下线</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { userList } from '@/api/user'
export default {
  name: "user_list",
  data() {
    return {
      loading:false,
       // 总条数
      total: 0,
      // 表格高度
      // 表格列
      columns: [
        {
          key: 2,
          label: "用户名",
          prop: "nickName",
          align: "center",
          visible: true,
          type: "input",
        },
        {
          key: 3,
          label: "用户头像",
          prop: "headImgUrl",
          align: "center",
          visible: true,
          type: "input",
        },
        {key: 4, label: '用户手机号', prop: 'mobile', align: 'center', visible: true, type:'input'},
        {
          key: 6,
          label: "用户性别",
          prop: "sex",
          align: "center",
          visible: true,
          type: "input",
        },
        {
          key: 7,
          label: "创建时间",
          prop: "createTime",
          align: "center",
          visible: true,
          type: "input",
        },
        {
          key: 8,
          label: "设备id",
          prop: "tbEqId",
          align: "center",
          visible: false,
          type: "input",
        },
      ],
      // 表格数据
      tableList: [],
      // 查询参数
      queryParams: {
        params: {},
        pageNum: 1,
        pageSize: 10,
      },
      // 表单参数
      form: {},
    }
  },
  created(){
    this.list();
  },
  methods:{
    list(){
        this.loading = true;
        userList(this.queryParams).then(res => {
            this.tableList = res.data.list     
           this.loading = false;
         });
    }
  }
};
</script>
<style lang="scss" scoped>

</style>

