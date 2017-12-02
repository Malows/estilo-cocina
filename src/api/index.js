export const DOMAIN = 'http://192.168.1.100:8000'
export const DOMAIN_NO_PORT = DOMAIN.replace(/:+\d+$/, '')
export const URL_PREFIX = DOMAIN + '/api'
export const URL = URL_PREFIX + '' // version de la api

export const LOGIN_URL = DOMAIN + '/oauth/token'
export const CATEGORIAS_URL = URL + '/categorias'
export const PLATOS_URL = URL + '/platos'
export const PERSONAL_URL = URL + '/personal'
export const SELF_USER_URL = URL + '/user'
export const PEDIDOS_URL = URL + '/pedidos'
export const DIGEST_PEDIDOS_URL = URL + '/digest/pedidos'
export const DISPONIBILIDAD_URL = URL + '/disponibilidad/platos'

export const ClientId = '2'
export const ClientSecret = '2PXScifuAA0orVW26R23hlngg2AMj317E4sZ6xTl'
export const OAuthPayload = { grant_type: 'password', client_id: ClientId, client_secret: ClientSecret, scope: '' }
