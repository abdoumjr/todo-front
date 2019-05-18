import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import VueRouter from 'vue-router'
import Todo from './components/Todo.vue'
import Group from './components/Group.vue'
import login from './components/login.vue'
import Vuetify from 'vuetify'
import axiosapi from 'axios'
import { store } from './store/index.js'
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader


Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(Vuetify)

const axios = axiosapi.create({
  baseURL:`http://127.0.0.1:8000/api`,
  // headers:{ header:value }
});

window.axios = axios;

const routes = [
  {  path : '/group', component : Group  },
  {  path : '/todo', component : Todo  },
  {  path : '/login', component : login  },
];

const router = new VueRouter ({
  routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)){
  if(!store.getters.loggedIn){
    next({
      path : '/login',
      query : {redirecxt : to.fullPath}
    })
   } else {
      next()
    }
  } else {
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
