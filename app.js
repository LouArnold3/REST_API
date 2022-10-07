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


app.route('/articles')
    .get(function (req, res){
        //Finds everything in a collection
        Article.find(function(err, foundArticles){ 
            //send back to client
            if (!err){
                res.send(foundArticles);
            } else {
                res.send(err);
            }
        });
    })
    .post(function(req, res) {
        console.log(req.body.title);
        console.log(req.body.content);
        
        //CREATE in DB
        const newArticle = new Article({
            //Define data that we want 
            title : req.body.title, 
            content : req.body.content
        });
        newArticle.save(function(err){
            if (err){
                res.send(err);
            } else{
                res.send("Articles Updated");
            }
        });
    
    })
    .delete(function(req, res) {
        Article.deleteMany(function(err) {
            if (!err){
                res.send(err)
            } else {
                res.send("You have deleted all articles")
            }
          })
    });

    app.route('/articles/:title')
        .get(function(req, res) {
            const inputTitle = req.params.title;

            Article.findOne({title : inputTitle}, function(err, foundArticle) {
                if (foundArticle) {
                    res.send(foundArticle);
                } else {
                    res.send('No article was found');
                }
            });
        })

        .put(function(req, res) {
            
            Article.update({title : req.params.title}, {title : req.body.title,content : req.body.content}, function(err) {
                if (!err) {
                    res.send('Article updated successfully')
                }
            } )
        });
        // .patch(function(req, res) {
        //     Article.update({

        //     })
        // });



