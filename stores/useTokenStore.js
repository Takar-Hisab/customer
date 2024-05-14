import { defineStore } from 'pinia'

export const useTokenStore = defineStore('customer_token', {
    state: () => {
        return {
            customer_token: null,
            customer_isLogin:  false,
            customer_authUser: null,
        }
    },

    actions:{
        setToken(data){
            this.customer_token = data.token
            this.customer_isLogin = true;
        },
        setAuthUser(data){
            this.customer_authUser = data
        },

        removeToken(token){
            this.customer_token = null
            this.customer_isLogin = false
            this.customer_authUser = null
        }
    },
    getters:{
        getToken(){
            return this.customer_token
        },
        getIsLogin(){
            return this.customer_isLogin
        },
        getAuthUser(){
            return this.customer_authUser
        }
    },

    persist: true,
})