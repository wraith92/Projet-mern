const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// MongoDB connection URL and options
const mongoURL = 'mongodb+srv://user:user1234@cluster0.j4lrg.mongodb.net/'; // Replace with your MongoDB connection string
const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Connect to MongoDB
mongoose.connect(mongoURL, mongoOptions)
  .then(() => {
    console.log('Connected to MongoDB');

    // Define your Mongoose schemas and models here

    // Define your routes
    //const booksRouter = require('./routes/books'); // Assuming your books routes are in 'routes/books.js'

    // Use the routes
   // app.use('/books', booksRouter);

    // Start the server*-----------
    app.listen(port, () => {
      console.log(`Server running on port ${port} connecting to MongoDB`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
