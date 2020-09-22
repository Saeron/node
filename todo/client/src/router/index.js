import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import List from "../views/List.vue";
import Info from "../views/Info.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/list/:id",
    name: "List",
    component: List
  },
  {
    path: "/info",
    name: "Info",
    component: Info
  }
];

const router = new VueRouter({
  routes
});

export default router;
