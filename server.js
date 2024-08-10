const express = require('express');
const connectDB = require('./config');
require('dotenv').config(); 

const authRoutes = require('./routes/authRoutes');
const roleRoutes = require('./routes/roleRoutes');
const projectRoutes = require('./routes/projectRoutes');
const submoduleRoutes = require('./routes/submoduleRoutes');
const assignticketRoutes = require('./routes/assignticketRoutes');
const ticketcreateRoutes = require('./routes/ticketcreateRoutes');

const app = express();

// Connect to database
connectDB();

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/auth', roleRoutes);
app.use('/api/auth', projectRoutes);
app.use('/api/auth', submoduleRoutes);
app.use('/api/auth', assignticketRoutes);
app.use('/api/auth', ticketcreateRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
