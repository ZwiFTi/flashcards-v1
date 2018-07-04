<template>
    <div class="cards">
      <h1>Edit Card</h1>
        <div class="form">
          <div>
            <input type="text" name="question" placeholder="QUESTION" v-model="question">
          </div>
          <div>
            <textarea rows="15" cols="15" placeholder="ANSWER" v-model="answer"></textarea>
          </div>
          <div>
            <input type="text" name="category" placeholder="CATEGORY" v-model="category">
          </div>
          <div>
            <input type="text" name="sub_category" placeholder="SUB_CATEGORY" v-model="sub_category">
          </div>
          <div>
            <input type="text" name="sub_sub_category" placeholder="SUB_SUB_CATEGORY" v-model="sub_sub_category">
          </div>
          <div>
            <button class="app_card_btn" @click="updateCard">Update</button>
          </div>
        </div>
    </div>
  </template>
  
  <script>
  import PostsService from '@/services/PostsService'
  export default {
    name: 'EditCard',
    data () {
      return {
        answer: '',
        question: '',
        category: '',
        sub_category: '',
        sub_sub_category: '',
      }
    },
    mounted () {
      this.getCard()
    },
    methods: {
      async getCard () {
        const response = await PostsService.getCard({
          id: this.$route.params.id
        })
        this.question = response.data.question
        this.answer = response.data.answer
        this.category = response.data.category
        this.sub_category = response.data.sub_category
        this.sub_sub_category = response.data.sub_sub_category
      },
      async updateCard () {
        await PostsService.updateCard({
          id: this.$route.params.id,
          answer: this.answer,
          question: this.question,
          category: this.category,
          sub_category: this.sub_category,
          sub_sub_category: this.sub_sub_category,
        })
        this.$router.push({ name: 'Cards' })
      }
    }
  }
  </script>
  <style type="text/css">
  .form input, .form textarea {
    width: 500px;
    padding: 10px;
    border: 1px solid #e0dede;
    outline: none;
    font-size: 12px;
  }
  .form div {
    margin: 20px;
  }
  .app_card_btn {
    background: #4d7ef7;
    color: #fff;
    padding: 10px 80px;
    text-transform: uppercase;
    font-size: 12px;
    font-weight: bold;
    width: 520px;
    border: none;
    cursor: pointer;
  }
  </style>