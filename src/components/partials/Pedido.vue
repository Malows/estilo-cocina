<template lang="html">
  <div class="box" @click="clickEnPedido">
    <p>Mozo: <strong>{{ data.mozo.name }}</strong> - {{ totalCosas }}</p>
    <div class="row">
      <plato v-for="plato in data.platos" :key="plato.id" :plato="plato"></plato>
      </div>
    </div>
  </div>
</template>

<script>
import Plato from './Plato'

export default {
  name: 'pedido',
  components: {
    Plato
  },
  props: ['data'],
  methods: {
    clickEnPedido () {
      this.$store.dispatch('setPedidoSeleccionado', this.data)
    }
  },
  computed: {
    totalCosas () {
      if (this.data === undefined) return ''
      else return `${this.data.total_cosas || ''} ${this.data.total_cosas > 1 ? 'cosas' : 'cosa'}`
    }
  }
}
</script>

<style lang="css">
</style>
