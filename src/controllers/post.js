const Post = require("../models/Post");

module.exports = {
  async index(req, res) {
    const posts = await Post.find().sort({ createdAt: "desc" });
    res.render("posts/posts", { posts: posts });
  },

  showNew(req, res) {
    res.render("posts/new", { post: new Post() });
  },

  async showEdit(req, res) {
    const post = await Post.findById(req.params.id);
    res.render("posts/edit", { post: post });
  },

  async showThis(req, res) {
    const post = await Post.findOne({ slug: req.params.slug });

    if (post == null) res.redirect("/posts");
    res.render("posts/show", { post: post });
  },

  async create(req, res, next) {
    req.post = new Post();
    next();
  },

  async edit(req, res, next) {
    req.post = await Post.findById(req.params.id);
    next();
  },

  async delete(req, res) {
    await Post.findByIdAndDelete(req.params.id);
    res.redirect("/posts");
  },
};
