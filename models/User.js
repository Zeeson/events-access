const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const User = Schema({
  username: { type: String, unique: true },
  password: { type: String, min: 6 },
  admin: { type: Boolean, default: false }
});

module.exports = mongoose.model('event-access-user', User);
