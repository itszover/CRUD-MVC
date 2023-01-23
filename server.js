const mongoose = require("mongoose");
const app = require("./src/app");

const DATABASE_URI = process.env.DATABASE_URI;
const PORT = process.env.PORT || 8000;

mongoose.set("strictQuery", false);
mongoose.connect(DATABASE_URI);

app.listen(PORT);
