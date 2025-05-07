<template>
  <div class="task-manager">
    <AddTask />
    <TaskFilters />
    <TaskList />
    <EditModal />
  </div>
</template>

<script>
import AddTask from "./components/AddTask.vue";
import TaskList from "./components/TaskList.vue";
import TaskFilters from "./components/TaskFilters.vue";
import EditModal from "./components/EditModal.vue";

export default {
  name: "App",
  components: {
    AddTask,
    TaskList,
    TaskFilters,
    EditModal,
  },
};
</script>