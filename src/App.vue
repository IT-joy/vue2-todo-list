<template>
  <div class="task-manager">
    <AddTask />
    <TaskFilters />
    <TaskList />
  </div>
</template>

<script>
import AddTask from "./components/AddTask.vue";
import TaskList from "./components/TaskList.vue";
import TaskFilters from "./components/TaskFilters.vue";

export default {
  name: "App",
  components: {
    AddTask,
    TaskList,
    TaskFilters,
  },
};
</script>