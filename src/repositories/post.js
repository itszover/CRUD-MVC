const Post = require("../models/Post");

module.exports = {
  save(item, input) {
    const { title, description, text } = input;

    item.title = title;
    item.description = description;
    item.text = text;

    return query(item.save());
  },

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
