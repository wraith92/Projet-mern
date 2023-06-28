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
    }
    // role: {
    //     type: Int16Array,
    // }
})


module.exports = Users = mongoose.model('Users', UserSchema)