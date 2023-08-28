import Vue from "vue";
import Router from "vue-router";
import paths from "@/router/paths";
function route({ path, view, name, redirect, children }) {
    return {
        name: name || view,
        path,
        component: resolve => import(`@/views/${view}.vue`).then(resolve),
        redirect,
        children
    };
}
Vue.use(Router);
const router = new Router({
    base: "/",
    mode: "history",
    routes: [...paths.map(path => route(path))],
})
router.beforeEach((to, from, next) => {
    next();
});
export default router;
