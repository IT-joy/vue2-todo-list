<template>
  <li :class="['task-item', { 'task-item__completed': todo.completed }]">
    <div class="task-item__content">
      <input
        class="task-item__checkbox"
        type="checkbox"
        :checked="todo.completed"
        @change="toggleTodo(todo)"
      />
      <label class="task-item__label">{{ todo.title }}</label>
      <button
        class="task-item__action-btn task-item__delete-btn"
        @click="deleteTask(todo)"
        title="Удалить"
      ></button>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    todo: {
      type: Object,
      required: true,
    },
  },
  methods: {
    toggleTodo(todo) {
      this.$store.commit("toggleTodo", todo);
    },
    deleteTask(todo) {
      this.$store.commit("deleteTask", todo);
    },
  },
};
</script>