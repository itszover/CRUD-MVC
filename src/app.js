const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const indexRouter = require("./routes/index");
const postRouter = require("./routes/posts");

const DATABASE = process.env.DATABASE;
const app = express();

mongoose.set("strictQuery", false);
mongoose.connect(DATABASE);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "/public")));

app.use("/", indexRouter);
app.use("/posts", postRouter);

module.exports = app;
