const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  roles: {
    type: String,
    required: true
  },
  enterprises: {
    type: String
  }
});

module.exports = mongoose.model('User', UserSchema);