import { LOGIN_URL, SELF_USER_URL, OAuthPayload } from '../../api'
import { addSeconds } from 'date-fns'
import { Base64 } from 'js-base64'

const manejarErrorLogin = (tokens, reject) => {
  if (!tokens.error) return
  let mensaje = tokens.error
  if (!mensaje.name) reject(mensaje)
  mensaje = mensaje.name === 'InvalidCredentialsError'
    ? 'Usuario/Contraseña incorrectos. Por favor intente de nuevo.'
    : mensaje.name
  reject(mensaje)
}

const parseLoginPayload = (username, password) => Object.assign({}, OAuthPayload, { username, password })

const addExpirationData = (tokens) => Object.assign(
  tokens,
  { created: new Date(), expire: addSeconds(new Date(), tokens.expires_in) }
)

const applyAxiosHeader = token => {
  window.axios.defaults.headers.common['Accept'] = 'application/json'
  window.axios.defaults.headers.common['Content-Type'] = 'application/json'
  window.axios.defaults.headers.common['Authorization'] = token
}

const b64DecodeLogin = str => Base64.decode(str.split('').reverse().join(''))

export default {
  logoutUser ({ commit }) {
    if (window.localStorage) window.localStorage.clear()
    commit('SET_USER', null)
    commit('SET_TOKEN', null)
  },

  setUser ({ commit }, user) {
    if (user) window.localStorage.setItem('user', JSON.stringify(user))
    else window.localStorage.removeItem('user')
    commit('SET_USER', user)
  },

  setToken ({ commit }, token) {
    if (token) window.localStorage.setItem('token', token)
    else window.localStorage.removeItem('token')
    commit('SET_TOKEN', token)
  },

  checkCredentials ({ commit, state }) {
    return new Promise((resolve, reject) => {
      if (!window.localStorage) return reject(Error('No soporta localStorage.'))
      const token = window.localStorage.getItem('token')

      applyAxiosHeader(token)

      window.axios.get(SELF_USER_URL).then(({ data }) => {
        window.localStorage.setItem('user', JSON.stringify(data))
        if (data && state.user !== data) {
          commit('SET_USER', data)
          commit('SET_TOKEN', token)
        }
        resolve(data)
      })
        .catch(err => { reject(err) })
    })
  },

  loginUser ({ commit, dispatch }, { username, password }) {
    return new Promise((resolve, reject) => {
      const payload = parseLoginPayload(username, password)

      window.axios.post(LOGIN_URL, payload).then(({ data: tokens }) => {
        tokens = addExpirationData(tokens)
        manejarErrorLogin(tokens, reject)
        const token = `${tokens.token_type} ${tokens.access_token}`

        applyAxiosHeader(token)

        window.axios.get(SELF_USER_URL).then(({ data: user }) => {
          user.created = tokens.created
          user.expire = tokens.expire
          dispatch('setUser', user)
          dispatch('setToken', token)
          localStorage.setItem('authTokens', JSON.stringify(tokens))
          resolve({ tokens, user })
        }).catch(() => { reject(Error('Datos de usuario inalcansables')) })
      }).catch(() => { reject(Error('Ingreso no realizado')) })
    })
  },

  qrLogin ({ dispatch }, QrString) {
    return new Promise((resolve, reject) => {
      let payload = JSON.parse(b64DecodeLogin(QrString))
      dispatch('LOGIN_USER', payload)
        .then(data => { resolve(data) })
        .catch(err => { reject(err) })
    })
  }
}
