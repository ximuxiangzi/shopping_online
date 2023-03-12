<template>
  <div class="todo-footer">
    <label>
      <input
        type="checkbox"
        :checked="list.length > 0 && doneTotle === list.length ? true : false"
        @change="checkAll"
      />
    </label>
    <span>
      <span >已完成{{ doneTotle }}</span> / 全部{{ list.length }}
    </span>
    <button class="btn btn-danger" @click="clearAll">清除已完成任务</button>
    <button class="btn btn-danger" @click="someq">绑定事件</button>
    <button class="btn btn-danger" @click="unbind">解绑事件</button>
  </div>
</template>

<script>
export default {
  name: "concent-c",
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    todoCheck: {
      type: Function,
      default: function () {
        return [];
      },
    },
    clear: {
      type: Function,
      default: function () {
        return [];
      },
    },
  },
  computed: {
    doneTotle() {
      return this.list.reduce((pre, crrent) => pre + (crrent.done ? 1 : 0), 0);
    },
  },
  methods: {
    checkAll(e) {
      this.todoCheck(e.target.checked);
    },
    clearAll() {
      this.clear()
    },
    someq(){
      this.$emit('some','someTile')
    },
    unbind(){
        console.log(2)
      this.$off('some')//单个解绑
      // this.$off(['some','aiii'])//多个解绑
      // this.$off()//解绑所有
      // this.$destroy();//销毁组件 事件将不复存在
    }
  },
  data() {
    return {};
  },
};
</script>
