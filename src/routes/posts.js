const express = require("express");
const router = express.Router();

const Post = require("../models/Post");

router.get("/", async (req, res) => {
  const posts = await Post.find().sort({ createdAt: "desc" });
  res.render("posts/posts", { title: "Posts", posts: posts });
});

router.get("/:id", async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (post == null) res.redirect("/");
  res.render("posts/show", { post: post });
});

router.get("/new", (req, res) => {
  res.render("posts/new", { title: "Nova postagem", post: new Post() });
});

router.get("/edit", (req, res) => {
  res.render("posts/edit", { title: "Edit" });
});

router.post("/", async (req, res) => {
  const { title, description, text } = req.body;

  let post = new Post({
    title,
    description,
    text,
  });

  try {
    post = await post.save();
    res.redirect(`/posts/${post.id}`);
  } catch (err) {
    res.render("posts/new", { post: post });
    console.error(err);
  }
});

module.exports = router;
