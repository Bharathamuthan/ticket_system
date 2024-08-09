const express = require('express')
const authMiddleware = require('../middleware/authMiddleware')

const authRoutes = require('./authRoutes');
const roleRoutes = require('./roleRoutes');
const assignticketRoutes = require('./assignticketRoutes')

app.use('/user',authRoutes)
app.use('/role',roleRoutes)
app.use('/ticket',assignticketRoutes)

module.exports = app