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

router.get("/edit/:id", async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.render("posts/edit", { post: post });
});

router.get("/:slug", async (req, res) => {
  const post = await Post.findOne({ slug: req.params.slug });

  if (post == null) res.redirect("/posts");
  res.render("posts/show", { post: post });
});

router.post(
  "/",
  async (req, res, next) => {
    req.post = new Post();
    next();
  },
  savePostAndRedirect("new")
);

router.put(
  "/:id",
  async (req, res, next) => {
    req.post = await Post.findById(req.params.id);
    next();
  },
  savePostAndRedirect("edit")
);

router.delete("/:id", async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.redirect("/posts");
});

function savePostAndRedirect(path) {
  return async (req, res) => {
    const { title, description, text } = req.body;

    let post = req.post;
    post.title = title;
    post.description = description;
    post.text = text;

    try {
      post = await post.save();
      res.redirect(`/posts/${post.slug}`);
    } catch (err) {
      console.error(err);
      res.render(`posts/${path}`, { post: post });
    }
  };
}

module.exports = router;
