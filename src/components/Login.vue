<template lang="pug">
.layout-padding
  .column
    .list
      .item.three-lines
        .item-content
          q-field(icon='mail')
            q-input.full-width(v-model='username' float-label='Email' required='')
      .item.three-lines
        .item-content
          q-field(icon='vpn_key')
            q-input.full-width(
              v-model='password'
              type='password'
              required=''
              float-label='Contraseña'
              @keyup.enter='submit'
              )
    q-btn.full-width(color='primary' @click='submit') Ingresar
    p(v-if='response') {{ response }}
    q-btn.raised.absolute-bottom-right(
      icon='photo_camera'
      round=''
      color='primary'
      style='bottom: 24px; right: 18px;'
      @click='scanQR()'
      )
</template>

<script>
import { QBtn, QInput, QField, Dialog, Toast } from 'quasar'
export default {
  name: 'login',
  components: { QBtn, QInput, QField },
  data () {
    return {
      username: '',
      password: '',
      response: ''
    }
  },
  methods: {
    submit () {
      this.response = ''

      if (!this.username || !this.password) {
        this.response = 'Ingrese Usuario y Contraseña antes de proceder.'
        return
      }

      const postData = { username: this.username, password: this.password }

      this.$store
        .dispatch('loginUser', postData)
        .then(({ tokens, user }) => {
          Toast.create(
            `Bienvenido ${user.name}. Su sesión expira en ${Math.round(
              tokens.expires_in / 3600
            )} horas.`
          )
          this.$store.dispatch('refreshAll').then(() => {
            this.$router.push({ path: '/pedidos' })
          })
        })
        .catch(err => {
          console.error(err)
          this.response = 'El servidor parece estar fuera de servicio.'
        })
    },

    scanQR () {
      cordova.plugins.barcodeScanner.scan(
        result => {
          if (result.cancelled) {
            Toast.create('Escaneo de código QR cancelado.')
            return
          }
          this.$store
            .dispatch('qrLogin', result.text)
            .then(({ tokens, user }) => {
              Toast.create(
                `Bienvenido ${user.name}. Su sesión expira en ${Math.round(
                  tokens.expires_in / 3600
                )} horas.`
              )
              this.$router.push({ path: '/' })
            })
            .catch(err => {
              console.error(err)
              this.response = 'El servidor parece estar fuera de servicio.'
            })
        },
        error => {
          Dialog.create({ message: `Fallo al escanear el código QR: ${error}` })
        }
      )
    }
  }
}
</script>

<style>
</style>
