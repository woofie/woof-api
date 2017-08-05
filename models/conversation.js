var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var conversationSchema = new Schema({
  transcript: String,
  documents: {
    score: Number
  },
  created_at: Date,
  updated_at: Date
});

conversationSchema.pre('save', function(next) {
  var currentDate = new Date();

  this.updated_at = currentDate;

  if (!this.created_at)
    this.created_at = currentDate;

  next();
});

var Conversation = mongoose.model('Conversation', conversationSchema);

module.exports = Conversation;