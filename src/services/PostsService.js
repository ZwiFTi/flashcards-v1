import Api from '@/services/Api'

export default {
  fetchCards () {
    return Api().get('cards')
  },

  addCard (params) {
    return Api().post('cards', params)
  },

  updateCard (params) {
    return Api().put('cards/' + params.id, params)
  },

  getCard (params) {
    return Api().get('card/' + params.id)
  },

  deleteCard (id) {
    return Api().delete('cards/' + id)
  },

  fetchGameCards () {
    return Api().get('game')
  }
}
