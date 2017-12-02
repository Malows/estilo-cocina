import Vue from 'vue'
import VueRouter from 'vue-router'
import Error404 from '@/Error404'
import Layout from '@/Layout'
import Login from '@/Login'
import ListaPedidos from '@/ListaPedidos'
import ListaResumenes from '@/ListaResumenes'
import Disponibilidad from '@/Disponibilidad'

Vue.use(VueRouter)

export default new VueRouter({
  /*
   * NOTE! VueRouter "history" mode DOESN'T works for Cordova builds,
   * it is only to be used only for websites.
   *
   * If you decide to go with "history" mode, please also open /config/index.js
   * and set "build.publicPath" to something other than an empty string.
   * Example: '/' instead of current ''
   *
   * If switching back to default "hash" mode, don't forget to set the
   * build publicPath back to '' so Cordova builds work again.
   */

  mode: 'hash',
  scrollBehavior: () => ({ y: 0 }),

  routes: [
    {
      path: '/login',
      name: 'Ingreso',
      component: Login
    },
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '/pedidos',
          name: 'Pedidos',
          component: ListaPedidos
        },
        {
          path: '/categorias',
          name: 'Resúmenes',
          component: ListaResumenes
        },
        {
          path: '/categorias/:categoria',
          name: 'Resúmen',
          component: ListaResumenes
        },
        {
          path: '/disponibilidad',
          name: 'Disponibilidad',
          component: Disponibilidad
        }
      ]
    },

    // Always leave this last one
    { path: '*', component: Error404 } // Not found
  ]
})
