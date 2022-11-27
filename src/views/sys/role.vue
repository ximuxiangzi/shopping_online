<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      size="small"
      :inline="true"
      v-show="showSearch"
    >
      <el-form-item label="角色名称" prop="roleName">
        <el-input
          v-model="queryParams.roleName"
          placeholder="请输入角色名称"
          clearable
          style="width: 240px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="权限字符" prop="roleKey">
        <el-input
          v-model="queryParams.roleKey"
          placeholder="请输入权限字符"
          clearable
          style="width: 240px"
          @keyup.enter.native="handleQuery"
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
          @click="handleAdd(0)"
          >新增</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="info"
          plain
          icon="el-icon-sort"
          size="mini"
          @click="toggleExpandAll()"
          >展开/折叠</el-button
        >
      </el-col>
    </el-row>

    <el-table
      v-if="refreshTable"
      v-loading="loading"
      :data="roleList"
      row-key="id"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      :default-expand-all="isExpandAll"
      ref="tableMenu"
    >
      <el-table-column
        label="角色名称"
        prop="node.roleName"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="权限字符"
        prop="node.roleKey"
        :show-overflow-tooltip="true"
      />
      <el-table-column label="显示顺序" prop="node.roleSort" align="center" />
      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.node.status"
            active-value="0"
            inactive-value="1"
            @change="handleUpdateStatus(scope.row,scope.row.node.status)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column
        label="创建时间"
        align="center"
        prop="createTime"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.node.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
        width="200"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-plus"
            @click="handleAdd(scope.row.node.id)"
            >新增
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            >修改
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

    <!-- 添加或修改角色弹窗 -->
    <el-dialog
      :title="roleDialog.title"
      :visible.sync="roleDialog.open"
      width="500px"
      append-to-body
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="form.roleName" placeholder="请输入角色名称" />
        </el-form-item>
        <el-form-item prop="roleKey">
          <span slot="label">
            <el-tooltip
              content="控制器中定义的权限字符，如：@PreAuthorize(`@ss.hasRole('admin')`)"
              placement="top"
            >
              <i class="el-icon-question"></i>
            </el-tooltip>
            权限字符
          </span>
          <el-input v-model="form.roleKey" placeholder="请输入权限字符" />
        </el-form-item>
        <el-form-item label="角色顺序" prop="roleSort">
          <el-input-number
            v-model="form.roleSort"
            controls-position="right"
            :min="0"
          />
        </el-form-item>
        <el-form-item label="菜单权限">
          <el-checkbox
            v-model="menuExpand"
            @change="handleCheckedTreeExpand($event, 'menu')"
            >展开/折叠</el-checkbox
          >
          <el-checkbox
            v-model="menuNodeAll"
            @change="handleCheckedTreeNodeAll($event, 'menu')"
            >全选/全不选</el-checkbox
          >
          <el-tree
            class="tree-border"
            :data="menuOptions"
            show-checkbox
            ref="menu"
            :check-strictly=true
            node-key="id"
            empty-text="加载中，请稍候"
            :props="defaultProps"
          ></el-tree>
        </el-form-item>
        <el-form-item label="备注">
          <el-input
            v-model="form.remark"
            type="textarea"
            placeholder="请输入内容"
          ></el-input>
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
import { roletreeList, roleAdd, roleEdit, roleView, roleDel } from "@/api/role";
import { permissionList } from "@/api/permission";
export default {
  name: "Role",
  data() {
    return {
      // 遮罩层
      loading: true,
      // 显示搜索条件
      showSearch: true,
      tabHight: "74vh",
      // 角色表格数据
      roleList: [],
      // 日期范围
      dateRange: [],
      roleDialog: {
        title: "新增角色",
        open: false,
      },
      refreshTable: true, //重新渲染表格状态
      isExpandAll: false, //是否展开 默认全部展开
      menuExpand: false,
      menuNodeAll: false,
      // 菜单列表
      menuOptions: [],
      //tree 结构
      defaultProps: {
        children: "children",
        label: "label",
      },
      statusOptions: [
        { value: "0", label: "正常" },
        { value: "1", label: "停用" },
      ],
      // 查询参数
      queryParams: {
        roleName: undefined, //角色名称
        roleKey: undefined, //权限
      },
      //表单
      form: {},
      // 表单校验
      rules: {
        roleName: [
          { required: true, message: "角色名称不能为空", trigger: "blur" },
        ],
        roleKey: [
          { required: true, message: "权限字符不能为空", trigger: "blur" },
        ],
        roleSort: [
          { required: true, message: "角色顺序不能为空", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /**查询 */
    searchFun() {
      this.getList();
    },
    /**重置 */
    resetFun() {
      this.queryParams = {
        roleName: undefined, //角色名称
        roleKey: undefined, //权限
      };
      this.getList();
    },
    /** 查询菜单树结构 */
    getMenuTreeselect(id) {
      permissionList().then((response) => {
        this.menuOptions = response.data;
        if(id){
        console.log(1)
        roleView(id).then((response) => {
        this.form = response.data;
          this.$nextTick(() => {
            this.$refs.menu.setCheckedKeys(response.data.permissionIds);
          });
        });
        }
      });
    },
    // 树权限（展开/折叠）
    handleCheckedTreeExpand(value, type) {
      if (type == "menu") {
        let treeList = this.menuOptions;
        for (let i = 0; i < treeList.length; i++) {
          this.$refs.menu.store.nodesMap[treeList[i].id].expanded = value;
        }
      } else if (type == "dept") {
        let treeList = this.deptOptions;
        for (let i = 0; i < treeList.length; i++) {
          this.$refs.dept.store.nodesMap[treeList[i].id].expanded = value;
        }
      }
    },
    // 树权限（全选/全不选）
    handleCheckedTreeNodeAll(value, type) {
      if (type == "menu") {
        this.$refs.menu.setCheckedNodes(value ? this.menuOptions : []);
      } else if (type == "dept") {
        this.$refs.dept.setCheckedNodes(value ? this.deptOptions : []);
      }
    },
    /** 展开/折叠操作 */
    toggleExpandAll() {
      this.refreshTable = false;
      this.isExpandAll = !this.isExpandAll;
      this.$nextTick(() => {
        this.refreshTable = true;
      });
    },
    /**获取表格数据 */
    getList() {
      this.loading = true;
      roletreeList(this.queryParams).then((res) => {
        this.roleList = res.data;
        this.loading = false;
      });
    },
    // 所有菜单节点数据
    getMenuAllCheckedKeys() {
      // 目前被选中的菜单节点
      let checkedKeys = this.$refs.menu.getCheckedKeys();
      // 半选中的菜单节点
      let halfCheckedKeys = this.$refs.menu.getHalfCheckedKeys();
      checkedKeys.unshift.apply(checkedKeys, halfCheckedKeys);
      return checkedKeys;
    },
    /*点击新增 */
    handleAdd(val) {
      this.reset();
      this.getMenuTreeselect();
      this.form.parentRoleId = val;
      this.roleDialog = {
        title: "新增角色",
        open: true,
      };
    },
    /*点击修改 */
    handleUpdate(row) {
      this.reset();
          this.roleDialog = {
            title: "修改角色",
            open: true,
          };
      this.getMenuTreeselect(row.node.id);
    },
    /** 提交按钮 */
    submitForm: function () {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          console.log(this.form, this.$refs.menu.getCheckedNodes());
          if (this.form.id != null) {
            console.log(this.getMenuAllCheckedKeys());
            this.form.permissionIds = this.getMenuAllCheckedKeys();
            this.getEdit(this.form);
          } else {
            this.form.permissionIds = this.getMenuAllCheckedKeys();
            this.getAdd(this.form);
          }
        }
      });
    },

    /**新增接口 */
    getAdd(data) {
      roleAdd(data).then((res) => {
        console.log(res);
        this.$message({ message: "新增成功", type: "success" });
        this.getList();
        this.roleDialog.open = false;
      });
    },
    /**修改接口 */
    getEdit(data) {
      console.log(data)
      roleEdit(data).then((res) => {
        console.log(res);
        this.$message({ message: "修改成功", type: "success" });
        this.getList();
        this.roleDialog.open = false;
      });
    },
    /**取消提交表单 */
    cancel() {
      this.roleDialog.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      if (this.$refs.menu != undefined) {
        this.$refs.menu.setCheckedKeys([]);
      }
      (this.menuExpand = false),
        (this.menuNodeAll = false),
        (this.form = {
          id: null, //主键id
          parentRoleId: 0, //上级角色id 默认0
          roleName: undefined, //角色名称
          roleKey: undefined, //角色key权限字符
          roleSort: 0, //显示顺序
          remark: undefined, //备注
          permissionIds: [], //菜单组
        });
      this.resetForm("form");
    },
    //状态值
    handleUpdateStatus(row,val){
      this.form.id = row.id
      this.form.status = val
      this.getEdit(this.form)
    },
    /**点击删除 */
    handleDelete(row) {
      this.$confirm(`确定删除名为` + row.node.roleName + `的菜单吗`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          roleDel(row.node.id);
          this.getList();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.el-dropdown {
  color: #409eff !important;
  font-size: 12px !important;
}
.paginationBox {
  text-align: right;
}
</style>
