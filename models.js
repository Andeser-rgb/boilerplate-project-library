const mongoose = require('mongoose');
const { Schema } = mongoose;

const BookSchema = new Schema({
    title: String,
    comments: [String],
    commentcount: Number
});

const Book = new mongoose.model('Book', BookSchema);


exports.Book = Book;
