import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const STORAGE_KEY = 'todos-vuejs-2.0'
const API_URL = 'https://jsonplaceholder.typicode.com/todos'

const todoStorage = {
  async fetch() {
    try {
      const response = await axios.get(`${API_URL}?_limit=5`)
      const apiTodos = response.data.map(todo => ({
        ...todo,
        createdAt: new Date().toISOString()
      }))
      localStorage.setItem(STORAGE_KEY, JSON.stringify(apiTodos))
      return apiTodos
    } catch (error) {
      console.error('API недоступен, используем localStorage', error)
      const localTodos = JSON.parse(localStorage.getItem(STORAGE_KEY) || [])
      localTodos.forEach((todo, index) => {
        todo.id = index + 1
      })
      todoStorage.uid = localTodos.length + 1
      return localTodos
    }
  },
  async save(todos) {
    try {
      await Promise.all(todos.map(async todo => {
        if (!todo.synced) {
          if (todo.id > 200) {
            await axios.post(API_URL, todo)
          } else {
            await axios.put(`${API_URL}/${todo.id}`, todo)
          }
          todo.synced = true
        }
      }))
    } catch (error) {
      console.error('Ошибка синхронизации с API', error)
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }
}

export default new Vuex.Store({
  state: {
    todos: [],
    searchQuery: '',
    visibility: 'all',
    showModal: false,
    modalTaskTitle: '',
    modalTitle: 'Новая задача',
    currentTask: null,
    isLoading: false,
    error: null
  },
  getters: {
    filteredTasks(state) {
      let filtered = state.todos
      if (state.visibility === 'active') {
        filtered = filtered.filter(todo => !todo.completed)
      } else if (state.visibility === 'completed') {
        filtered = filtered.filter(todo => todo.completed)
      }
      if (state.searchQuery) {
        const query = state.searchQuery.toLowerCase()
        filtered = filtered.filter(todo =>
          todo.title.toLowerCase().includes(query))
      }
      return filtered
    }
  },
  mutations: {
    SET_TODOS(state, todos) {
      state.todos = todos
    },
    SET_LOADING(state, isLoading) {
      state.isLoading = isLoading
    },
    SET_ERROR(state, error) {
      state.error = error
    },
    addTodo(state, title) {
      state.todos.push({
        id: Date.now(),
        title,
        completed: false,
        createdAt: new Date().toISOString(),
        synced: false
      })
    },
    updateTodo(state, { todo, title }) {
      todo.title = title
      todo.synced = false
    },
    deleteTask(state, todo) {
      state.todos = state.todos.filter(t => t.id !== todo.id)
    },
    toggleTodo(state, todo) {
      todo.completed = !todo.completed
      todo.synced = false
    },
    removeCompleted(state) {
      state.todos = state.todos.filter(todo => !todo.completed)
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
    }
  },
  actions: {
    async initTodos({ commit }) {
      commit('SET_LOADING', true)
      try {
        const todos = await todoStorage.fetch()
        commit('SET_TODOS', todos)
      } catch (error) {
        commit('SET_ERROR', error.message)
      } finally {
        commit('SET_LOADING', false)
      }
    },
    async saveTask({ state, commit }) {
      commit('SET_LOADING', true)
      try {
        if (state.currentTask) {
          commit('updateTodo', {
            todo: state.currentTask,
            title: state.modalTaskTitle.trim()
          })
        } else {
          commit('addTodo', state.modalTaskTitle.trim())
        }
        await todoStorage.save(state.todos)
        commit('setShowModal', false)
      } catch (error) {
        commit('SET_ERROR', 'Ошибка сохранения задачи')
      } finally {
        commit('SET_LOADING', false)
      }
    },
    async deleteTask({ commit, state }, todo) {
      commit('SET_LOADING', true)
      try {
        commit('deleteTask', todo)
        await todoStorage.save(state.todos)
      } catch (error) {
        commit('SET_ERROR', 'Ошибка удаления задачи')
      } finally {
        commit('SET_LOADING', false)
      }
    }
  }
})