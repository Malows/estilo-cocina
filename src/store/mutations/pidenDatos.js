const setter = collection => (state, payload) => {
  state[collection] = payload.slice(0)
}

export default {
  SET_CATEGORIAS: setter('categorias'),
  SET_PLATOS: setter('platos'),
  SET_PEDIDOS: setter('pedidos'),
  SET_RESUMENES: setter('resumenes'),
  SET_MOZOS (state, mozos) {
    state.mozos = mozos.filter(x => x.tipo_usuario_id === 3)
  }
}
