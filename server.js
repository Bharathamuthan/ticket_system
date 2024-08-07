const express = require('express');
const connectDB = require('./config');
require('dotenv').config(); 

const authRoutes = require('./routes/authRoutes');
const roleRoutes = require('./routes/roleRoutes');

const app = express();

// Connect to database
connectDB();

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/auth', roleRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
