<template lang="pug">
// Configure "view" prop for QLayout
#q-app
  q-layout(ref='layout' view='hHh LpR fff')
    q-toolbar(slot='header')
      // opens drawer below
      q-btn.hide-on-drawer-visible(flat='' @click='$refs.layout.toggleLeft()')
        q-icon(name='menu')
      q-toolbar-title {{ route.name || 'Cocina' }}
    // Left Side Panel
    div(slot='left')
      q-list(no-border='' link='' inset-delimiter='')
        q-list-header Opciones
        q-side-link(item='' to='/pedidos')
          q-item-side(icon='receipt')
          q-item-main(label='Pedidos' sublabel='Lista de pedidos')
        q-side-link(item='' to='/categorias')
          q-item-side(icon='event_note')
          q-item-main(label='Categorías' sublabel='Resúmenes por categorías')
        q-item-separator
        q-side-link(item='' to='/disponibilidad')
          q-item-side(icon='edit')
          q-item-main(label='Disponibilidad' sublabel='Modificar disponibilidad de los platos')
        q-item-separator
        q-item(@click='logout')
          q-item-side(icon='exit_to_app')
          q-item-main(label='Salir' sublabel='Cerrar la sesión')
    modal-despachar(v-if='showModal')
    router-view
    q-btn.raised.fixed-bottom-right(
      v-if="route.name.includes('Pedido')"
      icon='event_note'
      round=''
      color='primary'
      @click="$router.push({ path: '/categorias' })"
      style='bottom: 24px; right: 18px;'
      )
    q-btn.raised.fixed-bottom-right(
      v-if="route.name.includes('Resúmen')"
      icon='receipt'
      round=''
      color='primary'
      @click="$router.push({ path: '/pedidos' })"
      style='bottom: 24px; right: 18px;'
      )
    q-btn.raised.fixed-bottom-right(
      v-if="route.name.includes('Disponibilidad')"
      icon='check'
      round=''
      color='primary'
      @click='guardarDisponibilidad'
      style='bottom: 24px; right: 18px;'
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
  QItemMain,
  QSideLink
} from 'quasar'
import ModalDespachar from './partials/ModalDespachar'
import { mapState, mapGetters } from 'vuex'

export default {
  components: {
    ModalDespachar,
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
    QItemMain,
    QSideLink
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
