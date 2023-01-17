const express = require("express");
const router = require("./router");

const app = express();

app.set("view engine", "pug");

app.use(router);

module.exports = app;
