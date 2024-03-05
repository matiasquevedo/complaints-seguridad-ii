import Vue from 'vue';
import Router from 'vue-router'


import Balance from '@/components/balance'
import Home from '@/views/home'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: '',
    component: Home
  },
  {
    path: '/balance',
    component: Balance
  }
];

const router = new Router({
  mode: "history",
  routes
});

export default router;