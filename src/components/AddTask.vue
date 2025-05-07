<template>
  <div class="task-creator">
    <h1 class="task-manager__title">Список задач</h1>
    <div class="task-search">
      <input
        class="task-search__input"
        type="text"
        placeholder="Поиск задачи"
        v-model="searchQuery"
        @input="updateSearchQuery"
      />
      <button
        class="task-creator__add-btn"
        @click="showAddModal"
        title="Добавить"
      >
        +
      </button>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    searchQuery: {
      get() {
        return this.$store.state.searchQuery;
      },
      set(value) {
        this.$store.commit("setSearchQuery", value);
      },
    },
  },
  methods: {
    showAddModal() {
      this.$store.commit("setModalTitle", "Новая задача");
      this.$store.commit("setModalTaskTitle", "");
      this.$store.commit("setCurrentTask", null);
      this.$store.commit("setShowModal", true);
    },
    updateSearchQuery(e) {
      this.$store.commit("setSearchQuery", e.target.value);
    },
  },
};
</script>
