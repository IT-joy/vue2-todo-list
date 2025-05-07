<template>
  <div class="task-list">
    <div v-if="todos.length" class="toggle-all-container">
      <input
        type="checkbox"
        :checked="allCompleted"
        @change="toggleAll"
      />
      <label>Отметить все</label>
    </div>
    
    <ul>
      <TaskItem 
        v-for="todo in filteredTasks" 
        :key="todo.id" 
        :todo="todo" 
      />
    </ul>
    <p v-if="!filteredTasks.length">Задачи не найдены</p>
  </div>
</template>

<script>
import TaskItem from './TaskItem.vue'

export default {
  components: { TaskItem },
  computed: {
    filteredTasks() {
      return this.$store.getters.filteredTasks
    },
    todos() {
      return this.$store.state.todos
    },
    allCompleted() {
      return this.todos.every(todo => todo.completed)
    }
  },
  methods: {
    toggleAll(e) {
      this.todos.forEach(todo => {
        this.$store.commit('toggleTodo', todo)
      })
    }
  }
}
</script>