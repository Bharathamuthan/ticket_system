const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/login1';

mongoose.connect(MONGODB_URI)
 
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB Connection error:",err));

module.exports = mongoose;
