const bodyParser = require("body-parser");
const express = require("express");
const expressEjsLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");

const app = express();
const port = 3000;

// ejs settings
app.set("view engine", "ejs");
app.use(expressEjsLayouts);
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("home", { title: "Homepage", layout: "layouts/main" });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About", layout: "layouts/main" });
});

app.get("/contact", (req, res) => {
  res.render("contact", { title: "Contact", layout: "layouts/main" });
});

app.listen(port, () => console.log("connected"));
