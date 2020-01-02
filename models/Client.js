const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Client = Schema({
  name: String,
  email: { type: String, unique: true },
  token: String
});

module.exports = mongoose.model('event-access-client', Client);
