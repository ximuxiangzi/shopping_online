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
      <span>已完成{{ doneTotle }}</span> / 全部{{ list.length }}
    </span>
    <button class="btn btn-danger" @click="clearAll">清除已完成任务</button>
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
  },
  data() {
    return {};
  },
};
</script>
