const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema({
  members: [],
  messages:[{
    sender: String,
    text: String,
    createdAt: String
  }]
});

module.exports = mongoose.model("conversations", conversationSchema);
