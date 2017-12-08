// === DEFAULT / CUSTOM STYLE ===
// WARNING! always comment out ONE of the two require() calls below.
// 1. use next line to activate CUSTOM STYLE (./src/themes)
// require(`./themes/app.${__THEME}.styl`)
// 2. or, use next line to activate DEFAULT QUASAR STYLE
require(`quasar/dist/quasar.${__THEME}.css`)
// ==============================

// Uncomment the following lines if you need IE11/Edge support
// require(`quasar/dist/quasar.ie`)
// require(`quasar/dist/quasar.ie.${__THEME}.css`)

import Vue from 'vue'
import Quasar from 'quasar'
import { sync } from 'vuex-router-sync'
import router from './router'
import store from './store/'
import axios from 'axios'
import io from 'socket.io-client'
import Echo from 'laravel-echo'
import { DOMAIN_NO_PORT } from './api/'
sync(store, router)

window.io = io
window.axios = axios
window.EventBus = new Vue()
Vue.config.productionTip = false
Vue.use(Quasar) // Install Quasar Framework

if (__THEME === 'mat') {
  require('quasar-extras/roboto-font')
}
import 'quasar-extras/material-icons'
// import 'quasar-extras/ionicons'
// import 'quasar-extras/fontawesome'
// import 'quasar-extras/animate'
import './assets/style.css'

Quasar.start(() => {
  /* eslint-disable no-new */
  new Vue({
    el: '#q-app',
    store,
    router,
    render: h => h(require('./App').default)
  })
})

window.Echo = new Echo({
  broadcaster: 'socket.io',
  host: DOMAIN_NO_PORT + ':6001',
  namespace: ''
})

// window.Echo.channel('pedidos')
//   .listen('nuevoPedido', x => { store.dispatch('agregarPedido', x['pedido']) })
//   .listen('editarPedido', x => { store.dispatch('editarPedido', x['pedido']) })
//   .listen('cancelarPedido', x => { store.dispatch('cancelarPedido', x['id']) })

// window.setTimeout(() => { alert('tu socket es ' + window.Echo.socketId()) }, 5000)
