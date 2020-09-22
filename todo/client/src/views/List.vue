<template>
  <div class="container list">
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="/list">
          <i class="fa-2x fas fa-check has-text-primary"></i>
          <h1 class="title">CheckList</h1>
        </a>
      </div>
    </nav>
    <form class="mb-5 mt-3" @submit.prevent="addTask()">
      <div class="field has-addons">
        <div class="control is-expanded">
          <input v-model="newTask.task" class="input" type="text" placeholder="Enter a new task." />
        </div>
        <div class="control">
          <button class="button is-primary">Add</button>
        </div>
      </div>
    </form>
    <ul>
      <li
        v-for="item in tasks"
        :key="item._id"
        class="block-list has-text-primary-dark has-background-primary-light"
      >
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
    uuid: "",
    tasks: []
  }),
  mounted() {
    this.uuid = this.$route.params.id;
    const body = {
      uuid: this.uuid
    };
    try {
      fetch(API_URL + "list", {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(body)
      })
        .then(res => res.json())
        .then(result => {
          //Find a better way to resolve this wiht error
          if(result.code && result.code ==401){
            this.$router.push("/");
          }
          this.uuid = result.uuid;
          this.tasks = result.tasks.filter(
            task => task.finalizedAt == undefined
          );
        })
        .catch(error => {
          console.log("adfgasdfsdfsdf", error);
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
          body: JSON.stringify({
            task: this.newTask,
            uuid: this.uuid
          })
        })
          .then(res => res.json())
          .then(list => {
            this.tasks = list;
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
          body: JSON.stringify({
            uuid: this.uuid,
            _id: item._id,
            finalizedAt: new Date().getTime()
          })
        })
          .then(res => res.json())
          .then(task => {
            task.finalizedAt = new Date(task.finalizedAt);
            this.tasks = this.tasks.filter(function(task) {
              return task._id != item._id;
            });
          });
      } catch (error) {
        console.log(error.message);
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
