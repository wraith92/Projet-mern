const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstname: {
        type: String,
    },
    lastname: {
        type: String,
    },
    phone: {
        type: String, 
    },
    mail: {
        type: String,
    },
    password: {
        type: String,
    },
})


module.exports = Users = mongoose.model('Users', UserSchema, "Users")