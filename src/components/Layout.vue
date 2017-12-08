<template lang="pug">
// Configure "view" prop for QLayout
#q-app
  q-layout(ref='layout' view='hHh LpR fff')
    q-toolbar(slot='header')
      // opens drawer below
      q-btn.hide-on-drawer-visible(icon='menu' flat='' @click='$refs.layout.toggleLeft()')
        q-icon(name='menu')
      q-toolbar-title {{ route.name || 'Cocina' }}
    // Left Side Panel
    div(slot='left')
      q-list(no-border='' link='' inset-delimiter='')
        q-list-header Opciones
        menu-item(to='/pedidos' icon='receipt' label='Pedidos' sublabel='Lista de pedidos')
        menu-item(to='/categorias' icon='event_note' label='Categorías' sublabel='Resúmenes por categorías')
        q-item-separator
        menu-item(to='/disponibilidad' icon='edit' label='Disponibilidad' sublabel='Modificar disponibilidad de los platos')
        q-item-separator
        q-item(@click='logout')
          q-item-side(icon='exit_to_app')
          q-item-main(label='Salir' sublabel='Cerrar la sesión')
    modal-despachar(v-if='showModal')
    router-view
    boton(
      v-if="route.name.includes('Pedido')"
      icon='event_note'
      @click="$router.push({ path: '/categorias' })"
      )
    boton(
      v-if="route.name.includes('Resúmen')"
      icon='receipt'
      @click="$router.push({ path: '/pedidos' })"
      )
    boton(
      v-if="route.name.includes('Disponibilidad')"
      icon='check'
      @click='guardarDisponibilidad'
      )
</template>

<script>
import {
  QLayout,
  QToolbar,
  QToolbarTitle,
  QBtn,
  QIcon,
  QItem,
  QItemSeparator,
  QList,
  QListHeader,
  QItemSide,
  QItemMain
} from 'quasar'
import ModalDespachar from './partials/ModalDespachar'
import MenuItem from './partials/MenuItem'
import Boton from './partials/Boton'
import { mapState, mapGetters } from 'vuex'

export default {
  components: {
    Boton,
    ModalDespachar,
    MenuItem,
    QLayout,
    QToolbar,
    QToolbarTitle,
    QBtn,
    QIcon,
    QItem,
    QItemSeparator,
    QList,
    QListHeader,
    QItemSide,
    QItemMain
  },
  methods: {
    logout () {
      this.$store.dispatch('logoutUser')
      this.$router.push({ path: '/login' })
    },
    guardarDisponibilidad () {
      window.EventBus.$emit('guardarDisponibilidad')
    }
  },
  computed: {
    ...mapState(['route']),
    ...mapGetters(['showModal'])
  },
  mounted () {
    if (this.route.fullPath === '/') this.$router.push({ path: '/pedidos' })
  }
}
</script>

<style>
</style>
