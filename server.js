const mongoose = require("mongoose");
const app = require("./src/app");
require("dotenv").config();

const DATABASE_URI = process.env.DATABASE_URI;
const PORT = process.env.PORT;

mongoose.set("strictQuery", false);
mongoose.connect(DATABASE_URI);

app.listen(PORT);
