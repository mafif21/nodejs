const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const { loadData, findData, addContact } = require("./utils/contact");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

// setting template engine to ejs
app.set("view engine", "ejs");
app.use(expressLayouts);

// middleware
// built in middleware
app.use(express.static("public"));

// mddleware for post method
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("home", {
    name: "lele",
    title: "Home",
    layout: "layouts/main",
  });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About", layout: "layouts/main" });
});

app.get("/contact", (req, res) => {
  const contacts = loadData();
  res.render("contact", { layout: "layouts/main", contacts });
});

app.post("/contact", (req, res) => {
  addContact(req.body);
  // 21.01
  res.redirect("/contact");
});

app.get("/contact/add", (req, res) => {
  res.render("add", { layout: "layouts/main", title: "Add" });
});

app.get("/contact/:name", (req, res) => {
  const contact = findData(req.params.name);
  res.render("detail", { layout: "layouts/main", contact });
});

app.use((req, res) => {
  res.status(404);
  res.send("<h1>404</h1>");
});

app.listen(port, () => {
  console.log("Connect!!!");
});
