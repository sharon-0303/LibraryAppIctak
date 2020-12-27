const mongoose = require('mongoose');
//DB Connection
 mongoose.connect('mongodb://localhost:27017/library');

//userdata Schema
const Schema = mongoose.Schema;

const UserSchema =  new Schema({

 

    name: String,
    email: String,
    dob: Date,
    password:String
});

//userdata Model
var Userdata = mongoose.model('userdata',UserSchema);

module.exports = Userdata;

