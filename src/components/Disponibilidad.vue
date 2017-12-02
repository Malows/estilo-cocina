<template lang="pug">
.layout-padding
  .list.padded-bottom(
    v-for='categoria in data'
    v-if='categoria.platos.length'
    @click='datosEnviar'
    )
    h4.uppercase {{ categoria.nombre }}
    q-toggle.list-item(
      v-for='plato in categoria.platos'
      v-model='plato.habilitado'
      :key='plato.id'
      :label='plato.nombre'
      )
</template>

<script>
import { mapState } from 'vuex'
import { QToggle } from 'quasar'

function pluck (lista) {
  return lista.reduce((c, x) => {
    c[`${x.id}`] = x.habilitado
    return c
  }, {})
}

export default {
  name: 'disponibilidad',
  components: { QToggle },
  data () {
    return {
      data: []
    }
  },
  computed: {
    ...mapState(['categorias']),
    filteredCategorias () {
      return this.$store.state.categorias
        .filter(x => x.platos.length)
        .map(categoria => {
          categoria.platos = categoria.platos.map(plato => Object.assign({}, {
            id: plato.id,
            nombre: plato.nombre,
            habilitado: plato.habilitado
          }))
          return categoria
        })
    }
  },
  methods: {
    datosEnviar () {
      return new Promise(resolve => {
        const datos = this.data.reduce((c, x) =>
          Object.assign(c, pluck(x.platos)), {})
        resolve(datos)
      })
    }
  },
  mounted () {
    this.$store.dispatch('refreshCategorias')
    this.data = this.filteredCategorias
    if (!this.data.length) {
      window.setTimeout(() => { this.data = this.categorias.filter(x => x.platos.length) }, 1000)
    }
    window.EventBus.$on('guardarDisponibilidad', () => {
      this.datosEnviar().then(datos => {
        this.$store.dispatch('actualizarDisponibilidad', datos)
      })
    })
  }
}
</script>

<style lang="css" scoped>
h4 {
  margin-left: 1rem;
}
.padded-bottom {
  padding-bottom: 1rem;
}
.list {
  display: flex;
  flex-direction: column;
}
.list-item {
  padding-left: 1rem;
  margin: 0.5rem 0;
}
</style>
