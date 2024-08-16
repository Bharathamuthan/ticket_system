const express = require('express')
const authMiddleware = require('../middleware/auth')

const authRoutes = require('./authRoutes');
const roleRoutes = require('./roleRoutes');
const projectRoutes = require('./routes/projectRoutes');
const submoduleRoutes = require('./routes/submoduleRoutes');
const assignticketRoutes = require('./assignticketRoutes');
const ticketcreateRoutes = require('./ticketcreateRoutes');

app.use('/user',authRoutes)
app.use('/role',roleRoutes)
app.use('/project', projectRoutes);
app.use('/submodule', submoduleRoutes);
app.use('/ticket',assignticketRoutes)
app.use('/ticket',ticketcreateRoutes)

module.exports = app