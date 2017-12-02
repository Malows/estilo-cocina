<template>
  <!-- Configure "view" prop for QLayout -->
  <div id="q-app">
    <q-layout ref="layout" view="hHh LpR fff">
      <q-toolbar slot="header">
        <!-- opens drawer below -->
        <q-btn flat class="hide-on-drawer-visible" @click="$refs.layout.toggleLeft()">
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>{{ route.name || 'Cocina' }}</q-toolbar-title>
      </q-toolbar>

      <!-- Left Side Panel -->
      <div slot="left">
        <q-list no-border link inset-delimiter>
          <q-list-header>Opciones</q-list-header>
          <q-side-link item to="/pedidos">
            <q-item-side icon="receipt" />
            <q-item-main label="Pedidos" sublabel="Lista de pedidos" />
          </q-side-link>
          <q-side-link item to="/categorias">
            <q-item-side icon="event_note" />
            <q-item-main label="Categorías" sublabel="Resúmenes por categorías" />
          </q-side-link>
          <q-item-separator />
          <q-side-link item to="/disponibilidad">
            <q-item-side icon="edit" />
            <q-item-main label="Disponibilidad" sublabel="Modificar disponibilidad de los platos" />
          </q-side-link>
          <q-item-separator />
          <q-item @click="logout">
            <q-item-side icon="exit_to_app" />
            <q-item-main label="Salir" sublabel="Cerrar la sesión" />
          </q-item>
        </q-list>
      </div>

    <modal-despachar v-if="showModal" />

    <router-view />

    <q-btn v-if="route.name.includes('Pedido')"
    icon="event_note" round color="primary" class="raised fixed-bottom-right"
    @click="$router.push({ path: '/categorias' })" style="bottom: 24px; right: 18px;" />

    <q-btn v-if="route.name.includes('Resúmen')"
    icon="receipt" round color="primary" class="raised fixed-bottom-right"
    @click="$router.push({ path: '/pedidos' })" style="bottom: 24px; right: 18px;" />

    <q-btn v-if="route.name.includes('Disponibilidad')"
    icon="check" round color="primary" class="raised fixed-bottom-right"
    @click="guardarDisponibilidad" style="bottom: 24px; right: 18px;" />

    </q-layout>
  </div>
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
  data () {
    return {}
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
  }
}
</script>

<style>
</style>
