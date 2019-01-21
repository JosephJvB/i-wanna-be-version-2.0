import Welcome from '../modals/welcome.vue'
import Login from '../modals/login.vue'
import Register from '../modals/register.vue'

export default {
  routes: [
    {
      path: '/',
      component: Welcome
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/register',
      component: Register
    }
  ]
}
