import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)


export const store = new Vuex.Store({
    state : {
        todos : [],
        status : [
            { 
                status : 'Ongoing',
                value : '1'
            },
            { 
                status : 'Complete',
                value : '2'
            },
            { 
                status : 'Pending',
                value : '0'
            },
        ],
        groups : [],
        current_group_id : localStorage.getItem('current_group_id') || null,
        current_group_name : localStorage.getItem('current_group_name') || null,
        filter : 'all',
        token : localStorage.getItem('token') || null,
        username : localStorage.getItem('username') || null,
        snack : '',
        loader : false,
        loaderMessage : '',
        groupUsers : ''
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
         groupUsers(state,data){
            state.groupUsers = data.data
         },
         todos (state,data) {
            state.todos = data.data       
         },
         setCurrentGroup (state,data){
            state.current_group_id = data.group_id
            state.current_group_name = data.name
         },
         setSnack (state, snack) {
            state.snack = snack.data
            setTimeout(function () { state.snack = '' }.bind(this), 2000)
            },
        load (state,data) {
            state.loaderMessage = data.loaderMessage;
            state.loader = !state.loader
        }
    },
    actions:{
    login  (context,data) {
        context.commit('load',{
            loaderMessage : 'Loggin in ...'
        });      
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

                context.commit('load',{
                    loaderMessage : ''
                })

                resolve();
            })      
            .catch(error => {
                reject()
            })
        })
        },
        register  (context,data) {
            context.commit('load',{
                loaderMessage : 'Please Wait ...'
            });  
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

                    context.commit('load',{
                        loaderMessage : ''
                    });  

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
        context.commit('load',{
            loaderMessage : 'Logging out ...'
        }); 
        context.commit('load',{
            loaderMessage : ''
        });  
    },
    getGroups (context) {
        context.commit('load',{
            loaderMessage : 'Loading your groups ...'
        });  
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token;
        return new Promise((resolve,reject) => {
            axios.get('/group')
            .then(response => {

             context.commit('groups',response.data)

             context.commit('load',{
                loaderMessage : ''
            });  

                resolve();
            })      
            .catch(error => {
                reject(error.response)
            })
        })
    },
    getTodos (context) {
        context.commit('load',{
            loaderMessage : 'Loading your todos ...'
        });  
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token;
        return new Promise((resolve,reject) => {
            axios.post('/todo',
            {
                id : context.state.current_group_id
            })
            .then(response => {

             context.commit('todos',response.data)

             context.commit('load',{
                loaderMessage : ''
            });  
                resolve();
            })      
            .catch(error => {
                reject(error)
                context.commit('load',{
                    loaderMessage : ''
                });  
            })
        })
    },
    setCurrentGroup(context,data){
        localStorage.setItem('current_group_id',data.group_id)
        localStorage.setItem('current_group_name',data.name)
        context.commit('setCurrentGroup',data)
    },
    addTodo(context,data){
        context.commit('load',{
            loaderMessage : 'Creating a new todo ...'
        });  
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token;
        return new Promise((resolve,reject) => {
            axios.post('/todo/create',
            {
                todo : data.newTodoValue,
                title : data.newTodoTitle,
                group_id : context.state.current_group_id
            })
            .then(response => {
             context.dispatch('getTodos')
                resolve(response.data);
                context.commit('setSnack',response.data)
                context.commit('load',{
                    loaderMessage : ''
                });  
            })      
            .catch(error => {
                reject(error.response)
                context.commit('load',{
                    loaderMessage : ''
                });  
            })
        })
    },
    todoStateChange(context,data){
        context.commit('load',{
            loaderMessage : 'Updating the todo...'
        });  
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token;
        return new Promise((resolve,reject) => {
            axios.post('/todo/update_status',
            {
                todo_id : data.id,
                new_status : data.toTodoState == 'doing' ? '1' : '2'
            })
            .then(response => {
             context.dispatch('getTodos')
                resolve(response.data);
                context.commit('setSnack',response.data)      
                context.commit('load',{
                    loaderMessage : ''
                });       
             })      
            .catch(error => {
                reject(error.response)
                context.commit('load',{
                    loaderMessage : ''
                });  
            })
        })
    },
    updateTodo(context,data) {
        context.commit('load',{
            loaderMessage : 'Updating the todo ...'
        });  
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token;
        return new Promise((resolve,reject) => {
            axios.post('/todo/update',
            {
                todo_id : data.id,
                status : data.editStatus.value,
                title : data.editTodoTitle,
                value : data.editTodoValue
            })
            .then(response => {
             context.dispatch('getTodos')
                resolve(response.data);
                context.commit('setSnack',response.data)          
                context.commit('load',{
                    loaderMessage : ''
                });   
             })      
            .catch(error => {
                reject(error.response)
                   context.commit('load',{
                    loaderMessage : ''
                });  
            })
        })
    },
    addGroup(context,data){
        context.commit('load',{
            loaderMessage : 'Creating a new group ...'
        });  
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token;
        return new Promise((resolve,reject) => {
            axios.post('/group/create',
            {
                name : data.newGroupName,
            })
            .then(response => {
             context.dispatch('getGroups')
                resolve(response.data);
                context.commit('setSnack',response.data)
                context.commit('load',{
                    loaderMessage : ''
                });  
            })      
            .catch(error => {
                reject(error.response)
                context.commit('load',{
                    loaderMessage : ''
                });  
            })
        })
    },
    getGroupUsers(context){
        context.commit('load',{
            loaderMessage : 'Loading groups informations ...'
        });  
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token;
        return new Promise((resolve,reject) => {
            axios.post('/group/get_members',
            {
                id : context.state.current_group_id,
            })
            .then(response => {
                context.commit('load',{
                    loaderMessage : ''
                }); 
                context.commit('groupUsers',response.data)
                resolve(response.data);
            })      
            .catch(error => {
                context.commit('load',{
                    loaderMessage : ''
                });
                reject(error.response)

            })
        })
    }

    }
})