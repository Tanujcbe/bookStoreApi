const mongoose = require("mongoose");

//  Creating Schema
const AuthorSchema = mongoose.Schema({
    id: Number,
    name : String,
    books : [String],
});

//  Create a book model
const AuthorModel = mongoose.model("authors",AuthorSchema);

module.exports = AuthorModel;
