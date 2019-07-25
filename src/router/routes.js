
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue'), name: 'index' },
    ]
  },
  { path: '/buscar-curso', component: () => import('pages/Curso/Search.vue'), name: 'curso.search' },
  { path: '/nuevo-curso', component: () => import('pages/Curso/Create.vue'), name: 'curso.create' },
  { path: '/cursos', component: () => import('pages/Curso/Index.vue'),name: 'curso.index' },
  { path: '/curso/:id', component: () => import('pages/Curso/Show.vue'), name: 'curso.show' },
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
