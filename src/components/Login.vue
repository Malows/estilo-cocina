<template>
  <div class="layout-padding">
    <div class="column">
      <div class="list">
        <div class="item three-lines">
          <q-field icon="mail">
            <q-input v-model="username" float-label="Tú email" required class="full-width" />
          </q-field>
        </div>
        <div class="item three-lines">
          <div class="item-content">
            <q-field icon="vpn_key">
              <q-input v-model="password" type="password" required float-label="Tú contraseña" class="full-width" @keyup.enter="submit"/>
            </q-field>
          </div>
        </div>
      </div>
      <q-btn color="primary" class="full-width" @click="submit">Login</q-btn>
      <p v-if="response">{{ response }}</p>
      <q-btn
        icon="photo_camera"
        round
        color="primary"
        class="raised absolute-bottom-right"
        style="bottom: 24px; right: 18px;"
        @click="scanQR()" />
    </div>
  </div>
</template>

<script>
import { QBtn, QInput, QField, Dialog, Toast } from 'quasar'
export default {
  components: {
    'q-btn': QBtn,
    'q-input': QInput,
    'q-field': QField
  },
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

      this.$store.dispatch('loginUser', postData)
        .then(({ tokens, user }) => {
          Toast.create(`Bienvenido ${user.name}. Su sesión expira en ${tokens.expires_in / 3600} horas.`)
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
          this.$store.dispatch('qrLogin', result.text)
            .then(({ tokens, user }) => {
              Toast.create(`Bienvenido ${user.name}. Su sesión expira en ${tokens.expires_in / 3600} horas.`)
              this.$router.push({ path: '/' })
            })
            .catch(err => {
              console.error(err)
              this.response = 'El servidor parece estar fuera de servicio.'
            })
        },
        error => {
          Dialog.create({ message: `Fallo al escanear el código QR: ${error}` })
        })
    }
  }
}
</script>

<style>
</style>
