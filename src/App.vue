<template>
  <div class="task-manager">
    <AddTask />
    <TaskList />
  </div>
</template>

<script>
import AddTask from "./components/AddTask.vue";
import TaskList from "./components/TaskList.vue";

export default {
  name: "App",
  components: {
    AddTask,
    TaskList,
  },
};
</script>