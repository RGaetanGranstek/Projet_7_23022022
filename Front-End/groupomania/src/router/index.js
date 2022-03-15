import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import SignupView from '../views/SignupView.vue'
import LoginView from '../views/LoginView.vue'
import ProfilView from '../views/ProfilView.vue'

const routes = [
  {
    path: '/',
    name: `Accueil`,
    component: HomeView
  },
  {
    path: '/about',
    name: 'A propos',
    component: AboutView
  },
  {
    path: '/signup',
    name: 'Inscription',
    component: SignupView
  },
  {
    path: '/login',
    name: 'Connexion',
    component: LoginView
  },
  {
    path: '/profil',
    name: 'Profil',
    component: ProfilView
  },
  {
    path: '/delete',
    name: 'delete Profil',
    component: ProfilView
  },
  {
    path: '/update',
    name: 'update Profil',
    component: ProfilView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
