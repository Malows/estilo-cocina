import Vue from 'vue'
import VueRouter from 'vue-router'
import { isBefore } from 'date-fns'
import Error404 from '@/Error404'
import Layout from '@/Layout'
import Login from '@/Login'
import ListaPedidos from '@/ListaPedidos'
import ListaResumenes from '@/ListaResumenes'
import Disponibilidad from '@/Disponibilidad'

Vue.use(VueRouter)

const checkUser = () => new Promise((resolve, reject) => {
  const user = JSON.parse(window.localStorage.getItem('user'))
  if (!user) reject(new Error(''))
  else if (!user.hasOwnProperty('tipo_usuario_id') || !user.hasOwnProperty('expire')) reject(new Error(''))
  else {
    const userLevel = user.tipo_usuario_id < 3
    const inTimeGap = isBefore(Date.now(), user.expire)
    if (!userLevel) reject(new Error('Privilégios insuficiente para ingresar a esta aplicación. Consulte con un administrador.'))
    else if (!inTimeGap) reject(new Error('Credenciales expiradas. Ingrese nuevamente por favor.'))
    else resolve(user)
  }
})

const routify = guarded => (component, path, name = null, children = null) => Object.assign(
  { meta: { requiresAuth: guarded }, component, path },
  name ? { name } : {},
  children ? { children } : {}
)

const unguardedRoute = routify(false)
const route = routify(true)

const router = new VueRouter({
  mode: 'hash',
  scrollBehavior: () => ({ y: 0 }),

  routes: [
    unguardedRoute(Login, '/login', 'Ingreso'),
    route(Layout, '/', 'Cocina', [
      route(ListaPedidos, '/pedidos', 'Pedidos'),
      route(ListaResumenes, '/categorias', 'Resúmenes'),
      route(ListaResumenes, '/categorias/:categoria', 'Resúmen'),
      route(Disponibilidad, '/disponibilidad', 'Disponibilidad')
    ]),
    unguardedRoute(Error404, '*')
  ]
})

router.beforeEach((to, from, next) => {
  const auth = to.meta.requiresAuth
  if (!auth) next()
  else {
    checkUser()
      .then(() => { next() })
      .catch(err => {
        if (err.message === '') next({ path: '/login' })
        else next({ path: '/login', query: { error: err.message } })
      })
  }
})

export default router
