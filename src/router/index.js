import Vue from 'vue'
import axios from "axios";
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Signup from '../views/Signup.vue'
import Login from '../views/Login.vue'
import Logout from '../views/Logout.vue'
import MoviesIndex from '../views/MoviesIndex.vue'
import MoviesCreate from '../views/MoviesCreate.vue'
import MoviesShow from '../views/MoviesShow.vue'
import MoviesEdit from '../views/MoviesEdit.vue'

var jwt = localStorage.getItem("jwt");
if (jwt) {
  axios.defaults.headers.common["Authorization"] = "Bearer " + jwt;
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/users/new',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/logout',
    name: 'Logout',
    component: Logout
  },
  {
    path: '/movies',
    name: 'movies-index',
    component: MoviesIndex
  },
  {
    path: '/movies/new',
    name: 'movies-create',
    component: MoviesCreate
  },
  {
    path: '/movies/:id',
    name: 'movies-show',
    component: MoviesShow
  },
  {
    path: '/movies/:id/edit',
    name: 'movies-edit',
    component: MoviesEdit
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
