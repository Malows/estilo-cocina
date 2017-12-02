<template lang="pug">
  q-pull-to-refresh(
    :handler='refresher'
    pull-message='Arrastre para actualizar los datos'
    release-message='Suelte para actualizar los datos'
    refresh-message='Actualizando...'
    )
    .layout-padding
      .is-12-mobile.is-10-tablet.col-md-offset-1.is-8-desktop.col-lg-offset-2.text-left.small-padding(v-if='resumenes.length')
        categoria(v-for='categoria in resumenes' :key='categoria.id' :data='categoria')
</template>

<script>
import Categoria from './partials/Categoria'
import { mapGetters } from 'vuex'
import { QPullToRefresh, Toast } from 'quasar'

export default {
  name: 'lista-resumenes',
  components: { Categoria, QPullToRefresh },
  methods: {
    refresher (done) {
      this.$store.dispatch('refreshResumenes')
        .then(() => { done() })
        .catch(() => { Toast('Error') })
    }
  },
  computed: {
    ...mapGetters({
      resumenes: 'filteredResumenes'
    })
  },
  mounted () {
    this.$store.dispatch('refreshResumenes')
  }
}
</script>

<style lang="css"></style>
