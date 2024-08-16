const express = require('express')
const authMiddleware = require('../middleware/auth')

const authRoutes = require('./authRoutes');
const roleRoutes = require('./roleRoutes');
<<<<<<< HEAD
=======
const projectRoutes = require('./routes/projectRoutes');
const submoduleRoutes = require('./routes/submoduleRoutes');
>>>>>>> 7cc168945e2b9c81a619f2f86322eac50cf7820f
const assignticketRoutes = require('./assignticketRoutes');
const ticketcreateRoutes = require('./ticketcreateRoutes');

app.use('/user',authRoutes)
app.use('/role',roleRoutes)
app.use('/project', projectRoutes);
app.use('/submodule', submoduleRoutes);
app.use('/ticket',assignticketRoutes)
app.use('/ticket',ticketcreateRoutes)
<<<<<<< HEAD
// app.use(express.json())
// app.use('/auth',authMiddleware)
=======
>>>>>>> 7cc168945e2b9c81a619f2f86322eac50cf7820f

module.exports = app