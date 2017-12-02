const GETTERS = {
  showModal: state => state.pedido_seleccionado !== null,
  filteredResumenes: state => state.route.params.categoria
    ? state.resumenes.filter(x => x.id === state.route.params.categoria)
    : state.resumenes
}

export default GETTERS
