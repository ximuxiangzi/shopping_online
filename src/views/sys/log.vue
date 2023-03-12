<template>
  <div>
    <div id="query">
      <el-form
        :model="queryParams"
        ref="queryForm"
        :inline="true"
        label-width="68px"
      >
        <el-form-item label="功能标题" prop="title">
          <el-input
            v-model="queryParams.title"
            placeholder="请输入功能标题"
            clearable
            size="small"
          />
        </el-form-item>
        <el-form-item label="请求地址" prop="operatingUrl">
          <el-input
            v-model="queryParams.operatingUrl"
            placeholder="请输入请求地址"
            clearable
            size="small"
          />
        </el-form-item>
        <el-form-item label="操作账号" prop="operatingName">
          <el-input
            v-model="queryParams.operatingName"
            placeholder="请输入操作账号"
            clearable
            size="small"
          />
        </el-form-item>
        <el-form-item label="请求方式" prop="requestMethod">
          <el-select
            v-model="queryParams.requestMethod"
            placeholder="请选择请求方式"
            clearable
          >
            <el-option
              v-for="(item, index) in urlmMde"
              :key="index"
              :label="item.label"
              :value="item.label"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select
            v-model="queryParams.status"
            placeholder="请选择状态"
            clearable
          >
            <el-option
              v-for="item in urlState"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            icon="el-icon-search"
            size="mini"
            @click="searchFun()"
            >搜索</el-button
          >
          <el-button icon="el-icon-refresh" size="mini" @click="resetFun()"
            >重置</el-button
          >
        </el-form-item>
      </el-form>
    </div>

    <el-table ref="table" v-loading="loading" :data="tableList">
      <template v-for="(col, index) in columns">
        <el-table-column
          :key="index"
          v-bind="col"
          v-if="col.visible && col.prop !== 'status' && col.prop !== 'businessType'"
          :show-overflow-tooltip="true"
        />
            <el-table-column
          :key="index"
          v-if="col.visible && col.prop === 'status'"
          v-bind="col"
        >
          <template slot-scope="scope">
            <el-tag  :type="scope.row.status==200?'success':'danger'">{{ statusFun(scope.row.status) }}</el-tag>
          </template>
        </el-table-column>
         <el-table-column
          :key="index"
          v-if="col.visible && col.prop === 'businessType'"
          v-bind="col"
        >
          <template slot-scope="scope">
             <el-tag  :type="busintype(scope.row.businessType)">{{ businessTypeFun(scope.row.businessType) }}</el-tag>
          </template>
        </el-table-column>
      </template>

      <el-table-column label="操作" align="center" width="180" :fixed="'right'">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-view"
            @click="handleUpdate(scope.row)" 
            v-hasPermi="['sys:log:edit']"
            >查看</el-button
          >
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['sys:log:remove']"
            >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />
    <el-drawer
      title="查看详情"
     size="50%"
      :visible.sync="drawer"
      direction="rtl"
      :before-close="handleClose"
    >
      <el-descriptions direction="vertical" :column="2" border>
        <el-descriptions-item  label="请求的客户端类型"><el-tag>{{drawerData.browserType}}</el-tag></el-descriptions-item>
        <el-descriptions-item label="	操作系统类型"><el-tag type="danger">{{drawerData.systemType}}</el-tag></el-descriptions-item>
      </el-descriptions>
        <el-descriptions direction="vertical" :column="2" border>
        <el-descriptions-item label="模块标题"><el-tag type="success">{{drawerData.title}}</el-tag></el-descriptions-item>
        <el-descriptions-item label="	请求URL"><el-tag >{{drawerData.operatingUrl}}</el-tag></el-descriptions-item>
      </el-descriptions>
      <el-descriptions direction="vertical" :column="2" border>
        <el-descriptions-item label="请求方式	"><el-tag type="warning">{{drawerData.requestMethod}}</el-tag></el-descriptions-item>
        <el-descriptions-item label="	操作时间"><el-tag type="info">{{drawerData.operatingTime}}</el-tag></el-descriptions-item>
      </el-descriptions>
      <el-descriptions direction="vertical" :column="2" border>
        <el-descriptions-item label="操作人员	"><el-tag type="info">{{drawerData.operatingName}}</el-tag></el-descriptions-item>
        <el-descriptions-item label="	主机地址"><el-tag type="info">{{drawerData.operatingIp}}</el-tag></el-descriptions-item>
      </el-descriptions>
      <el-descriptions direction="vertical" :column="2" border>
        <el-descriptions-item label="操作状态	"><el-tag type="danger">{{drawerData.status}}</el-tag></el-descriptions-item>
        <el-descriptions-item label="	错误信息"><el-tag type="danger">{{drawerData.errorMsg?drawerData.errorMsg:"无错误信息"}}</el-tag></el-descriptions-item>
      </el-descriptions>
      <el-descriptions direction="vertical" :column="2" border>
        <el-descriptions-item label="请求参数	">
          <json-viewer :value="drawerData.operatingParam" copyable></json-viewer>
        </el-descriptions-item>
      </el-descriptions>
      <el-descriptions direction="vertical" :column="2" border>
        <el-descriptions-item label="返回参数	">
          <div v-if="drawerData.jsonResult"><json-viewer :value="drawerData.jsonResult" copyable></json-viewer></div>
             <div v-if="!drawerData.jsonResult">
              <el-tag effect="plain" type="danger">无返回值或未设置捕获返回值</el-tag>
            </div></el-descriptions-item>
      </el-descriptions>
    </el-drawer>
  </div>
</template>
<script>
import { logList, logUser, logView } from "@/api/log";
export default {
  name: "log_list",
  data() {
    return {
      loading: false,
      // 总条数
      total: 0,
      copyType:false,
      drawer: false, //抽屉
      //请求方式
      urlmMde: [
        { value: "0", label: "GET" },
        { value: "1", label: "POST" },
        { value: "2", label: "PUT" },
        { value: "3", label: "DELETE" },
      ],
      //请求方式
      urlState: [
        { value: "200", label: "正常" },
        { value: "500", label: "异常" },
      ],
      // 表格列
      columns: [
        {
          key: 2,
          label: "请求方式",
          prop: "requestMethod",
          align: "center",
          visible: true,
          type: "input",
        },
        {
          key: 3,
          label: "业务类型", //（0其它 1新增 2修改 3删除）
          prop: "businessType",
          align: "center",
          visible: true,
          type: "input",
        },
        {
          key: 4,
          label: "操作时间",
          prop: "operatingTime",
          align: "center",
          visible: true,
          type: "input",
        },
        {
          key: 6,
          label: "功能标题",
          prop: "title",
          align: "center",
          visible: true,
          type: "input",
        },
        {
          key: 7,
          label: "操作人员账号",
          prop: "operatingName",
          align: "center",
          visible: true,
          type: "input",
        },
        {
          key: 8,
          label: "请求Url",
          prop: "operatingUrl",
          align: "center",
          visible: true,
          type: "input",
        },
        {
          key: 9,
          label: "主机地址",
          prop: "operatingIp",
          align: "center",
          visible: true,
          type: "input",
        },
        {
          key: 10,
          label: "请求状态", //状态 200 正常 500 异常
          prop: "status",
          align: "center",
          visible: true,
          type: "input",
        },
      ],
      tableList: [],// 表格数据
      drawerData:{},//详情数据
      inviteCode:"",
      // 查询参数
      queryParams: {
        operatingUrl: "", //请求地址
        operatingName: "", //操作账号
        requestMethod: null, //请求方式
        status: null, //请求状态
        title: "", //功能标题
        pageNum: 1,
        pageSize: 10,
      },
      resIness:[
         {value:0,label:"查看",type:""},
         {value:1,label:"其它",type:"info"},
         {value:2,label:"新增",type:"success"},
         {value:3,label:"修改",type:"warning"},
         {value:4,label:"删除",type:"danger"},
         {value:5,label:"授权",type:"success"},
         {value:6,label:"导出",type:"info"},
         {value:7,label:"导入",type:"success"},
         {value:8,label:"强退",type:"danger"},
         {value:9,label:"生成代码",type:"info"},
         {value:10,label:"清空数据",type:"danger"},
         {value:11,label:"登录",type:"warning"},
         {value:12,label:"登出",type:"danger"},
         {value:13,label:"文件上传",type:"warning"},
      ]
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /**数据 */
    getList() {
      this.loading = true;
      logList(this.queryParams).then((res) => {
        this.tableList = res.data.list;
        this.total = res.data.total;
        this.loading = false;
      });
    },
      /** 状态字典翻译 */
    statusFun(val) {
      const data = this.urlState.find(n=>n.value==val)||{};
			return data.label;
    },
    //业务类型//（0其它 1新增 2修改 3删除）
    businessTypeFun(val){
      const data = this.resIness.find(n=>n.value==val)||{};
			return data.label;
    },
    //颜色
    busintype(val){
      const data = this.resIness.find(n=>n.value==val)||{};
			return data.type;
    },
    /**查询 */
    searchFun() {
      this.getList();
    },
    /**重置 */
    resetFun() {
      this.queryParams = {
        operatingUrl: "", //请求地址
        operatingName: "", //操作账号
        requestMethod: null, //请求方式
        status: null, //请求状态
        title: "", //功能标题
        pageNum: 1,
        pageSize: 10,
      };
      this.getList();
    },
    //点击关闭抽屉
    handleClose(done) {
       done();
      // this.$confirm("确认关闭？")
      //   .then((_) => {
      //     done();
      //   })
      //   .catch(() => {
      //     this.$message({
      //       type: "info",
      //       message: "已取消关闭",
      //     });
      //   });
    },
    /**点击详情 */
    handleUpdate(row) {
        logView(row.operatingId).then((response) => {
          this.drawerData = response.data;
          this.drawer = true;
          });
    },
    /**点击删除 */
    handleDelete(row) {
      this.$confirm(`确定删除该条信息吗`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          logUser(row.operatingId);
          this.getList();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    /**点击copy */
    copyFun(){
      this.copyType = true;
      navigator.clipboard.writeText(this.inviteCode).then(() => {
        this.$toast('复制成功')
         setTimeout(()=>{
         this.copyType = false;
          },3000)
       })
     
    }
  },
};
</script>
<style lang="scss" scoped>
::v-deep .el-descriptions :not(.is-bordered) .el-descriptions-item__cell{
  width:50%;
}
.copy{
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  border-radius: 5px;
  padding: 15px;
  box-sizing: border-box;
  .copyTop{
    text-align: right;
    color: #49b3ff;
  }
  .copyBot{
    color: #42b983;
  }
}
</style>
