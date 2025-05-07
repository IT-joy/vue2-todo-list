import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const STORAGE_KEY = 'vue-todo-app'

const todoStorage = {
  fetch() {
    const todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    todos.forEach((todo, index) => {
      todo.id = index + 1
    })
    return todos
  },
  save(todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }
}

export default new Vuex.Store({
  state: {
    todos: todoStorage.fetch()
  },
  mutations: {
    addTodo(state, title) {
      state.todos.push({
        id: Date.now(),
        title: title.trim(),
        completed: false,
        createdAt: new Date().toISOString()
      })
      todoStorage.save(state.todos)
    },
    deleteTask(state, todo) {
      state.todos = state.todos.filter(t => t.id !== todo.id)
      todoStorage.save(state.todos)
    },
    toggleTodo(state, todo) {
      todo.completed = !todo.completed
      todoStorage.save(state.todos)
    }
  }
})