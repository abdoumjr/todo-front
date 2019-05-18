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
    },
    mutations : {
        loggedIn  (state,data) {
        state.token = data.token
        state.username = data.username
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
                const username = response.data.success.username

                localStorage.setItem('token',token)
                localStorage.setItem('username',username)

                context.commit('loggedIn',{
                    token : token,
                    username : username
                })

                resolve();
            })      
            .catch(error => {
                console.log(error)
                reject()
            })
        })
        },
    }
})