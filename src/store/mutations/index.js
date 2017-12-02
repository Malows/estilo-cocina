import pedido from './pedido'
import pidenDatos from './pidenDatos'
import user from './user'

const MUTATIONS = {
  ...pedido,
  ...pidenDatos,
  ...user
}

export default MUTATIONS
