<template>
        <div class="game">
            <div class="app-container">
                
                <!-- HEADER -->
                <div class="app-information">
                <p>Remaining cards: {{ questions.length }} - {{ questionsTodo.length }}</p>
                <hr>
                </div>
    
                <!-- CONTENT -->
                <div class="qa-parent">
                    <h1>{{ questions[0].question }}</h1>
                    <hr>
                    <h2 v-if="isSolution">{{ questions[0].answer }}</h2>
                </div>
    
                <!-- FOOTER -->
                <div class="btn-parent">
                    <button v-if="!isSolution" v-on:click="showSolution">Show solution</button>
                    <button class="btn-isSolution" v-if="isSolution" v-on:click="correctAnswer">Correct answer</button>
                    <button class="btn-isSolution" v-if="isSolution" v-on:click="falseAnswer">False answer</button>
                </div>
    
            </div>
        </div>
    </template>
      
    <script>
    import PostsService from '@/services/PostsService'
    export default {
        name: 'game',
        data () {
          return {
            questions: [],
            questionsTodo: [],
            isSolution: false,
          }
        },
        mounted () {
            this.getGameCards()
        },
        methods: {
            async getGameCards () {
                const response = await PostsService.fetchGameCards()
                this.questions = response.data.cards
                console.log(this.questions)
            },
    
            showSolution: function () {
                this.isSolution = true    
            },
            falseAnswer: function () {
            // Logic for correct answer. This should:
            // 1. 
                console.log(this.questions.length);
                if (this.questions.length > 0) {
                    this.questionsTodo.push(this.questions[0]); // Push this question into todo
                    this.questions.splice(0, 1); // Remove card from array
                    this.isSolution = false;
                }
                
                if (this.questions.length == 0) {
                    this.reset();
                }
            },
            correctAnswer: function () {
                if (this.questions.length > 0) {
                    this.questions.splice(0, 1); // Remove card from array
                    this.isSolution = false;
                }
                if (this.questions.length == 0) {
                    this.reset();
                }
                
            },
            reset: function () {
                if (this.questionsTodo.length == 0 ) {
                    // Insert logic for "winning the game"
                    return
                }
                this.questions = this.questionsTodo;
                this.questionsTodo = [];
            },
        }
    }
    </script>
    
    <style type="text/css">
    /* */
    .app-container {
      flex-direction: column;
      min-height: 100%;
      height: auto !important;
      height: 100%;
      margin: 0 auto -5px;
      position: relative;
      font-family: "Source Sans Pro", "Helvetica Neue", Arial, sans-serif;
      font-size: 15px;
    }
    
    /* INFORMATION */
    .app-information {
      height: 50px;
    }
    
    /* ANSWER AND QUJESTION */
    .qa-parent {
      display: flex;
      flex: wrap;
      flex-direction: column;
      height: 100%;
      text-align: center;
    }
    
    h1 {
      width: 100%;
    }
    
    h2 {
      width: 100%;
    }
    
    /* BUTTONS */
    .btn-parent {
      display: flex;
      height: 55px;
      padding: 0;
      position: fixed;
      bottom: 0;
      width: 100%
    }
    
    button {
      height: 100%;
      width: 100%;
    }
    
    .btn-isSolution {
      width: 50%;
    }
    </style>