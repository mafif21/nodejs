require("./utils/db");
const bodyParser = require("body-parser");
const express = require("express");
const expressEjsLayouts = require("express-ejs-layouts");
const user = require("./model/User");

// flash message
const session = require("express-session");
const flash = require("connect-flash");
const cookie = require("cookie-parser");

const app = express();
const port = 3000;

// ejs settings
app.set("view engine", "ejs");
app.use(expressEjsLayouts);
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// configure flash message
app.use(
  session({
    cookie: { maxAge: 6000 },
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());

app.get("/", (req, res) => {
  res.render("home", { title: "Homepage", layout: "layouts/main" });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About", layout: "layouts/main" });
});

app.get("/contact", async (req, res) => {
  try {
    const contacts = await user.find();
    res.render("contact", {
      title: "Contact",
      layout: "layouts/main",
      contacts,
      msg: req.flash("msg"),
    });
  } catch (err) {
    console.log(err);
  }
});

app.get("/contact/:name", async (req, res) => {
  const contact = await user.findOne({ name: req.params.name });
  try {
    res.render("detail", {
      title: "Detail",
      layout: "layouts/main",
      contact,
    });
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => console.log("connected"));
