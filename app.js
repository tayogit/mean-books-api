var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var mongoose = require("mongoose")
var Book = require('./Book.model')

// set a variable for database
var db = 'mongodb://localhost/example'
mongoose.connect(db,{useNewUrlParser:true})

var port = 8080;
app.get('/',(req,res) =>{
    res.send("<h2 style='text-align:center;'>Welcome to the Mongoose Application with Express.js</h2>")
})
app.get('/books',(req,res) => {
    console.log("getting all books")
    Book.find({},{_id:1,author:1,category:1})
    .exec((err,books) =>{
        if(err) {
            res.send("Error getting list of books")
        } else 
        {   
            console.log(books)
            res.json(books)
        }
    
    })
})    

app.get('/books/:id',(req,res) => {
    console.log("getting one book")
    Book.findOne({
        _id:req.params.id
    })
    .exec((err,book) => {
        if(err) {
            res.send("Error retrieving book")
        }else {
            console.log(book)
            res.json(book)
        }
    })

})

app.listen(port,() =>{
    console.log("Application started at http/localhost:"+port)
})