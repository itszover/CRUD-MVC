const Post = require("../models/Post");
const postRepository = require("../repositories/post");

module.exports = {
  async index(req, res) {
    const result = await postRepository.findAll();
    res.render("posts/posts", { posts: result });
  },

  showNew(req, res) {
    res.render("posts/new", { post: new Post() });
  },

  async showEdit(req, res) {
    const result = await postRepository.findById(req.params.id);
    res.render("posts/edit", { post: result });
  },

  async show(req, res) {
    const result = await postRepository.findBySlug(req.params.slug);
    if (result == null) res.redirect("/posts");
    res.render("posts/show", { post: result });
  },

  async store(req, res) {
    try {
      req.post = new Post();
      const result = await postRepository.save(req.post, req.body);

      res.redirect(`/posts/${result.slug}`);
    } catch (err) {
      console.error(err);
      res.render("posts/new", { post: req.post });
    }
  },

  async update(req, res) {
    try {
      req.post = await postRepository.findById(req.params.id);
      const result = await postRepository.save(req.post, req.body);

      res.redirect(`/posts/${result.slug}`);
    } catch (err) {
      console.error(err);
      res.render("posts/edit", { post: req.post });
    }
  },

  async delete(req, res) {
    await postRepository.delete(req.params.id);
    res.redirect("/posts");
  },
};
