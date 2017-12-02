import { DISPONIBILIDAD_URL } from '../../api'

export default {
  setPedidoSeleccionado ({ commit }, pedido) {
    commit('SET_PEDIDO_SELECCIONADO', pedido)
  },

  nullPedidoSeleccionado ({ commit }) {
    commit('SET_PEDIDO_SELECCIONADO', null)
  },

  despacharPedido ({ commit, state }) {
    return new Promise((resolve, reject) => {
      window.axios.put(state.pedido_seleccionado.url_completar).then(({ data }) => {
        commit('SET_PEDIDO_SELECCIONADO', null)
        commit('REMOVE_PEDIDO', data)
        resolve(data)
      }).catch(err => { reject(err) })
    })
  },

  agregarPedido ({ commit }, pedido) {
    commit('APPEND_PEDIDO', pedido)
  },

  editarPedido ({ commit, state }, pedido) {
    commit('REPLACE_PEDIDO', pedido)
    if (pedido.id === state.pedido_seleccionado.id) {
      commit('SET_PEDIDO_SELECCIONADO', pedido)
    }
  },

  cancelarPedido ({ commit, state }, pedido) {
    commit('REMOVE_PEDIDO', pedido)
    if (pedido.id === state.pedido_seleccionado.id) {
      commit('SET_PEDIDO_SELECCIONADO', null)
    }
  },

  actualizarDisponibilidad ({ dispatch }, nuevo) {
    window.axios.put(DISPONIBILIDAD_URL, nuevo)
      .then(() => {
        dispatch('refreshCategorias')
      })
      .catch(({ response }) => {
        if (response.status === 401) {
          dispatch('checkCredentials').then(() => {
            dispatch('actualizarDisponibilidad', nuevo)
          })
        }
      })
  }
}
