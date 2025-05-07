<template>
  <div class="task-list" v-show="todos.length" v-cloak>
    <input
      class="task-list__toggle-all"
      type="checkbox"
      :checked="allDone"
      @change="toggleAll"
    />
    <transition-group name="task" tag="ul" class="task-list__container">
      <TaskItem v-for="todo in filteredTasks" :key="todo.id" :todo="todo" />
    </transition-group>
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
        return !this.$store.state.todos.some((todo) => !todo.completed);
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

<style scoped>
.task-enter-active,
.task-leave-active {
  transition: all 0.5s ease;
}
.task-enter-from,
.task-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.task-leave-active {
  position: absolute;
  width: 100%;
}
.task-move {
  transition: transform 0.5s ease;
}
</style>
