const mongoose = require('mongoose');

const usernameSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const Username = mongoose.model('Username', usernameSchema);

module.exports = Username;
