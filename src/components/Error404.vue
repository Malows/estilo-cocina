<template lang="pug">
  .error-page.window-height.window-width.bg-light.column.items-center.no-wrap
    .error-code.bg-primary.flex.items-center.content-center.justify-center
      | 404
    div
      .error-card.shadow-4.bg-white.column.items-center.justify-center.no-wrap
        q-icon(name='error_outline' color='grey-5')
        p.caption.text-center Oops. Nothing here...
        p.text-center.group
          q-btn(v-if='canGoBack' color='primary' push='' @click='goBack' icon='keyboard_arrow_left')
            | Go back
          q-btn(color='primary' push='' @click="$router.replace('/')" icon-right='home')
            | Go home
</template>

<script>
import { QBtn, QIcon } from 'quasar'

export default {
  components: { QBtn, QIcon },
  data () {
    return {
      canGoBack: window.history.length > 1
    }
  },
  methods: {
    goBack () {
      window.history.go(-1)
    }
  }
}
</script>

<style lang="stylus">
.error-page
  .error-code
    height 50vh
    width 100%
    padding-top 15vh
    @media (orientation: landscape) {
      font-size 30vw
    }
    @media (orientation: portrait) {
      font-size 30vh
    }
    color rgba(255, 255, 255, .2)
    overflow hidden
  .error-card
    border-radius 2px
    margin-top -50px
    width 80vw
    max-width 600px
    padding 25px
    > i
      font-size 5rem
</style>
