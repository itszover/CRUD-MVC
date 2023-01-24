const express = require("express");
const router = express.Router();
const postController = require("../controllers/post");

router.get("/", postController.index);
router.get("/new", postController.showNew);
router.get("/edit/:id", postController.showEdit);
router.get("/:slug", postController.show);

router.post("/", postController.store, savePostAndRedirect("new"));
router.put("/:id", postController.update, savePostAndRedirect("edit"));
router.delete("/:id", postController.delete);

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
