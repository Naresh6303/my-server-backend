const mongoose = require('mongoose')
const eModel = new mongoose.Schema({
    email: String,
    subject: String,
    message: String,
  });
  const EmailModel = mongoose.model('Email',eModel )
  module.exports = EmailModel