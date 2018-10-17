
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'login', component: () => import('pages/auth/login') },
      { path: 'legal/terms-of-service', component: () => import('pages/legal/terms-of-service') },
      { path: 'legal/privacy', component: () => import('pages/legal/privacy') },
      { path: 'legal/sobre', component: () => import('pages/legal/sobre') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
