<template>
  <div>
      <div class="app-container">
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
          <el-button icon="el-icon-refresh" size="mini"   @click="resetFun()"
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
    </div>
    <el-table
     v-if="refreshTable"
      v-loading="loading"
      :data="menuList"
      row-key="id"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      :default-expand-all="isExpandAll"
      ref="tableMenu"
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
        <template slot-scope="scope">
         <el-tag size="small" :type="scope.row.node.status=='0'?'success':'danger'">{{statusFun(scope.row.node.status)}}</el-tag>
        </template>
       </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" width="200">
        <template slot-scope="scope">
          <el-button size="mini"
                     type="text"
                     icon="el-icon-edit"
                     @click="handleUpdate(scope.row)"
                     v-hasPermi="['sys:permission:update']"
          >修改
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-plus"
            @click="handleAdd(scope.row)"
            v-hasPermi="['sys:permission:add']"
          >新增
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['sys:permission:remove']"
          >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加或修改菜单对话框 -->
    <el-dialog :title="menuDialog.title" :visible.sync="menuDialog.open" width="680px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="上级菜单" prop="parentId">
              <Treeselect
                v-model="form.parentId"
                :options="menuOptions"
                :normalizer="normalizer"
                :show-count="true"
                placeholder="选择上级菜单"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="菜单类型" prop="menuType">
              <el-radio-group v-model="form.menuType">
                <el-radio label="0">目录</el-radio>
                <el-radio label="1">菜单</el-radio>
                <el-radio label="2">按钮</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="24" v-if="form.menuType != '2'">
            <el-form-item label="菜单图标" prop="icon">
              <el-popover
                placement="bottom-start"
                width="460"
                trigger="click"
                @show="$refs['iconSelect'].reset()"
              >
                <IconSelect ref="iconSelect" @selected="selected" />
                <el-input slot="reference" v-model="form.icon" placeholder="点击选择图标" readonly>
                  <svg-icon
                    v-if="form.icon"
                    slot="prefix"
                    :icon-class="form.icon"
                    class="el-input__icon"
                    style="height: 32px;width: 16px;"
                  />
                  <i v-else slot="prefix" class="el-icon-search el-input__icon" />
                </el-input>
              </el-popover>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="菜单名称" prop="permissionName">
              <el-input v-model="form.permissionName" placeholder="请输入菜单名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="显示排序" prop="orderNum">
              <el-input-number v-model="form.orderNum" controls-position="right" :min="0" />
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="form.menuType != '2'">
            <el-form-item prop="path">
              <span slot="label">
                <el-tooltip content="访问的路由地址，如：`user`，如外网地址需内链访问则以`http(s)://`开头" placement="top">
                <i class="el-icon-question"></i>
                </el-tooltip>
                路由地址
              </span>
              <el-input v-model="form.path" placeholder="请输入路由地址" />
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="form.menuType == '1'">
            <el-form-item prop="component">
              <span slot="label">
                <el-tooltip content="访问的组件路径，如：`system/user/index`，默认在`views`目录下" placement="top">
                <i class="el-icon-question"></i>
                </el-tooltip>
                组件路径
              </span>
              <el-input v-model="form.component" placeholder="请输入组件路径" />
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="form.menuType != '0'">
            <el-form-item prop="permissionPerms">
              <el-input v-model="form.permissionPerms" placeholder="请输入权限标识" maxlength="100" />
              <span slot="label">
                <el-tooltip content="控制器中定义的权限字符，如：@PreAuthorize(`@ss.hasPermi('system:user:list')`)" placement="top">
                <i class="el-icon-question"></i>
                </el-tooltip>
                权限字符
              </span>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="form.menuType == '1'">
            <el-form-item prop="query">
              <el-input v-model="form.query" placeholder="请输入路由参数" maxlength="255" />
              <span slot="label">
                <el-tooltip content='访问路由的默认传递参数，如：`{"id": 1, "name": "ry"}`' placement="top">
                <i class="el-icon-question"></i>
                </el-tooltip>
                路由参数
              </span>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="form.menuType != '2'">
            <el-form-item prop="status">
              <span slot="label">
                <el-tooltip content="选择停用则路由将不会出现在侧边栏，也不能被访问" placement="top">
                <i class="el-icon-question"></i>
                </el-tooltip>
                菜单状态
              </span>
              <el-radio-group v-model="form.status">
                <el-radio
                  v-for="dict in statusOptions"
                  :key="dict.value"
                  :label="dict.value"
                >{{dict.label}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { permissionList , permissionAdd , permissionEdit,permissionView , permissionDel } from '@/api/permission'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import IconSelect from "@/components/IconSelect";
export default {
  name: "user_list",
   components: { Treeselect, IconSelect },
  data() {
    return {
      loading:false,
      // 表格数据
      menuList: [],
      tabHeight:"77vh",
      refreshTable:true,//重新渲染表格状态
      isExpandAll:false,//是否展开 默认全部展开
      // 查询参数
      queryParams: {
        order: 'asc',
        sort: 'order_num',
        permissionName:""//模糊查询
      },
      // 菜单新增修改弹窗
      menuDialog:{
         title:"添加菜单",
         open:false,
      },
      statusOptions:[
        { value:'0',label:"正常"},
        { value:'1',label:"停用"},
      ],
      // 显隐状态
       statusHidden:[
        { value:'0',label:"显示"},
        { value:'1',label:"隐藏"},
      ],
         // 表单参数
      form: {},
      // 表单校验
      rules: {
        permissionName: [
          { required: true, message: "菜单名称不能为空", trigger: "blur" }
        ],
        orderNum: [
          { required: true, message: "菜单顺序不能为空", trigger: "blur" }
        ],
        path: [
          { required: true, message: "路由地址不能为空", trigger: "blur" }
        ]
      },
      menuOptions:[],//选择的菜单
    }
  },
  created(){
    this.getList();
  },
  methods:{
    getList(){
        this.loading = true;
        permissionList(this.queryParams).then(res => {
            this.menuList =res.data;
            this.loading = false;
         });
    },
      /** 查询菜单下拉树结构 */
    getTreeselect() {
      permissionList().then(res => {
        this.menuOptions = [];
        const menu = { id: 0, label: '主类目', children: [] };
        menu.children = res.data;
        this.menuOptions.push(menu);
      });
    },
    /**查询 */
    searchFun(){
         this.getList();
    },
     /**重置 */
    resetFun(){
       this.queryParams={
        order: 'asc',
        sort: 'order_num',
        permissionName:""//模糊查询
      }
      this.getList();
    },
    /** 状态字典翻译 */
    statusFun(val) {
      const data = this.statusOptions.find(n=>n.value==val)||{};
			return data.label;
    },
     /** 展开/折叠操作 */
    toggleExpandAll() {
      this.refreshTable = false;
      this.isExpandAll = !this.isExpandAll;
      this.$nextTick(() => {
        this.refreshTable = true;
      });
    },
     /** 转换菜单数据结构 */
    normalizer(node) {
      if (node.children && !node.children.length) {
        delete node.children;
      }
      return {
        id: node.id,
        label: node.label,
        children: node.children
      };
    },
     // 选择图标
    selected(name) {
      this.form.icon = name;
    },
    // 表单重置
    reset() {
      this.form = {
        component:null,//组件路径
        parentId: 0,//父级id
        icon: undefined,//图标
        menuType: '0',//菜单类型（ 0 目录 1菜单 2按钮）
        orderNum: undefined,//显示顺序
        path:null,//路由地址
        permissionId:null,//主键id
        permissionName:"",//名称
        permissionPerms:"",//权限
        status: "0",//菜单状态
      };
      this.resetForm("form");
    },
    /*点击新增 */
    handleAdd(row){
      this.reset();
      this.getTreeselect();
      if (row != null && row.node.permissionId) {
        this.form.parentId = row.node.parentId;
      } else {
        this.form.parentId = 0;
      }
      this.menuDialog={
        title:"新增菜单",
        open:true
      }
    },
    /*点击修改 */
    handleUpdate(row){
      this.reset();
      this.getTreeselect();
      permissionView(row.node.permissionId).then(response => {
        this.form = response.data;
        this.form.menuType = ''+response.data.menuType
        this.menuDialog={
          title:"修改菜单",
          open:true
        }
      });
    },
       /** 提交按钮 */
    submitForm: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.form.menuType = Number(this.form.menuType)
          this.form.parentId = Number(this.form.parentId)
          console.log(this.form)
          if (this.form.permissionId != null) {
            this.getEdit(this.form)
          } else {
            this.getAdd(this.form);
          }
        }
      });
    },
    /**取消提交表单 */
    cancel(){
      this.menuDialog.open = false;
      this.reset();
    },
     /**新增接口 */
    getAdd(data){
         permissionAdd(data).then(res => {
             console.log(res)
             this.$message({ message: '新增成功', type: 'success'});
             this.getList();
             this.menuDialog.open = false;
         });
    },
     /**修改接口 */
    getEdit(data){
         permissionEdit(data).then(res => {
             console.log(res)
             this.$message({ message: '修改成功', type: 'success'});
             this.getList();
             this.menuDialog.open = false;
         });
    },
     /**点击删除 */
    handleDelete(row){
       this.$confirm(`确定删除名为`+row.node.permissionName+`的菜单吗`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          permissionDel(row.node.permissionId)
          this.getList();
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
  }
   
}
</script>
<style lang="scss" scoped>

</style>

