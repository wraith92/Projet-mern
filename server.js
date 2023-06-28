require('dotenv').config()
const express = require('express');
let cors = require('cors')

const Users = require('./routes/api/Users')
const Products = require('./routes/api/Products')

const app = express();

const connectDB = require('./db/conn');

app.use(cors())
app.use(express.json())

connectDB();


app.use('/api', Users);
app.use('/api', Products);

app.listen(3000, () => {
  console.log(`Server running on port 3000 connecting to MongoDB`);
});