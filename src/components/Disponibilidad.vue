<template lang="html">
  <div class="layout-padding">
    <div v-for="categoria in data" v-if="categoria.platos.length" class="list padded-bottom" @click="datosEnviar">
      <h4>{{ categoria.nombre.toUpperCase() }}</h4>
      <q-toggle v-for="plato in categoria.platos" :key="plato.id" v-model="plato.habilitado" :label="plato.nombre" class="list-item"/>
    </div>
  </div>
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
  components: {
    QToggle
  },
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
      return this.data.reduce((c, x) => Object.assign(c, pluck(x.platos)), {})
    }
  },
  mounted () {
    this.$store.dispatch('refreshCategorias')
    this.data = this.filteredCategorias
    if (!this.data.length) {
      window.setTimeout(() => { this.data = this.categorias.filter(x => x.platos.length) }, 3000)
    }
    window.EventBus.$on('guardarDisponibilidad', () => {
      console.log('dino nikita')
      this.$store.dispatch('actualizarDisponibilidad', this.datosEnviar())
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
