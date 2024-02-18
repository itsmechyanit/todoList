const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config({ path: "./config.env" });

const app = require("./app");

const PORT = process.env.PORT || 3000;

const conString = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(conString, {
    // useCreateIndex: true,
    // useFindAndModify: false,
  })
  .then(() => console.log("DB Connection Successful"));

app.listen(PORT);
