// Composables
import { createRouter, createWebHistory } from 'vue-router'

// 1. Define route components.
// These can be imported from other files
const AboutMe = { template: '<div id="about-me"></div>' }
const Portfolio = { template: '<div id="portfolio"></div>' }
const Contact = { template: '<div id="contact">/div>' }
const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
        props: {icon: 'mdi-home'},
      },
      {
        path: 'about-me',
        name: 'About Me',
        component: 'AboutMe',
        props: {icon: 'mdi-account-cowboy-hat'},
      },
      {
        path: 'portfolio',
        name: 'Portfolio',
        component: 'Portfolio',
        props: {icon: 'mdi-briefcase'},
      },
      {
        path: 'contact',
        name: 'Contact',
        component: 'Contact',
        props: {icon: 'mdi-email'},
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  // scrollBehavior(to, from, savedPosition) {
  //   if (to.hash) {
  //     return {
  //       el: to.hash,
  //       behavior: 'smooth'
  //     }
  //   } else{
  //     return {
  //       top: 0,
  //       left: 0,
  //       behavior: 'smooth'
  //     }
  //   }
  // }

})

export default router
