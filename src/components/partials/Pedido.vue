<template lang="pug">
  .box(@click='clickEnPedido')
    p
      | Mozo:
      strong {{ data.mozo.name }}
      |  - {{ totalCosas }}
    .row
      plato(v-for='plato in data.platos' :key='plato.id' :plato='plato')
</template>

<script>
import Plato from './Plato'

export default {
  name: 'pedido',
  components: { Plato },
  props: ['data'],
  methods: {
    clickEnPedido () {
      this.$store.dispatch('setPedidoSeleccionado', this.data)
    }
  },
  computed: {
    totalCosas () {
      const total = this.data.total_cosas
      return total ? `${total || ''} ${total > 1 ? 'cosas' : 'cosa'}` : ''
    }
  }
}
</script>

<style lang="css">
</style>
