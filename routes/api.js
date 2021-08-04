/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

'use strict';
const BookModel = require('../models').Book;

module.exports = function(app) {

    app.route('/api/books')
        .get(function(req, res) {
            //response will be array of book objects
            //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
            BookModel.find({}, (err, data) => {
                res.json(data.map(d => ({
                    title: d.title,
                    _id: d._id,
                    commentcount: d.commentcount
                })));
            });
        })

        .post(function(req, res) {
            let title = req.body.title;
            //response will contain new book object including atleast _id and title
            if (!title) {
                res.send('missing required field title');
                return;
            }
            const newBook = new BookModel({
                title: title,
                commentcount: 0,
                comments: []
            });
            newBook.save((err, data) => {
                if (err) console.log(err);
                res.json(data);
            });

        })

        .delete(function(req, res) {
            //if successful response will be 'complete delete successful'
        });



    app.route('/api/books/:id')
        .get(function(req, res) {
            let bookid = req.params.id;
            //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
            BookModel.findById(bookid, (err, data) => {
                if(err) console.log(err);
                res.json(data);
            });
        })

        .post(function(req, res) {
            let bookid = req.params.id;
            let comment = req.body.comment;
            //json res format same as .get
        })

        .delete(function(req, res) {
            let bookid = req.params.id;
            //if successful response will be 'delete successful'
        });

};
