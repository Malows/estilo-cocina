import pedido from './pedido'
import pidenDatos from './pidenDatos'
import user from './user'

const actions = {
  ...pidenDatos,
  ...pedido,
  ...user
}

export default actions
