import { createRouter, createWebHistory } from 'vue-router';
import UsersPage from '../views/UsersPage.vue';

const routes = [
  {
    path: '/',
    name: 'users',
    component: UsersPage,
  },
  {
    path: '/user/new',
    name: 'createUser',
    component: () => import('@/views/CreateUserPage.vue')
  },
  {
    path: '/user/:id',
    name: 'user',
    component: () => import('@/views/UserPage.vue')
  },
  {
    path: '/user/:id/edit',
    name: 'editUser',
    component: () => import('@/views/EditUserPage.vue')
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
