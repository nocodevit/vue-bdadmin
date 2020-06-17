import VueRouter from 'vue-router';
import routes from './routes';

// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  linkActiveClass: 'active',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
});

router.beforeEach((to, from, next)=> {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login', '/register'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');
  console.log("is Auth required? =" + authRequired);
  console.log("is Logged In? =" + loggedIn);

  // if (authRequired && !loggedIn) {
  //   return next('/login');
  // }

  next();

})

export default router;
