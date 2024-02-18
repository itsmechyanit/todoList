const express = require("express");

const path = require("path");

const app = express();

const router = require("./routes/todolistRouter");

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/", router);

module.exports = app;
