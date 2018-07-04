var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CardSchema = new Schema({
  question: String,
  answer: String,
  category: String,
  sub_category: String,
  sub_sub_category: String
});

var Card = mongoose.model("Card", CardSchema);
module.exports = Card;