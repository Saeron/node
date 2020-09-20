<template>
  <div class="home hero is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <h1 class="title big-title">
          <span class="has-text-primary">
            <i class="fas fa-check"></i>
          </span>
          Check List
        </h1>
        <h2 class="subtitle">A simple to do list. Made with Vue and Node.</h2>
        <button @click="$router.push('/list') " class="button is-primary">Begin</button>
        <button class="button ml-3 is-primary is-outlined">
          <span class="icon">
            <i class="fas fa-info"></i>
          </span>
          <span>info</span>
        </button>
        <p class="mt-3">v0.1</p>
        <button @click="redirectGithub()" class="mt-3 button">
          <span class="icon">
            <i class="fab fa-github"></i>
          </span>
          <span>GitHub</span>
        </button>
      </div>
    </div>
  </div>
</template>
<style>
.big-title {
  font-size: 6rem !important;
}
</style>
<script>
// @ is an alias to /src

export default {
  methods: {
    redirectGithub() {
      window.location = "https://github.com/Saeron/node/tree/master/todo";
    }
  }
};
</script>
