<template>
  <div class="task-header">
    <h1>Список задач</h1>
    <div class="search-box">
      <input
        type="text"
        placeholder="Поиск задач..."
        v-model="searchQuery"
        @input="updateSearch"
      />
      <button @click="addTask">+ Добавить</button>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    searchQuery: {
      get() {
        return this.$store.state.searchQuery
      },
      set(value) {
        this.$store.commit('setSearchQuery', value)
      }
    }
  },
  methods: {
    addTask() {
      const title = prompt('Введите задачу:')
      if (title) {
        this.$store.commit('addTodo', title)
      }
    },
    updateSearch(e) {
      this.searchQuery = e.target.value
    }
  }
}
</script>

<style scoped>
.search-box {
  display: flex;
  gap: 10px;
  margin: 15px 0;
}
input {
  flex-grow: 1;
  padding: 8px;
}
</style>