import { CATEGORIAS_URL, PLATOS_URL, PEDIDOS_URL, PERSONAL_URL, DIGEST_PEDIDOS_URL } from '../../api'

const scrapper = (url, commiter, self) => ({ commit, dispatch }) => {
  window.axios.get(url)
    .then(({ data }) => {
      commit(commiter, data)
    })
    .catch(({ response }) => {
      if (response.status === 401) {
        dispatch('checkCredentials').then(() => { dispatch(self) })
      }
    })
}

export default {
  refreshCategorias: scrapper(CATEGORIAS_URL, 'SET_CATEGORIAS', 'refreshCategorias'),
  refreshPlatos: scrapper(PLATOS_URL, 'SET_PLATOS', 'refreshPlatos'),
  refreshPedidos: scrapper(PEDIDOS_URL, 'SET_PEDIDOS', 'refreshPedidos'),
  refreshPersonal: scrapper(PERSONAL_URL, 'SET_MOZOS', 'refreshPersonal'),
  refreshResumenes: scrapper(DIGEST_PEDIDOS_URL, 'SET_RESUMENES', 'refreshResumenes'),

  refreshAll ({ commit, dispatch }) {
    const urls = [CATEGORIAS_URL, PLATOS_URL, PEDIDOS_URL, PERSONAL_URL, DIGEST_PEDIDOS_URL]

    return new Promise((resolve, reject) => {
      Promise.all(urls.map(x => window.axios.get(x)))
        .then(([{ data: categorias }, { data: platos }, { data: pedidos }, { data: personal }, { data: resumenes }]) => {
          commit('SET_CATEGORIAS', categorias)
          commit('SET_PLATOS', platos)
          commit('SET_PEDIDOS', pedidos)
          commit('SET_MOZOS', personal.filter(x => x.tipo_usuario_id === 3))
          commit('SET_RESUMENES', resumenes)
          resolve({categorias, platos, pedidos, personal, resumenes})
        })
        .catch(err => { reject(err) })
    })
  }
}
