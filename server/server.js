const express = require('express');
const app = express();
require('dotenv').config();

const dbConnect = require('./config/dbConnect');
const usersRoutes = require('./routes/usersRoutes');

// middleware
app.use(express.json());

// routes
app.use('/api/users', usersRoutes);

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Server running on port...${port}`);
});