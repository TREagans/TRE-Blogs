const mongoose = require('mongoose');

// gets rid of the strictQuery deprecation warning
mongoose.set("strictQuery", true);

mongoose.connect(process.env.MONGO_URI);

// creating our connection object
const connection = mongoose.connection;

// if database connection is successful
connection.on('connected', () => {
    console.log('[SUCCESS]: Database connection established');
});

// if database connection fails
connection.on('error', (err) => {
    console.log('[FAILED]: Could not connect to the database');
});

module.exports = connection;