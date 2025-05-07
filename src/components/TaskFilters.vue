<template>
  <div class="task-filters">
    <button
      @click="setVisibility('all')"
      :class="{ active: visibility === 'all' }"
    >
      Все ({{ total }})
    </button>
    <button
      @click="setVisibility('active')"
      :class="{ active: visibility === 'active' }"
    >
      Активные ({{ activeCount }})
    </button>
    <button
      @click="setVisibility('completed')"
      :class="{ active: visibility === 'completed' }"
    >
      Выполненные ({{ completedCount }})
    </button>
  </div>
</template>

<script>
export default {
  computed: {
    visibility() {
      return this.$store.state.visibility
    },
    todos() {
      return this.$store.state.todos
    },
    total() {
      return this.todos.length
    },
    activeCount() {
      return this.todos.filter(t => !t.completed).length
    },
    completedCount() {
      return this.todos.filter(t => t.completed).length
    }
  },
  methods: {
    setVisibility(filter) {
      this.$store.commit('setVisibility', filter)
    }
  }
}
</script>

<style scoped>
.task-filters {
  display: flex;
  gap: 10px;
  margin: 15px 0;
}
button.active {
  font-weight: bold;
  text-decoration: underline;
}
</style>