<template lang="pug">
  q-pull-to-refresh(
    :handler='refresher'
    pull-message='Arrastre para actualizar los datos'
    release-message='Suelte para actualizar los datos'
    refresh-message='Actualizando...'
    )
    .layout-padding
      .is-12-mobile.is-10-tablet.col-md-offset-1.is-8-desktop.col-lg-offset-2.text-left.small-padding(v-if='pedidos.length')
        pedido(v-for='pedido in pedidos' :key='pedido.id' :data='pedido')
</template>

<script>
import { mapState } from 'vuex'
import Pedido from './partials/Pedido'
import ModalDespachar from './partials/ModalDespachar'
import { QBtn, QPullToRefresh, Toast } from 'quasar'

export default {
  name: 'lista-pedidos',
  components: { Pedido, ModalDespachar, QBtn, QPullToRefresh },
  computed: {
    ...mapState(['pedidos', 'pedido_seleccionado'])
  },
  methods: {
    refresher (done) {
      this.$store.dispatch('refreshAll')
        .then(() => { done() })
        .catch(err => { Toast(err) })
    }
  },
  mounted () {
    this.$store.dispatch('refreshPedidos')
  }
}
</script>

<style lang="css"></style>
