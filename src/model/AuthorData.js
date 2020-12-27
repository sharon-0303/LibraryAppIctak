const mongoose = require('mongoose');
//DB Connection
mongoose.connect('mongodb+srv://sharon:sharon@cluster0.dk4bw.mongodb.net/<library>?retryWrites=true&w=majority');
 //mongoose.connect('mongodb://localhost:27017/library');

// authorSchema
const Schema = mongoose.Schema;

const AuthorSchema =  new Schema({
     name: String,
     genre: String,
     books: String,
     image:String
});

// author Model
var Authordata = mongoose.model('authordata',AuthorSchema);

module.exports = Authordata;

