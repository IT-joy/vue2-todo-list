<template>
  <div class="task-controls" v-show="todos.length" v-cloak>
    <ul class="task-filters">
      <li class="task-filters__item">
        <a
          href="#/all"
          :class="[
            'task-filters__link',
            { 'task-filters__link--active': visibility == 'all' },
          ]"
          @click="setVisibility('all')"
        >
          Все
        </a>
      </li>
      <li class="task-filters__item">
        <a
          href="#/active"
          :class="[
            'task-filters__link',
            { 'task-filters__link--active': visibility == 'active' },
          ]"
          @click="setVisibility('active')"
        >
          Активные
        </a>
      </li>
      <li class="task-filters__item">
        <a
          href="#/completed"
          :class="[
            'task-filters__link',
            { 'task-filters__link--active': visibility == 'completed' },
          ]"
          @click="setVisibility('completed')"
        >
          Выполненные
        </a>
        <button
          class="task-cleaner"
          @click="removeCompleted"
          v-show="hasCompletedTasks"
          title="Удалить все выполненные"
        ></button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  computed: {
    todos() {
      return this.$store.state.todos;
    },
    hasCompletedTasks() {
      return this.$store.state.todos.some(todo => todo.completed)
    },
    visibility() {
      return this.$store.state.visibility;
    },
  },
  methods: {
    setVisibility(visibility) {
      this.$store.commit("setVisibility", visibility);
    },
    removeCompleted() {
      this.$store.commit("removeCompleted");
    },
  },
};
</script>