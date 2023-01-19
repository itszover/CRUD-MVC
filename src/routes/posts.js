const express = require("express");
const router = express.Router();

const Post = require("../models/Post");

router.get("/", async (req, res) => {
  const posts = await Post.find().sort({ createdAt: "desc" });
  res.render("posts/posts", { posts: posts });
});

router.get("/new", (req, res) => {
  res.render("posts/new", { post: new Post() });
});

router.get("/:slug", async (req, res) => {
  const post = await Post.findOne({ slug: req.params.slug });

  if (post == null) res.redirect("/posts");
  res.render("posts/show", { post: post });
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
    res.redirect(`/posts/${post.slug}`);
  } catch (err) {
    console.error(err);
    res.render("posts/new", { post: post });
  }
});

router.delete("/:id", async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.redirect("/");
});

module.exports = router;
