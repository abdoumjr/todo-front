import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)


export const store = new Vuex.Store({
    state : {
        todos : [],
        groups : [],
        current_group_id : localStorage.getItem('current_group_id') || null,
        current_group_name : localStorage.getItem('current_group_name') || null,
        filter : 'all',
        token : localStorage.getItem('token') || null,
        username : localStorage.getItem('username') || null
    },
    getters : {
        isLoggedIn (state){
            return state.token !== null
           }
    },
    mutations : {
        loggedIn  (state,data) {
        state.token = data.token
        state.username = data.username
        },
        logout (state){
            state.token = null
            state.username = null
        },
        groups (state,data) {
            state.groups = data.data       
         },
         todos (state,data) {
            state.todos = data.data       
         },
         setCurrentGroup (state,data){
            state.current_group_id = data.group_id
            state.current_group_name = data.name
         }
    },
    actions:{
    login  (context,data) {
        return new Promise((resolve,reject) => {
            axios.post('/auth/login',{
                email : data.email,
                password : data.password
            })
            .then(response => {
                const token = response.data.success.token
                const username = response.data.success.user_name

                localStorage.setItem('token',token)
                localStorage.setItem('username',username)

                context.commit('loggedIn',{
                    token : token,
                    username : username
                })

                resolve();
            })      
            .catch(error => {
                reject()
            })
        })
        },
        register  (context,data) {
            return new Promise((resolve,reject) => {
                axios.post('/auth/register',{
                    email : data.email,
                    password : data.password,
                    user_name : data.user_name,
                    confirm_password : data.confirm_password
                })
                .then(response => {
                  
                    const token = response.data.success.token
                    const username = response.data.success.user_name

                    localStorage.setItem('token',token)
                    localStorage.setItem('username',username)
    
                    context.commit('loggedIn',{
                        token : token,
                        username : username
                    })
                    resolve();
                })      
                .catch(error => {
                    reject(error.response)
                })
            })
            },
    logout (context) {
        context.commit('logout')
        localStorage.removeItem('token')
        localStorage.removeItem('username')
    },
    getGroups (context) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token;
        return new Promise((resolve,reject) => {
            axios.get('/group')
            .then(response => {

             context.commit('groups',response.data)
                resolve();
            })      
            .catch(error => {
                reject(error)
            })
        })
    },
    getTodos (context,data) {

        axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token;
        return new Promise((resolve,reject) => {
            axios.post('/todo',
            {
                id : context.state.current_group_id
            })
            .then(response => {

             context.commit('todos',response.data)

                resolve();
            })      
            .catch(error => {
                reject(error)
            })
        })
    },
    setCurrentGroup(context,data){
        localStorage.setItem('current_group_id',data.group_id)
        localStorage.setItem('current_group_name',data.name)
        context.commit('setCurrentGroup',data)
    }
    }
})