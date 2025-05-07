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
        v-for="todo in todos" 
        :key="todo.id" 
        :todo="todo" 
      />
    </ul>
  </div>
</template>

<script>
import TaskItem from './TaskItem.vue'

export default {
  components: { TaskItem },
  computed: {
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