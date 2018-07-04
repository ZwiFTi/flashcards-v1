const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
var Card = require("../models/card");

const app = express()

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/posts');
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function(callback){
  console.log("Connection Succeeded");
});

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

// Fetch all cards
app.get('/cards', (req, res) => {
    Card.find({}, 'question answer category sub_category sub_sub_category', function (error, cards) {
      if (error) { console.error(error); }
      res.send({
        cards: cards
      })
    }).sort({_id:-1})
  })

// Add new card
app.post('/cards', (req, res) => {
    var db = req.db;
    var question = req.body.question;
    var answer = req.body.answer;
    var category = req.body.category;
    var sub_category = req.body.sub_category;
    var sub_sub_category = req.body.sub_sub_category;
    var new_card = new Card({
      question: question,
      answer: answer,
      category: category,
      sub_category: sub_category,
      sub_sub_category: sub_sub_category
    })

    new_card.save(function (error) {
      if (error) {
        console.log(error)
      }
      res.send({
        success: true,
        message: 'Card saved successfully!'
      })
    })
  })

// Fetch single card
app.get('/card/:id', (req, res) => {
  var db = req.db;
  Card.findById(req.params.id, 'question answer category sub_category sub_sub_category', function (error, card) {
    if (error) { console.error(error); }
    res.send(card)
  })
})

// Update a card
app.put('/cards/:id', (req, res) => {
  var db = req.db;
  Card.findById(req.params.id, 'question answer category sub_category sub_sub_category', function (error, card) {
    if (error) { console.error(error); }

    card.question = req.body.question
    card.answer = req.body.answer
    card.category = req.body.category
    card.sub_category = req.body.sub_category
    card.sub_sub_category = req.body.sub_sub_category
    card.save(function (error) {
      if (error) {
        console.log(error)
      }
      res.send({
        success: true
      })
    })
  })
})

// Delete a card
app.delete('/cards/:id', (req, res) => {
  var db = req.db;
  Card.remove({
    _id: req.params.id
  }, function(err, card){
    
    if (err)
      res.send(err)
    res.send({
      success: true
    })
  })
})

// Play game
// Fetch 10 cards
app.get('/game', (req, res) => {
  Card.find({}, 'question answer', function (error, cards) {
    if (error) { console.error(error); }
    
    // The world-class algorithm
    randomized_cards = []
    for (let i = 0; i < 10; i++) {
      randomized_cards.push(cards[Math.floor(Math.random()*cards.length)]);
    }

    res.send({
      cards: randomized_cards
    })
  }).sort({_id:-1})
})

app.listen(process.env.PORT || 8083)
