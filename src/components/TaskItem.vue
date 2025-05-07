<template>
  <li :class="['task-item', { 'task-item__completed': todo.completed }]">
    <div class="task-item__content">
      <input
        type="checkbox"
        :checked="todo.completed"
        @change="toggleTodo(todo)"
      />
      <label @dblclick="handleEdit">
        {{ todo.title }}
        <span class="task-date">
          📅 {{ formatDate(todo.createdAt) }}
        </span>
      </label>
      <button @click="deleteTask(todo)" title="Удалить">×</button>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    todo: {
      type: Object,
      required: true
    }
  },
  methods: {
    toggleTodo(todo) {
      this.$store.commit('toggleTodo', todo)
    },
    deleteTask(todo) {
      this.$store.commit('deleteTask', todo)
    },
    handleEdit() {
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      })
    }
  }
}
</script>