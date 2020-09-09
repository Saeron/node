import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Signup from '../views/Signup.vue';
import Login from '../views/Login.vue';
import Dashboard from '../views/Dashboard.vue';

Vue.use(VueRouter);

function ifLogedIn(to, from, next) {
  if (localStorage.token) {
    next('/dashboard');
  } else {
    next();
  }
}

function ifLogedOut(to, from, next) {
  if (localStorage.token) {
    next();
  } else {
    next('/login');
  }
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/signup',
    name: 'signup',
    component: Signup,
    beforeEnter: ifLogedIn,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    beforeEnter: ifLogedIn,
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    beforeEnter: ifLogedOut,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
