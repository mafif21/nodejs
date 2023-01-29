const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const {
  loadData,
  findData,
  addContact,
  checkDuplicate,
} = require("./utils/contact");
const bodyParser = require("body-parser");
const { body, validationResult, check } = require("express-validator");

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

app.get("/contact/add", (req, res) => {
  res.render("add", { layout: "layouts/main", title: "Add" });
});

app.post(
  "/contact",
  [
    body("name").custom((nameUser) => {
      const duplicate = checkDuplicate(nameUser);
      if (duplicate) {
        throw new Error("Name already exists");
      }
      return true;
    }),
    check("email", "Domain not valid").isEmail(),
    check("phone", "Phone not valid").isMobilePhone("id-ID"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // return res.status(400).json({ errors: errors.array() });
      res.render("add", {
        layout: "layouts/main",
        title: "Add",
        errors: errors.array(),
      });
    }
    // addContact(req.body);
    // res.redirect("/contact");
  }
);

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
