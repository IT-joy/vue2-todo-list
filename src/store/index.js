import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const STORAGE_KEY = 'vue-todo-app-tasks'
const API_URL = 'https://jsonplaceholder.typicode.com/todos'

const todoStorage = {
  async fetchInitial() {
    const localData = localStorage.getItem(STORAGE_KEY)
    if (localData) {
      return JSON.parse(localData)
    }
    try {
      const response = await axios.get(`${API_URL}?_limit=5`)
      const tasks = response.data.map(task => ({
        id: task.id,
        title: task.title,
        completed: task.completed,
        createdAt: new Date().toISOString()
      }))
      this.save(tasks)
      return tasks
    } catch (error) {
      console.error('Ошибка загрузки:', error)
      return []
    }
  },
  save(todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))

    this.syncWithAPI(todos).catch(e => console.error('Sync error:', e))
  },
  async syncWithAPI(todos) {
    await Promise.all(todos.map(task => {
      return task.id <= 200
        ? axios.put(`${API_URL}/${task.id}`, task)
        : axios.post(API_URL, task)
    }))
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
      const newTask = {
        id: Date.now(),
        title: title.trim(),
        completed: false,
        createdAt: new Date().toISOString()
      }
      state.todos.unshift(newTask)
      todoStorage.save(state.todos)
    },
    updateTodo(state, { todo, title }) {
      todo.title = title.trim()
      todoStorage.save(state.todos)
    },
    deleteTask(state, todo) {
      state.todos = state.todos.filter(t => t.id !== todo.id)
      todoStorage.save(state.todos)
    },
    toggleTodo(state, todo) {
      todo.completed = !todo.completed
      todoStorage.save(state.todos)
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
		const tasks = await todoStorage.fetchInitial()
		commit('SET_TODOS', tasks)
	  } catch (error) {
		commit('SET_ERROR', 'Не удалось загрузить задачи')
	  } finally {
		commit('SET_LOADING', false)
	  }
	},
    async saveTask({ commit, state }) {
      if (state.currentTask) {
        commit('updateTodo', {
          todo: state.currentTask,
          title: state.modalTaskTitle
        })
      } else {
        commit('addTodo', state.modalTaskTitle)
      }
      commit('setShowModal', false)
    },
    async deleteTask({ state, commit }, todo) {
      commit('SET_LOADING', true)
      try {
        await new Promise(resolve => setTimeout(resolve, 500))
        commit('deleteTask', todo)
        await todoStorage.save(state.todos)
      } finally {
        commit('SET_LOADING', false)
      }
    }
  }
})