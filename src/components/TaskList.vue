<template>
  <div class="task-list" v-show="todos.length" v-cloak>
    <input
      class="task-list__toggle-all"
      type="checkbox"
      :checked="allDone"
      @change="toggleAll"
    />
    <ul class="task-list__container">
      <TaskItem v-for="todo in filteredTasks" :key="todo.id" :todo="todo" />
    </ul>
  </div>
</template>

<script>
import TaskItem from "./TaskItem.vue";

export default {
  components: {
    TaskItem,
  },
  computed: {
    todos() {
      return this.$store.state.todos;
    },
    filteredTasks() {
      return this.$store.getters.filteredTasks;
    },
    allDone: {
      get() {
        return !this.$store.state.todos.some(todo => !todo.completed)
      },
      set(value) {
        this.$store.commit("toggleAll", value);
      },
    },
  },
  methods: {
    toggleAll(e) {
      this.allDone = e.target.checked;
    },
  },
};
</script>