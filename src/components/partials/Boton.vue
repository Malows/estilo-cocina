<template lang="pug">
q-btn.raised.fixed-bottom-right(
  :icon='icon'
  round=''
  color='primary'
  @click="$router.push({ path: '/categorias' })"
  style='bottom: 24px; right: 18px;'
  )
</template>

<script>
import { QBtn } from 'quasar'
export default {
  name: 'boton',
  components: { QBtn },
  props: ['icon']
}
</script>

<style lang="css">
</style>
