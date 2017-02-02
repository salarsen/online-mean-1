const express = require('express');
const path = require('path');
const parser = require('body-parser');

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const port = process.env.PORT || 8000;

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/authors_books_db');

mongoose.connection.on('connected',function(){
   console.log("Connected to MongoDB");
});

app.use(express.static(path.resolve('client')));
app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());

app.set('view engine','ejs');
app.set('views',path.resolve('views'));

//catch if new is not used
// function Schema(){
//   if(!(this instanceof Author)){
//     return new Schema;
//   }
// }

const AuthorSchema = new Schema({
  name: String,
  age: Number,
  isAlive: Boolean,
  books: [{
     type: Schema.Types.ObjectId,
     ref: 'Book'
 }]
});

const BookSchema = new Schema({
  title: String,
  publishDate: Date,
  pageCount: Number,
  subject: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'Author'
  }
});

//module.exports =
const Author = mongoose.model('Author',AuthorSchema);
const Book = mongoose.model('Book',BookSchema);

app.get('/',function(request,response){
   response.render('index');
})
.get('/authors/new',function(request,response){
   response.render('authors/new');
})
.get('/authors',function(request,response){
   Author.find({})
      .then(function(authors){
         response.render('authors/index',{ authors });
      })
      .catch(function(error){
         response.json(error);
      })
})
.get('/books/new',function(request,response){
   Author.find({})
      .then(function(authors){
         response.render('books/new', { authors });
      })
      .catch(function(error){
         response.json(error);
      });
})
.post('/authors/create',function(request,response){
   console.log(request.body);
   Author.create(request.body)
      .then(function(user){
         console.log(user);
         response.redirect('/authors');
      })
      .catch(function(error){
         console.log(error);
         response.json(error);
      });
})
.post('/books/create',function(request,response){
   // console.log(request.body);
   Book.create(request.body)
      .then(function(user){
         Author.update({_id : user.author},{$addToSet: {books : user.id}})
            .then(function(auth_update){
               // console.log(auth_update);
               response.redirect('/');
            })
            .catch(function(error){
               console.log(error);
               response.json(error);
            });
      })
      .catch(function(error){
         console.log(error);
         response.json(error);
      });
})
/*
  Author:
    Name: String
    Age: Number
    isAlive: Boolean
    books: Book[]

1 to many - author => many books, book => 1 author

  Book:
    Title: String
    PublishedDate: date
    pageCount: Number
    subject: String
    author: Author
*/




app.listen(port,function(){
  console.log(`Server listening on port: ${port}`);
});
