<template>
  <div>
    <div id="query">
      <el-form
        :model="queryParams"
        ref="queryForm"
        :inline="true"
        label-width="68px"
      >
        <el-form-item label="用户名" prop="nickName">
          <el-input
            v-model="queryParams.nickName"
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
            @click="searchFun()"
            >搜索</el-button
          >
          <el-button icon="el-icon-refresh" size="mini" @click="resetFun()"
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
            @click="handleAdd()"
            v-hasPermi="['sys:user:add']"
            >新增</el-button
          >
        </el-col>
      </el-row>
    </div>

    <el-table ref="table" v-loading="loading" :data="tableList">
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
          v-if="
            col.visible &&
            col.prop !== 'headImgUrl' &&
            col.visible &&
            col.prop !== 'sex'
          "
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
            <span>{{ scope.row.sex == 1 ? "男" : "女" }}</span>
          </template>
        </el-table-column>
      </template>

      <el-table-column label="操作" align="center" width="180" :fixed="'right'">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['sys:user:update']"
            >修改</el-button
          >
          <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)"
          v-hasPermi="['sys:user:remove']"
            >删除
          </el-button>
          <el-button size="mini" type="text" icon="el-icon-warning-outline" v-show="scope.row.userAccountLoginNum>0" 
             @click="handleDeleteDown(scope.row)"
             v-hasPermi="['system:user:offline']"
            >下线</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加或修改用户配置对话框 -->
    <el-dialog
      :title="userDialog.title"
      :visible.sync="userDialog.open"
      width="600px"
      append-to-body
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="用户名称" prop="nickName">
          <el-input
            v-model="form.nickName"
            placeholder="请输入用户名称"
            maxlength="30"
          />
        </el-form-item>
        <el-form-item label="手机号码" prop="mobile">
          <el-input
            v-model="form.mobile"
            placeholder="请输入手机号码"
            maxlength="11"
          />
        </el-form-item>
        <el-form-item label="性别" prop="sex">
           <el-select v-model="form.sex" placeholder="请选择性别">
                <el-option
                  v-for="dict in sys_user_sex"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value"
                ></el-option>
              </el-select>
        </el-form-item>
        <el-form-item label="关联角色" prop="roleIds">
          <el-tree
            :data="roleOptions"  ref="tree"
                  show-checkbox
                    node-key="id"
                    :check-strictly="true"
                    default-expand-all
                    :expand-on-click-node="false"
                    :props="defaultProps"
                    :render-content="renderContent"
          >
          </el-tree>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { userList , userAdd , userEdit , userView , userDel , delUser} from "@/api/user";
import { roletreeList } from "@/api/role";
export default {
  name: "user_list",
  data() {
    return {
      loading: false,
      // 总条数
      total: 0,
      //弹窗
      userDialog: {
        title: "新增用户",
        open: false,
      },
      //性别
      sys_user_sex:[
        {value:1,label:"男"},
        {value:2,label:"女"},
      ],
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
        {
          key: 4,
          label: "用户手机号",
          prop: "mobile",
          align: "center",
          visible: true,
          type: "input",
        },
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
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
      // 表格数据
      tableList: [],
      // 查询参数
      queryParams: {
        nickName: "", //用户名
        pageNum: 1,
        pageSize: 10,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        nickName: [
          { required: true, message: "用户名称不能为空", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "用户名称长度必须介于 2 和 20 之间",
            trigger: "blur",
          },
        ],
        sex: [{ required: true, message: "性别不能为空", trigger: "blur" },],
        mobile: [
          { required: true, message: "手机号不能为空", trigger: "blur" },
          {
            pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
            message: "请输入正确的手机号码",
            trigger: "blur",
          },
        ],
      },
      roleOptions: [], //权限树结构
    };
  },
  created() {
    this.getList();
  },
  methods: {
    //角色数数据
    roleList(id) {
      console.log(id)
      roletreeList().then((res) => {
        this.treeEach(res.data);
        this.roleOptions = res.data;
        if(id){
           userView(id).then((response) => {
           this.form = response.data.convert;
           console.log( 1,this.form)
          this.$nextTick(() => {
            this.$refs.tree.setCheckedKeys(response.data.convert.roleIds);
          });
      });

        }
       
      });
    },
    treeEach(data){
      (data || []).forEach(n=>{
        n.node.managerType = 0;
          if(n.children){
            this.treeEach(n.children)
          }
      })
    },
    //树节点每层的
    renderContent(h, {node, data}) {
      return (
          <span class="custom-tree-node">
            <span>{node.label}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span>
               <el-button size="mini" type="text"
                          on-click={() => {
                        (data.node.managerType === 0 || undefined === data.node.managerType )? data.node.managerType = 1 : data.node.managerType = 0
                          }}>
                 {(data.node.managerType === 0 || undefined === data.node.managerType )? '非同级管理员' :
                     <span style="color:red">同级管理员</span>}
               </el-button>
            </span>
          </span>);
    },
    getList() {
      this.loading = true;
      userList(this.queryParams).then((res) => {
        this.tableList = res.data.list;
        this.loading = false;
      });
    },
    /**查询 */
    searchFun() {
      this.getList();
    },
    /**重置 */
    resetFun() {
      this.queryParams = {
        nickName: "", //用户名
        pageNum: 1,
        pageSize: 10,
      };
      this.getList();
    },
    /*点击新增 */
    handleAdd() {
      this.reset();
      this.roleList();
      this.userDialog = {
        title: "新增角色",
        open: true,
      };
    },
    /*点击修改 */
    handleUpdate(row) {
      this.reset();
      this.roleList(row.id);
        this.userDialog = {
        title: "修改角色",
        open: true,
      };
    },
    /** 提交按钮 */
    submitForm: function () {
        // userRelationRole: [], //角色组  // {managerType: 0//0 非同级管理员 1 同级管理员, roleId: "84"}
      this.$refs["form"].validate((valid) => {
        if (valid) {
            let nodeList =this.$refs.tree.getCheckedNodes();
            this.form.userRelationRole = [];
            console.log(nodeList);
            (nodeList || []).forEach(n => {
             let json ={
              managerType:n.node.managerType,
              roleId:n.id
             };   
             this.form.userRelationRole.push(json)         
          });
          if (this.form.id != null) {
            this.getEdit(this.form);
           console.log("this.form.id",this.form);
          } else {
            this.getAdd(this.form);
          }
        }
      });
    },
    /**新增接口 */
    getAdd(data) {
      userAdd(data).then((res) => {
        console.log(res);
        this.$message({ message: "新增成功", type: "success" });
        this.getList();
        this.userDialog.open = false;
      });
    },
    /**修改接口 */
    getEdit(data) {
      userEdit(data).then((res) => {
        console.log(res);
        this.$message({ message: "修改成功", type: "success" });
        this.getList();
        this.userDialog.open = false;
      });
    },
    /**取消提交表单 */
    cancel() {
      this.userDialog.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      if (this.$refs.tree != undefined) {
        this.$refs.tree.setCheckedKeys([]);
      }
      this.form = {
        id: null, //主键id
        mobile: null, //手机号码
        nickName: undefined, //用户名称
        sex:null,//性别
        userRelationRole: [], //角色组  // {managerType: 0//0 非同级管理员 1 同级管理员, roleId: "84"}
      };
      this.resetForm("form");
    },
        /**点击删除 */
    handleDelete(row) {
      console.log(row)
      this.$confirm(`确定删除名为` + row.nickName + `的用户吗`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delUser(row.id);
          this.getList();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    /**点击下线 */
    handleDeleteDown(row) {
      this.$confirm(`确定要下线名为` + row.nickName + `的用户吗`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          userDel(row.id);
          this.getList();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消下线该用户",
          });
        });
    },
  },
};
</script>
<style lang="scss" scoped>


.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>
