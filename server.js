require('dotenv').config()
const express = require('express');
let cors = require('cors')

const Users = require('./routes/api/Users')

const app = express();

const connectDB = require('./db/conn');

app.use(cors())
app.use(express.json())

connectDB();


app.use('/api', Users);

app.listen(3000, () => {
  console.log(`Server running on port 3000 connecting to MongoDB`);
});


console.log('hello world')