module.exports = {
  namespace: 'splash',
  state: { initialized: false},
  subscriptions: [
    function (send) {
      document.addEventListener('DOMContentLoaded', (e) => send('splash:initialize', {payload: true}))
    }
  ],
  reducers: {
    initialize: function (action, state) {
      return { initialized: action.payload }
    }
  }
}