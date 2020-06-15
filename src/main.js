import Vue from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import VueRouter from 'vue-router';




import VueAxios from 'vue-axios';
import axios from 'axios';
Vue.use(VueRouter);
Vue.use(VueAxios, axios);
Vue.config.productionTip = false

import HelloWorld from './components/HelloWorld.vue';
import SignUp from './components/SignUp.vue';
import ChatRoom from './components/ChatRoom.vue';
// const socket = io('http://localhost:3000');

const routes = [
  {
    name: 'home',
    path: '/',
    component: HelloWorld
  },
  {
    name: 'signup',
    path: '/create',
    component: SignUp
  },{
    name: 'chatRoom',
    path: '/chatRoom',
    component: ChatRoom
  }
];
const router = new VueRouter({ mode: 'history', routes: routes});
new Vue(Vue.util.extend({ router }, App)).$mount('#app');


