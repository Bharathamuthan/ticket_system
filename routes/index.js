const express = require('express')
const authMiddleware = require('../middleware/authMiddleware')

const authRoutes = require('./authRoutes')
const roleRoutes = require('./roleRoutes');

app.use('/user',authRoutes)
app.use('/role',roleRoutes)

module.exports = app