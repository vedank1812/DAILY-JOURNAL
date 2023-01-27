//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "This is your own personal journal! Here you can record  your daily life events and stuff!";
const aboutContent = "This site was devel";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
let posts=[];
app.get("/", function(req,res){
  res.render("home",{startingContent: homeStartingContent, posts:posts
  });
  
});
app.get("/about", function(req,res){
res.render("about",{aboutContent:aboutContent});
});
app.get("/contact",function(req,res){
  res.render("contact",{contactContent:contactContent});
});
app.get("/compose",function(req,res){
  res.render("compose");
});

app.post("/compose",function(req,res){
  const post={
    title:req.body.postTitle,
    content:req.body.postBody
  };

  posts.push(post);
  res.redirect("/");

});

app.get("/posts/:postName",function(req,res){
  const requestedTitle= _.lowerCase(req.params.postName);

posts.forEach(function(post){
  const storedTitle=_.lowerCase(post.title);

  if(storedTitle==requestedTitle){
    res.render("post",{
      title: post.title,
      content:post.content
    });
  }
});
});
app.listen(3000, function() {
  console.log("Server started on port 3000");
});
