<template>
  <div class="cards">
    <h1>Cards</h1>
    <div v-if="cards.length > 0" class="table-wrap">
      <div>
        <router-link v-bind:to="{ name: 'NewCard' }" class="">Add Card</router-link>
      </div>
      <table>
        <tr>
          <td>Question</td>
          <td width="550">Answer</td>
          <td width="100" align="center">Action</td>
        </tr>
        <tr v-for="card in cards">
          <td>{{ card.question }}</td>
          <td>{{ card.answer }}</td>
          <td align="center">
            <router-link v-bind:to="{ name: 'EditCard', params: { id: card._id } }">Edit</router-link> |
            <a href="#" @click="deleteCard(card._id)">Delete</a>
          </td>
        </tr>
      </table>
    </div>
    <div v-else>
      There are no cards.. Lets add one now <br /><br />
      <router-link v-bind:to="{ name: 'NewCard' }" class="add_card_link">Add Card</router-link>
    </div>
  </div>
</template>

<script>
import PostsService from '@/services/PostsService'
export default {
  name: 'cards',
  data () {
    return {
      cards: []
    }
  },
  mounted () {
    this.getCards()
  },
  methods: {
    async getCards () {
      const response = await PostsService.fetchCards()
      this.cards = response.data.cards // NB! MIGHT BE posts INSTEAD OF cards
    },
    async deleteCard (id) {
      await PostsService.deleteCard(id)
      this.getCards()
      this.$router.push({ name: 'Cards' })
    }
  }
}
</script>
<style type="text/css">
.table-wrap {
  width: 60%;
  margin: 0 auto;
  text-align: center;
}
table th, table tr {
  text-align: left;
}
table thead {
  background: #f2f2f2;
}
table tr td {
  padding: 10px;
}
table tr:nth-child(odd) {
  background: #f2f2f2;
}
table tr:nth-child(1) {
  background: #4d7ef7;
  color: #fff;
}
a {
  color: #4d7ef7;
  text-decoration: none;
}
a.add_card_link {
  background: #4d7ef7;
  color: #fff;
  padding: 10px 80px;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
}
</style>
