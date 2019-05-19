import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)


export const store = new Vuex.Store({
    state : {
        todos : [],
        filter : 'all',
        token : localStorage.getItem('token') || null,
        username : localStorage.getItem('username') || null
    },
    getters : {
        isLoggedIn (state){
            console.log('khra')
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

                    console.log(username)
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
    }
})