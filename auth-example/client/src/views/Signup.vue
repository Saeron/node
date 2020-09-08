<template>
  <section>
    <h1>Signup</h1>
      <div v-if="signingUp" class="text-center">
        <img src= '../assets/Gear.svg'/>
      </div>
      <div v-if="errorMessage" class="alert alert-danger" role="alert">
        {{ errorMessage }}
      </div>
    <form v-if="!signingUp" @submit.prevent="signup">
      <div class='form-group'>
        <label for='username'>Username</label>
        <input
          v-model='user.username'
          type="text"
          class='form-control'
          id='username'
          aria-describedby='usernameHelp'
          placeholder='Enter a username'
          required
        />
        <small id='usernameHelp' class='form-text text-muted'
          >Username must be al least three characters</small
        >
      </div>
      <div class='form-group'>
        <label for='exampleInputPassword1'>Password</label>
        <input
          v-model='user.password'
          type='password'
          class='form-control'
          id='password'
          aria-describedby='passwordHelp'
          placeholder='Password'
          required />
          <small id='passwordHelp' class='form-text text-muted'>
            Password must be longer than four. Can't be empty.
          </small>
      </div>
       <div class='form-group'>
        <label for='confirmPassword'>Confirm Password</label>
        <input
          v-model='user.confirmPassword'
          type='password'
          class='form-control'
          id='ConfirmPassword'
          aria-describedby='confirmPasswordHelp'
          placeholder='Password'
          required />
          <small id='confirmPasswordHelp' class='form-text text-muted'>
            Please confirm your password.
          </small>
      </div>
      <button type='submit' class='btn btn-primary'>Submit</button>
    </form>
  </section>
</template>

<script>
import Joi from 'joi';

const SIGNUP_URL = 'http://localhost:5000/auth/signup';

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

  confirmPassword: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    .trim()
    .required(),

});

export default {
  data: () => ({
    signingUp: false,
    errorMessage: '',
    user: {
      username: '',
      password: '',
      confirmPassword: '',
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
    signup() {
      this.errorMessage = '';
      if (this.validUser()) {
        const body = {
          username: this.user.username,
          password: this.user.password,
        };
        this.signingUp = true;
        fetch(SIGNUP_URL, {
          method: 'POST',
          body: JSON.stringify(body),
          headers: {
            'content-type': 'application/json',
          },
        }).then((response) => {
          if (response.ok) {
            return response.json();
          }
          return response.json().then((error) => {
            throw new Error(error.message);
          });
        }).then(() => {
          setTimeout(() => {
            this.signingUp = false;
            this.$router.push('/login');
          }, 1000);
        }).catch((error) => {
          setTimeout(() => {
            this.signingUp = false;
            this.errorMessage = error.message;
          }, 1000);
        });
      }
    },
    validUser() {
      if (this.user.password !== this.user.confirmPassword) {
        this.errorMessage = 'Passwords must match.';
        return false;
      }
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

<style></style>
