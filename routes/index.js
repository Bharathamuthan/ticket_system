const express = require('express')
const authMiddleware = require('../middleware/auth')

const authRoutes = require('./authRoutes');
const roleRoutes = require('./roleRoutes');
const assignticketRoutes = require('./assignticketRoutes');
const ticketcreateRoutes = require('./ticketcreateRoutes');

app.use('/user',authRoutes)
app.use('/role',roleRoutes)
app.use('/ticket',assignticketRoutes)
app.use('/ticket',ticketcreateRoutes)
// app.use(express.json())
// app.use('/auth',authMiddleware)

module.exports = app