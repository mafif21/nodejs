const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const { loadData, findData } = require("./utils/contact");

const app = express();
const port = 3000;

// setting template engine to ejs
app.set("view engine", "ejs");
app.use(expressLayouts);

// middleware
// built in middleware
app.use(express.static("public"));

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
