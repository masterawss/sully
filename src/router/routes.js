
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue'), name: 'index', meta: {auth: true} },
    ]
  },
  { path: '/temas', component: () => import('pages/Temas/Index.vue'), name: 'temas.index', meta: {auth: true} },
  { path: '/buscar-curso', component: () => import('pages/Curso/Search.vue'), name: 'curso.search', meta: {auth: true} },
  { path: '/nuevo-curso', component: () => import('pages/Curso/Create.vue'), name: 'curso.create', meta: {auth: true} },
  { path: '/editar-curso/:id', component: () => import('pages/Curso/Create.vue'), name: 'curso.edit', meta: {auth: true} },
  { path: '/cursos', component: () => import('pages/Curso/Index.vue'),name: 'curso.index', meta: {auth: true} },
  { path: '/curso/:id', component: () => import('pages/Curso/Show.vue'), name: 'curso.show', meta: {auth: true} },
  { path: '/horario', component: () => import('pages/Horario/Index.vue'), name: 'horario', meta: {auth: true} },
  { path: '/welcome', component: () => import('pages/Welcome.vue'), name: 'welcome', meta: {auth: true} },
  { path: '/login', component: () => import('pages/Login.vue'), name: 'login' },
  { path: '/register', component: () => import('pages/Register.vue'), name: 'register' },
  { path: '/perfil', component: () => import('pages/Perfil.vue'), name: 'perfil', meta: {auth: true} },
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
