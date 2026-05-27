import { createRouter, createWebHistory } from '@ionic/vue-router';
import type { RouteRecordRaw } from 'vue-router';
import { componentDemoRegistry } from '../views/components/registry';

const componentRoutes: RouteRecordRaw[] = Object.entries(componentDemoRegistry).map(
  ([id, loader]) => ({
    path: `/components/${id}`,
    component: loader,
  }),
);

const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/home' },
  { path: '/home', component: () => import('../views/HomePage.vue') },
  { path: '/components', component: () => import('../views/ComponentsListPage.vue') },
  ...componentRoutes,
  { path: '/pages', component: () => import('../views/PagesListPage.vue') },
  { path: '/pages/login', component: () => import('../views/pages/LoginPage.vue') },
  { path: '/pages/list', component: () => import('../views/pages/ListPage.vue') },
  { path: '/pages/list/:id', component: () => import('../views/pages/DetailPage.vue') },
  {
    path: '/pages/tabs',
    component: () => import('../views/pages/tabs/TabsPage.vue'),
    children: [
      { path: '', redirect: '/pages/tabs/tab1' },
      { path: 'tab1', component: () => import('../views/pages/tabs/Tab1.vue') },
      { path: 'tab2', component: () => import('../views/pages/tabs/Tab2.vue') },
      { path: 'tab3', component: () => import('../views/pages/tabs/Tab3.vue') },
    ],
  },
  { path: '/pages/embedded', component: () => import('../views/pages/EmbeddedPage.vue') },
  { path: '/settings', component: () => import('../views/SettingsPage.vue') },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
