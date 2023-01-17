const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("posts", { title: "Posts" });
});

router.get("/edit", (req, res) => {
  res.render("edit", { title: "Edit" });
});

module.exports = router;
