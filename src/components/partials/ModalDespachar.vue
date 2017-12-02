<template lang="html">
  <div class="modal" :class="{ 'is-active': showModal }">
    <div class="modal-background" @click="hideModal" />
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Despachar pedido completo</p>
        <button class="delete" @click="hideModal" />
      </header>
      <section class="modal-card-body">
        <p>Mozo: <strong>{{ pedido.mozo.name }}</strong> - {{ pedido.total_cosas }} {{ pedido.total_cosas > 1 ? 'cosas' : 'cosa' }}</p>
        <div class="row">
          <plato v-for="plato in pedido.platos" :key="plato.id" :plato="plato" :estilos="['col-sm-12', 'col-md-6', 'pedido-item']" />
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-large is-fullwidth" @click="hideModal">Cerrar</button>
        <button class="button is-info is-large is-fullwidth" @click="despacharPedido">Completar</button>
    </footer>
    </div>
  </div>
</template>

<script>
import 'bulma/css/bulma.css'
import Plato from './Plato'
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'modal-despachar',
  components: {
    Plato
  },
  methods: {
    hideModal () {
      this.$store.dispatch('nullPedidoSeleccionado')
    },
    despacharPedido () {
      this.$store.dispatch('despacharPedido').then(() => {
        this.hideModal()
      })
    }
  },
  computed: {
    ...mapGetters(['showModal']),
    ...mapState({
      pedido: state => state.pedido_seleccionado
    })
  }
}
</script>

<style lang="css">
</style>
