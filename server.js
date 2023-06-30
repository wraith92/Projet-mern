

const express = require('express');
let cors = require('cors')
require('dotenv').config()
const Products = require('./routes/api/Products')
const Auth = require('./routes/api/Connexion')
const Users = require('./routes/api/Users')
const app = express();

const connectDB = require('./db/conn');

app.use(cors())
app.use(express.json())
//connexion
connectDB();
const isConnectedToDB =  connectDB();

//Routes 
app.use('/api', Auth);
app.use('/api', Products);
app.use('/api', Users);


app.listen(3000, () => {
  console.log(`Server running on port 3000`);

  // Check if connected to MongoDB
  if (isConnectedToDB) {
    console.log('Connected to the database');
  } else {
    console.log('Failed to connect to the database');
  }
});