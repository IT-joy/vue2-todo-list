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
    visibility: 'all',
    showModal: false,
    modalTaskTitle: '',
    modalTitle: 'Новая задача',
    currentTask: null
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
    addTodo(state, title) {
      state.todos.push({
        id: todoStorage.uid++,
        title,
        completed: false,
        createdAt: new Date().toISOString()
      })
      todoStorage.save(state.todos)
    },
    updateTodo(state, { todo, title }) {
      todo.title = title
      todoStorage.save(state.todos)
    },
    deleteTask(state, todo) {
      state.todos.splice(state.todos.indexOf(todo), 1)
      todoStorage.save(state.todos)
    },
    toggleTodo(state, todo) {
      todo.completed = !todo.completed
      todoStorage.save(state.todos)
    },
    removeCompleted(state) {
      state.todos = state.todos.filter(todo => !todo.completed)
      todoStorage.save(state.todos)
    },
    setVisibility(state, visibility) {
      state.visibility = visibility
    },
    setSearchQuery(state, query) {
      state.searchQuery = query
    },
    setShowModal(state, value) {
      state.showModal = value
    },
    setModalTaskTitle(state, title) {
      state.modalTaskTitle = title
    },
    setModalTitle(state, title) {
      state.modalTitle = title
    },
    setCurrentTask(state, task) {
      state.currentTask = task
    },
    toggleAll(state, value) {
      state.todos.forEach(todo => {
        todo.completed = value
      })
      todoStorage.save(state.todos)
    }
  },
  actions: {
    saveTask({ state, commit }) {
      if (state.currentTask) {
        commit('updateTodo', {
          todo: state.currentTask,
          title: state.modalTaskTitle.trim()
        })
      } else {
        commit('addTodo', state.modalTaskTitle.trim())
      }
      commit('setShowModal', false)
    }
  }
})