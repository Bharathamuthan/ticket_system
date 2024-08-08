const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const authRoutes = require('./authRoutes');


app.use('/user',authRoutes)


module.exports = app