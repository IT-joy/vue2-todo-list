<template>
  <div id="taskModal" :class="['task-modal', { 'task-modal-show': showModal }]">
    <div class="task-modal__container">
      <span class="task-modal__close-btn" @click="closeModal">&times;</span>
      <h2 class="task-modal__title">{{ modalTitle }}</h2>
      <input
        type="text"
        v-model="modalTaskTitle"
        @keyup.enter="saveTask"
        placeholder="Введите задачу"
        class="task-modal__input"
      />
      <div class="task-modal__actions">
        <button
          class="task-modal__btn task-modal__cancel-btn"
          @click="closeModal"
        >
          Отмена
        </button>
        <button
          class="task-modal__btn task-modal__confirm-btn"
          @click="saveTask"
        >
          Сохранить
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    showModal() {
      return this.$store.state.showModal;
    },
    modalTaskTitle: {
      get() {
        return this.$store.state.modalTaskTitle;
      },
      set(value) {
        this.$store.commit("setModalTaskTitle", value);
      },
    },
    modalTitle() {
      return this.$store.state.modalTitle;
    },
  },
  methods: {
    closeModal() {
      this.$store.commit("setShowModal", false);
    },
    saveTask() {
      if (this.modalTaskTitle.trim()) {
        this.$store.dispatch("saveTask");
      }
    },
  },
};
</script>