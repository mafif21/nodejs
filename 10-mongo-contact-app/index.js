require("./utils/db");
const bodyParser = require("body-parser");
const express = require("express");
const expressEjsLayouts = require("express-ejs-layouts");
const user = require("./model/User");
const methodOverride = require("method-override");

// flash message
const session = require("express-session");
const flash = require("connect-flash");
const cookie = require("cookie-parser");

// validator
const { body, validationResult, check } = require("express-validator");
const { createIndexes } = require("./model/User");

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

// configure override method
app.use(methodOverride("_method"));

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

app.post(
  "/contact",
  [
    body("name").custom(async (value) => {
      const duplicate = await user.findOne({ name: value });
      if (duplicate) {
        throw new Error("Name already exists");
      }
      return true;
    }),
    check("email", "Domain not valid").isEmail(),
    check("phone", "Must indonesian number").isMobilePhone("id-ID"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("add", {
        layout: "layouts/main",
        title: "Add",
        errors: errors.array(),
      });
    } else {
      //cara 1
      // const newUser = new user({
      //   name: req.body.name,
      //   phone: req.body.phone,
      //   email: req.body.email,
      // });
      // newUser.save((error, result) => {
      //   if (error) return console.log("add data failed");
      //   req.flash("msg", "Add data success");
      //   res.redirect("/contact");
      // });

      // cara 2
      user.insertMany(req.body, (error, result) => {
        if (error) return console.log("add data failed");
        req.flash("msg", "Add data success");
        res.redirect("/contact");
      });
    }
  }
);

app.get("/contact/add", (req, res) => {
  res.render("add", {
    title: "Add",
    layout: "layouts/main",
  });
});

app.get("/contact/edit/:name", async (req, res) => {
  const contact = await user.findOne({ name: req.params.name });
  if (!contact) {
    res.status(404);
    res.send("<h1>Data Unknown</h1>");
  }

  res.render("edit", {
    title: "Edit",
    layout: "layouts/main",
    contact,
  });
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

// delete option 1
// app.get("/contact/delete/:name", async (req, res) => {
//   const findData = await user.findOne({ name: req.params.name });
//   if (!findData) {
//     res.status(404);
//     res.send("<h1>Data not found</h1>");
//   } else {
//     await user.deleteOne({ name: req.params.name });
//     req.flash("msg", "Delete success");
//     res.redirect("/contact");
//   }
// });

// delete option 2
app.delete("/contact", async (req, res) => {
  await user.deleteOne({ name: req.body.name });
  req.flash("msg", "Delete success");
  res.redirect("/contact");
});

app.put(
  "/contact",
  [
    body("name").custom(async (value, { req }) => {
      if (value !== req.body.oldName) {
        const duplicateCheck = await user.findOne({ name: value });
        if (duplicateCheck) {
          throw new Error("Name already exists");
        }
      }
      return true;
    }),
    check("email", "Domain not valid").isEmail(),
    check("phone", "Phone must be indonesian number").isMobilePhone("id-ID"),
  ],
  async (req, res) => {
    const errrors = validationResult(req);
    if (!errrors.isEmpty()) {
      res.render("edit", {
        title: "Edit",
        layout: "layouts/main",
        contact: req.body,
        errors: errrors.array(),
      });
    } else {
      await user.updateOne(
        { id: req.id },
        {
          $set: {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
          },
        }
      );
      req.flash("msg", "Edit data success");
      res.redirect("/contact");
    }
  }
);

app.use((req, res) => {
  res.status(404);
  res.send("<h1>Not Found</h1>");
});

app.listen(port, () => console.log("connected"));
