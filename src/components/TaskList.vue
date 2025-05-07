<template>
  <div class="task-list" v-show="todos.length" v-cloak>
    <ul class="task-list__container">
      <TaskItem v-for="todo in todos" :key="todo.id" :todo="todo" />
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
  },
};
</script>