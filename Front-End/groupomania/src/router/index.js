import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import SignupView from '../views/SignupView.vue'
import LoginView from '../views/LoginView.vue'
import ProfilView from '../views/ProfilView.vue'
import wallView from '../views/wallView.vue'
import publicationView from '../views/publicationView.vue'

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
    path: '/publication',
    name: 'mur de l entreprise',
    component: wallView
  },
  {
    path: '/publication/:id',
    name: 'publication',
    component: publicationView
  }
]

const router = createRouter({
  history: createWebHistory(),
  // history: createWebHashHistory(),
  routes
})

export default router
