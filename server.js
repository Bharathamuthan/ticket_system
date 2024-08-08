const express = require('express');
const connectDB = require('./config/db'); // Ensure this path is correct
const authRoutes = require('./routes/authRoutes');
const app = express();
require('dotenv').config(); // Load environment variables from .env file


// Connect Database
connectDB();

// Middleware
app.use(express.json());

// Define Routes
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
