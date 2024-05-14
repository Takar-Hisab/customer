export default defineNuxtRouteMiddleware((to, from) => {
    const {customer_isLogin}= useTokenStore();
    if (customer_isLogin) {
        return navigateTo('/dashboard')
    }
})