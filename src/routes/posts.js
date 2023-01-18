const express = require("express");
const router = express.Router();

const Post = require("../models/post");

router.get("/", (req, res) => {
  const posts = [
    {
      title: "Teste",
      createdAt: new Date(),
      description: "Teste desc",
    },
    {
      title: "Teste2",
      createdAt: new Date(),
      description: "Teste desc2",
    },
  ];

  res.render("posts/posts", { title: "Posts", posts: posts });
});

router.post("/", (req, res) => {
  const post = new Post({});
});

router.get("/edit", (req, res) => {
  res.render("posts/edit", { title: "Edit" });
});

router.get("/new", (req, res) => {
  res.render("posts/new", { title: "Nova postagem" });
});

module.exports = router;
