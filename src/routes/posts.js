const express = require("express");
const router = express.Router();
const postController = require("../controllers/post");

router.get("/", postController.index);
router.get("/new", postController.showNew);
router.get("/edit/:id", postController.showEdit);
router.get("/:slug", postController.show);

router.post("/", postController.store);
router.put("/:id", postController.update);
router.delete("/:id", postController.delete);

module.exports = router;
