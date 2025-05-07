import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todos: [
      { id: 1, title: 'Первая задача', completed: false },
      { id: 2, title: 'Вторая задача', completed: true }
    ]
  },
  mutations: {
    addTodo(state, title) {
      state.todos.push({
        id: Date.now(), // Простой уникальный ID
        title,
        completed: false
      });
    },
    toggleTodo(state, todo) {
      todo.completed = !todo.completed;
    },
    deleteTask(state, todo) {
      state.todos = state.todos.filter(t => t.id !== todo.id);
    }
  }
})