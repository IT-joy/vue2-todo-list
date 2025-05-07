<template>
  <div class="task-creator">
    <h1 class="task-manager__title">Список задач</h1>
    <button
      class="task-creator__add-btn"
      @click="addTask"
      title="Добавить"
    >
      +
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    addTask() {
      this.$store.commit('addTodo', 'Новая задача ' + Date.now());
    },
  },
};
</script>