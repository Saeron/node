<template>
  <section>
    <h1>Login</h1>
    <div v-if="logginIn" class="text-center">
        <img src= '../assets/Gear.svg'/>
    </div>
    <div v-if="errorMessage" class="alert alert-danger" role="alert">
        {{ errorMessage }}
    </div>
    <form v-if="!logginIn" @submit.prevent="login()">
      <div class="form-group">
        <label for="username">Username:</label>
        <input
          v-model="user.username"
          type="text"
          class="form-control"
          id="username"
          aria-describedby="usernameHelp"
          placeholder="Your username" />
        <small
          id="usernameHelp"
          class="form-text text-muted">
          Enter your username to log in.
        </small>
      </div>

      <div class="form-group">
        <label for="password">Password:</label>
        <input
          v-model="user.password"
          type="password"
          class="form-control"
          id="password"
          aria-describedby="passwordHelp"
          placeholder="Your password" />
        <small
          id="passwordHelp"
          class="form-text text-muted">
          Enter your password to log in.
        </small>
      </div>
      <button type="submit" class="btn btn-primary">Login</button>
    </form>
  </section>
</template>

<script>
import Joi from 'joi';

const LOGIN_URL = 'http://localhost:5000/auth/login';

const schema = Joi.object({
  username: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),

  password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    .trim()
    .required(),
});

export default {
  data: () => ({
    logginIn: false,
    errorMessage: '',
    user: {
      username: '',
      password: '',
    },
  }),
  watch: {
    user: {
      handler() {
        this.errorMessage = '';
      },
      deep: true,
    },
  },
  methods: {
    login() {
      this.errorMessage = '';
      if (this.validUser()) {
        this.logginIn = true;
        const body = {
          username: this.user.username,
          password: this.user.password,
        };
        fetch(LOGIN_URL, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(body),
        }).then((response) => {
          if (response.ok) {
            return response.json();
          }
          return response.json().then((error) => {
            throw new Error(error.message);
          });
        }).then((result) => {
          console.log(result);
          setTimeout(() => {
            this.logginIn = false;
            // this.$router.push('/dashboard');
          }, 1000);
        }).catch((error) => {
          setTimeout(() => {
            this.logginIn = false;
            this.errorMessage = error.message;
          }, 1000);
        });
      }
    },
    validUser() {
      const result = schema.validate(this.user);
      if (!result.error) {
        return true;
      }
      this.errorMessage = result.error;
      return false;
    },
  },
};
</script>

<style>
</style>
