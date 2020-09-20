<template>
  <div class="container list">
    <h1 class="title is-1">List</h1>
    <form class="mb-5" @submit.prevent="addTask()">
      <div class="field has-addons">
        <div class="control is-expanded">
          <input v-model="newTask.task" class="input" type="text" placeholder="Enter a new task." />
        </div>
        <div class="control">
          <button class="button is-primary">Add</button>
        </div>
      </div>
    </form>
    <ul v-for="item in tasks" :key="item._id">
      <li class="block-list has-text-primary-dark has-background-primary-light">
        {{item.task}}
        <button
          @click="finalizeTask(item)"
          class="transparent has-text-primary is-pulled-right"
        >
          <i class="fas fa-check"></i>
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
const API_URL = "http://localhost:5000/";
export default {
  data: () => ({
    newTask: {
      task: ""
    },
    tasks: []
  }),
  mounted() {
    try {
      fetch(API_URL + "list", {
        headers: {
          "content-type": "application/json"
        }
      })
        .then(res => res.json())
        .then(result => {
          this.tasks = result.filter(task => task.finalizedAt==undefined);
        });
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    addTask() {
      try {
        fetch(API_URL + "create", {
          method: "POST",
          headers: {
            "content-type": "application/json"
          },
          body: JSON.stringify(this.newTask)
        })
          .then(res => res.json())
          .then(task => {
            this.tasks.push(task);
            this.newTask = {
              task: ""
            };
          });
      } catch (error) {
        console.log(error);
      }
    },
    finalizeTask(item) {
      item.finalizedAt = new Date().getTime();
      try {
        fetch(API_URL + "update", {
          method: "POST",
          headers: {
            "content-type": "application/json"
          },
          body: JSON.stringify(item)
        })
          .then(res => res.json())
          .then(task => {
            task.finalizedAt = new Date(task.finalizedAt);
            this.tasks = this.tasks.filter(function(task){
              return task._id != item._id
            });
          });
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style>
.block-list {
  padding: 0.5rem;
  margin-top: 0.5rem;
  border-radius: 5px;
}
.transparent {
  border: none;
  background: none;
  outline-color: hsl(171, 100%, 41%);
}
.list {
  width: 90% !important;
}
</style>
