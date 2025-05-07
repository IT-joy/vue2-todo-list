import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const STORAGE_KEY = 'todos-vuejs-2.0'

const todoStorage = {
  fetch() {
    const todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    todos.forEach((todo, index) => {
      todo.id = index
    })
    todoStorage.uid = todos.length
    return todos
  },
  save(todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }
}

export default new Vuex.Store({
  state: {
    todos: todoStorage.fetch(),
    searchQuery: '',
    visibility: 'all'
  },
  getters: {
    filteredTasks(state) {
      let filtered = state.todos

      // Фильтрация по статусу
      if (state.visibility === 'active') {
        filtered = filtered.filter(todo => !todo.completed)
      } else if (state.visibility === 'completed') {
        filtered = filtered.filter(todo => todo.completed)
      }

      // Поиск по названию
      if (state.searchQuery) {
        const query = state.searchQuery.toLowerCase()
        filtered = filtered.filter(todo =>
          todo.title.toLowerCase().includes(query))
      }

      return filtered
    }
  },
  mutations: {
    setVisibility(state, filter) {
      state.visibility = filter
    },
    setSearchQuery(state, query) {
      state.searchQuery = query
    },
  }
})