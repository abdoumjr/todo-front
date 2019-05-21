import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import VueRouter from 'vue-router'
import Todo from './components/Todo.vue'
import Group from './components/Group.vue'
import login from './components/login.vue'
import register from './components/register.vue'
import logout from './components/logout.vue'
import Vuetify from 'vuetify'
import axiosapi from 'axios'
import { store } from './store/index.js'
import VueSwal from 'vue-swal'
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader


Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(Vuetify)
Vue.use(VueSwal)

const axios = axiosapi.create({
  baseURL:`http://127.0.0.1:8000/api`,
  // headers:{ header:value }
});

window.axios = axios;

const routes = [
  {  path : '/group', component : Group , meta : {requiresAuth : true}  },
  {  path : '/todo', component : Todo , meta : {requiresAuth : true} },
  {  path : '/login', component : login , meta : {requiresGuest : true} },
  {  path : '/register', component : register , meta : {requiresGuest : true} },
  {  path : '/logout', component : logout , meta : {requiresAuth : true}  },
];

const router = new VueRouter ({
  routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)){
  if(!store.getters.isLoggedIn){
    next({
      path : 'login',
    })
   } else {
      next()
    }
  } else  if(to.matched.some(record => record.meta.requiresGuest)){
    if(store.getters.isLoggedIn){
      next({
        path : 'group',
      })
     } else {
        next()
      }
    }
     else {
    next()
  }
})

new Vue({
  router,
  store,
  data: () => ({
    drawer: true
  }),
  props: {
    source: String
  },
  render: h => h(App),
}).$mount('#app')
