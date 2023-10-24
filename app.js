const express = require("express");
const app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

// const ejs = require("ejs");

const lodash = require("lodash");

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/blogDB");
const blogSchema = mongoose.Schema({ title: String, content: String });
const blogModel = mongoose.model("Blogs", blogSchema);

let about, contact, home;
home =
  contact =
  about =
    "Alice was everywhere, until she wasn’t. Just like at first, she was nowhere until she was. The absence of her before I knew she existed, was nothing. Now, the absence of her shrouds everything. Like a guest who never came to dinner; a stormy sky that didn’t deliver. Nothing can wash away the void where she used to be. This is what I’m thinking about the first time I take The Walk without her. I met Alice";

app.get("/", async function (request_home, response_home) {
  const posts = await blogModel.find();
  response_home.render("home", {
    home_text: home,
    postArray: posts,
  });
});

app.get("/about", function (request_about, response_about) {
  response_about.render("about", { about_text: about });
});

app.get("/contact", function (request_contact, response_contact) {
  response_contact.render("contact", { contact_text: contact });
});

app.get("/publish", function (request_publish, response_publish) {
  response_publish.render("publish");
});

app.post("/publish", function (request_publish_post, response_publish_post) {
  const newPost = new blogModel({
    title: request_publish_post.body.newPostTitle,
    content: request_publish_post.body.newPostContent,
  });
  newPost.save();
  response_publish_post.redirect("/");
});

app.get("/posts/:post_id", async function (req, res) {
  const postId = lodash.lowerCase(req.params.post_id);
  const data = await blogModel.findById(postId).exec();
  console.log(data);
});

app.listen(3000, function () {
  console.log("server running");
});
