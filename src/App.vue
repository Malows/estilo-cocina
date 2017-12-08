<template lang="pug">
  <!-- Don't drop "q-app" class -->
  #q-app
    router-view
</template>

<script>
/*
 * Root component
 */
export default {
  beforeDestroy () {
    this.$store.dispatch('logoutUser')
  }
}
</script>

<style>
.uppercase {
  text-transform: uppercase;
}
</style>
