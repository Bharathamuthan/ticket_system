const express = require('express');
<<<<<<< HEAD
const connectDB = require('./config/db'); // Ensure this path is correct
const indexRoutes = require('./routes/index');
=======
const connectDB = require('./config');
require('dotenv').config(); 

const authRoutes = require('./routes/authRoutes');
const roleRoutes = require('./routes/roleRoutes');
const projectRoutes = require('./routes/projectRoutes');
const submoduleRoutes = require('./routes/submoduleRoutes');
const assignticketRoutes = require('./routes/assignticketRoutes');
const ticketcreateRoutes = require('./routes/ticketcreateRoutes');

>>>>>>> 7cc168945e2b9c81a619f2f86322eac50cf7820f
const app = express();

// Connect to database
connectDB();

// Middleware to parse JSON
app.use(express.json());

<<<<<<< HEAD
// Define Routes
app.use('/routes/index', indexRoutes);
=======
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/auth', roleRoutes);
app.use('/api/auth', projectRoutes);
app.use('/api/auth', submoduleRoutes);
app.use('/api/auth', assignticketRoutes);
app.use('/api/auth', ticketcreateRoutes);
>>>>>>> 7cc168945e2b9c81a619f2f86322eac50cf7820f

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
