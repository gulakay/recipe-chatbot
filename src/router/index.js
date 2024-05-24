import { createRouter, createWebHistory } from 'vue-router'

import Chatbot from '../views/Chatbot.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'chatbot',
      component: Chatbot
    },
   
  ]
})

export default router
