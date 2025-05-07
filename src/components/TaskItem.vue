<template>
  <li :class="['task-item', { 'task-item__completed': todo.completed }]">
    <div class="task-item__content">
      <input
        class="task-item__checkbox"
        type="checkbox"
        :checked="todo.completed"
        @change="toggleTodo(todo)"
      />
      <label class="task-item__label" @dblclick="showEditModal(todo)">
        {{ todo.title }}
      </label>
      <span class="task-item__status">
        {{ todo.completed ? '✅ Выполнено' : '🟡 В процессе' }}
      </span>
      <span class="task-item__date">
        📅 {{ formatDate(todo.createdAt) }}
      </span>

      <button
        class="task-item__action-btn task-item__edit-btn"
        @click="showEditModal(todo)"
        title="Редактировать"
      ></button>
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
    showEditModal(todo) {
      this.$store.commit("setModalTitle", "Редактировать задачу");
      this.$store.commit("setModalTaskTitle", todo.title);
      this.$store.commit("setCurrentTask", todo);
      this.$store.commit("setShowModal", true);
    },
    formatDate(date) {
      if (!date) return 'Дата не указана';
      return new Date(date).toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    },
  },
};
</script>