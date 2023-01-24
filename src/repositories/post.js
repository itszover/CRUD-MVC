const Post = require("../models/Post");

module.exports = {
  create() {},

  findAll() {
    return query(Post.find().sort({ createdAt: "desc" }));
  },

  findById(id) {
    return query(Post.findById(id));
  },

  findBySlug(slug) {
    return query(Post.findOne({ slug: slug }));
  },

  delete(id) {
    return query(Post.findByIdAndDelete(id));
  },
};

function query(command) {
  return new Promise((resolve, reject) => {
    try {
      resolve(command);
    } catch (err) {
      reject(console.error(err));
    }
  });
}
