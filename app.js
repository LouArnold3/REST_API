const express = require('express')
const ejs = require('ejs');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const route = require('color-convert/route');

const app = express()
app.use(bodyParser.urlencoded({extended: true }));


mongoose.connect('mongodb://localhost:27017/wikiDB');

const wikiSchema = new mongoose.Schema({
    title: String, 
    content: String
  });
const Article = mongoose.model('Article', wikiSchema);


app.listen(4000, function(){
    console.log("Im working");
});

app.get('/articles', function(req, res) {
    Article.find(function(err, arr) {
        //send back to client
        if (!err){
            res.send(arr)
        } else {
            res.send(err);
        }
        

    });
});

app.post('/articles', function(req, res) {
    const title = req.body.title;
    const content = req.body.content;

    const newArticle = new Article({
        title : title, 
        content : content
    });
    newArticle.save(function(err){
        if (err){
            res.send(err);
        } else{
            res.send("Articles Updated");
        }
    });
});

app.delete('/articles', function(req, res ) {
    Article.deleteMany(function(err) {
      if (!err){
          res.send(err)
      } else {
          res.send("You have deleted all articles")
      }
    });
});
