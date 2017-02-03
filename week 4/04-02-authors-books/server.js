const express = require('express');
const path = require('path');
const parser = require('body-parser');
const port = process.env.PORT || 9898;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const app = express();

app.use(express.static(path.resolve('client')));
app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());

app.set('view engine', 'ejs');
app.set('views', path.resolve('views'));

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/authors_books_db');

mongoose.connection.on('connected', function() {
  console.log('connected to mongoose');
});

/*
  Author:
    name: String
    age: Number
    isAlive: Boolean
    books: Book[]


  Book
    title: String
    publishDate: Date
    pageCount: Number
    subject: String
    author: Author
*/

const AuthorSchema = new Schema({
  name: String,
  age: Number,
  isAlive: {
    type: Boolean,
    default: false
  },
  books: [{
    type: Schema.Types.ObjectId,
    ref: 'Book'
  }]
});


const BookSchema = new Schema({
  title: String,
  publishDate: Date,
  pagecount: Number,
  subject: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'Author'
  }
});

const Author = mongoose.model('Author', AuthorSchema);
const Book = mongoose.model('Book', BookSchema);

app.get('/', function(request, response) {
  response.render('index');
})
.get('/authors/new', function(request, response) {
  response.render('authors/new')
})
.get('/authors', function(request, response) {
  Author.find({})
    .then(function(authors) {
      response.render('authors/index', { authors });
    })
    .catch(function(error) {
      response.json(error);
    })
})
.get('/authors/:id', function(request, response) {
  console.log(request.params);
  Author.findById(request.params.id)
    .populate('books')
    .exec()
    .then(function(author) {
      response.render('authors/show', { author });
    })
    .catch(function(error) {
      response.json(error);
    })
})
.post('/authors/create', function(request, response) {
  console.log(request.body);

  request.body.isAlive = !!request.body.isAlive;

  Author.create(request.body)
    .then(function(user) {
      response.redirect('/authors');
    })
    .catch(function(error) {
      response.json(error);
    })
})






.get('/books', function(request, response) {
  Book.find({})
    .populate('author')
    .exec()
    .then(function(books) {
      response.render('books/index', { books });
    })
    .catch(function(error) {
      response.json(error);
    })
})
.get('/books/new', function(request, response) {
  Author.find({})
    .then(function(authors) {
      response.render('books/new', { authors });
    })
    .catch(function(error) {
      handleError(response, error);
    })
})
.post('/books/create', function(request, response) {
  console.log(request.body);

  Book.create(request.body)
    .then(function(book) {
      return Author.findById(book.author)
        .then(function(author) {
          author.books.push(book);

          return author.save()
            .then(function(...args) {
              response.redirect('/books');
            });
        })
    })
    .catch(function(error) {
      response.json(error);
    });
})


function handleError(response, error) {
  // log the error
  response.status(500).json(error);
}

app.listen(port, function() {
  console.log(`server listening on port ${port}`);
});
