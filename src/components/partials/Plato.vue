<template lang="html">
  <div :class="estilos ? estilos : ['col-xs-6', 'col-sm-4', 'pedido-item']">
    {{plato.nombre}}
    <strong class="text-danger" v-if="plato.cantidad > 1">X{{plato.cantidad}}</strong>
  </div>
</template>

<script>
export default {
  name: 'plato',
  props: {
    plato: {
      type: Object,
      required: true
    },
    estilos: {
      type: Array,
      required: false
    }
  }
}
</script>
