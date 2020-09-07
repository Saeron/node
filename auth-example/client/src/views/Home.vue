<template>
  <div class='home text-center'>
    <div class='jumbotron'>
      <h1 class='display-3'>Authenticantion example</h1>
      <p class='lead'>
        Learnig how to do a basic authentication on nodejs.
      </p>
      <hr class='my-4' />
      <p>
        It usefull to learn how to do a simple authentication insted of use the oauth token from
        another service.
      </p>
      <p class='lead'>
        <router-link class='btn btn-primary btn-lg'
        :to="{ name:'signup' }"
        role='button'>Sign up</router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
};
</script>
