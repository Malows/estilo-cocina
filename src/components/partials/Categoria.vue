<template lang="pug">
  .box(v-if='data.platos.length' @click='clickEnCategoria')
    h2.title.uppercase {{ data.nombre }}
    h4.subtitle {{ parsedTotal }}
    hr
    .row
      plato(v-for='plato in data.platos' :key='plato.id' :plato='plato')
</template>

<script>
import Plato from './Plato'
export default {
  name: 'categoria',
  components: {
    Plato
  },
  props: ['data'],
  computed: {
    parsedTotal () {
      const total = this.data.platos.reduce((acc, cur) => acc + cur.cantidad, 0)
      return `${total} ${total > 1 ? 'cosas' : 'cosa'}`
    }
  },
  methods: {
    clickEnCategoria () {
      this.$router.push({ name: 'Resúmen', params: { categoria: this.data.id } })
    }
  }
}
</script>
