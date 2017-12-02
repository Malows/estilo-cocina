const elementSetter = elem => (state, payload) => { state['elem'] = payload }

export default {
  SET_USER: elementSetter('user'),
  SET_TOKEN: elementSetter('token')
}
