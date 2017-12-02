export default {
  SET_PEDIDO_SELECCIONADO  (state, pedido = null) {
    if (pedido) state.pedido_seleccionado = Object.assign({}, pedido)
    else state.pedido_seleccionado = null
  },

  APPEND_PEDIDO (state, pedido) {
    state.pedidos = [ ...state.pedidos, Object.assign({}, pedido) ]
  },

  REPLACE_PEDIDO (state, pedido) {
    const indexOf = state.pedidos.findIndex(x => x.id === pedido.id)
    if (indexOf !== -1) {
      state.pedidos = [
        ...state.pedidos.slice(0, indexOf),
        Object.assign({}, pedido),
        ...state.pedidos.slice(indexOf + 1)
      ]
    }
  },

  REMOVE_PEDIDO (state, pedido) {
    const toFind = typeof pedido === 'number' ? pedido : pedido.id
    state.pedidos = state.pedidos.filter(el => el.id !== toFind)
  }
}
