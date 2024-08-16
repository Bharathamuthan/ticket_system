const express = require('express');
const auth = require('../middleware/auth');
const app = express();

const authRoutes = require('./authRoutes');
const roleRoutes = require('./roleRoutes');
const projectRoutes = require('./projectRoutes');
const submoduleRoutes = require('./submoduleRoutes');
const assignticketRoutes = require('./assignticketRoutes');
const ticketcreateRoutes = require('./ticketcreateRoutes');

app.use(express.json());

app.use('/user', authRoutes);
app.use('/role', roleRoutes);
app.use('/project', projectRoutes);
app.use('/submodule', submoduleRoutes);
app.use('/assignticket', assignticketRoutes);  
app.use('/ticket', ticketcreateRoutes);

module.exports = app;
