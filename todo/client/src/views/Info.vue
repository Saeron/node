<template>
  <div class="hero is-fullheight">
    <div class="hero-head">
      <div class="container has-text-centered">
        <h1 class="title big-title">
          <span class="has-text-primary">
            <i class="fas fa-check"></i>
          </span>
          Check List
        </h1>
      </div>
    </div>
    <div class="hero-body">
      <div class="container has-text-centered explanation">
        <p class="content is-large ">
            CheckList is a simple to do list made it
             with vue and nodejs. Is very simple to 
             use, the only thing tou need to do is 
             click the button begin, this will
             automaticly create a new list with a 
             ramdon code in tour url, so you can 
             copy the url to access the list again.</p>
        <p class="content is-large">
            For this reasons is important to know that 
            anyone with the code can access the list, 
            so you can share your lists wiht others
            just by sharing your link.
        </p>
        <p class="content is-large">
            Also this make the list public, because
            you can try diferents codes until you 
            find a list, if you have the time to 
            do it. So don't put important information 
            here, you have been warned.
        </p>
        <button @click="$router.push('/')" class="button is-primary">Back</button>
      </div>
    </div>
    <div class="hero-foot">
        <div class="container hero-footer">
            <p class="content has-text-primary">
                Contact: antdcs@gmail.com
            </p>
        </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
p {
    padding-left: 15% !important;
    padding-right: 15% !important;
}
.hero-footer{
    padding-bottom: 1% !important;
}
</style>