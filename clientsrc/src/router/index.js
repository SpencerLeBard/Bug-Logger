import Vue from "vue";
import VueRouter from "vue-router";
// @ts-ignore
import Home from "../Pages/Home.vue";
// @ts-ignore
import Profile from "../Pages/Profile.vue";
import { authGuard } from "@bcwdev/auth0-vue";
import BugDetails from "../Pages/BugDetails.vue"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    beforeEnter: authGuard,

  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    beforeEnter: authGuard,
  },
  {
    path: '/bug/:bugId',
    name: 'BugDetails',
    component: BugDetails,
    beforeEnter: authGuard
  }

];

const router = new VueRouter({
  routes,
});

export default router;
