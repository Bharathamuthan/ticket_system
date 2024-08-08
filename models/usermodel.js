const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    Firstname: { type: String, required: true, unique: true, minlength:2 , maxlength:20 },
    Lastname: { type: String, required: true, unique: true, minlength:2 , maxlength:20 },
    email: { type: String, required: true, unique: true ,  match: /.+\@.+\..+/  },
    password: { type: String, required: true , minlength:7 },
    Phonenumber: { type:Number, required: true , min: 1000000000, max: 9999999999 }
  });
  
  const User = mongoose.model('User', userSchema);

  module.exports = User;