<template lang="pug">
.modal(:class="{ 'is-active': showModal }")
  .modal-background(@click='hideModal')
  .modal-card
    header.modal-card-head
      p.modal-card-title Despachar pedido completo
      button.delete(@click='hideModal')
    section.modal-card-body
      p
        | Mozo:
        |
        strong {{ pedido.mozo.name }}
        |
        |  - {{ pedido.total_cosas }} {{ pedido.total_cosas &gt; 1 ? &apos;cosas&apos; : &apos;cosa&apos; }}
      .row
        plato(v-for='plato in pedido.platos' :key='plato.id' :plato='plato' :estilos="['col-sm-12', 'col-md-6', 'pedido-item']")
    footer.modal-card-foot
      button.button.is-large.is-fullwidth(@click='hideModal') Cerrar
      button.button.is-info.is-large.is-fullwidth(@click='despacharPedido') Completar
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
