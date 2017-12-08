<template lang="pug">
  q-side-link(item='' :to='to')
    q-item-side(:icon='icon')
    q-item-main(:label='label', :sublabel='sublabel')
</template>

<script>
import { QSideLink, QItemSide, QItemMain } from 'quasar'
export default {
  name: 'menu-item',
  components: { QSideLink, QItemSide, QItemMain },
  props: {
    to: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    sublabel: {
      type: String,
      required: false
    },
    icon: {
      type: String,
      required: false
    }
  }
}
</script>

<style lang="css">
</style>
