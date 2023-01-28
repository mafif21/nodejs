import express from "express";
import expressLayouts from "express-ejs-layouts";
import morgan from "morgan";

const app = express();
const port = 3000;

// data
const students = [
  {
    name: "Muhammad Afif",
    nim: 1202202052,
    active: true,
  },
  {
    name: "Ahmad Sutanji",
    nim: 388371733919,
    active: true,
  },
  {
    name: "Hasan Mustofa",
    nim: 12028383746,
    active: false,
  },
];

// setting template engine to ejs
app.set("view engine", "ejs");
// third party middleware
app.use(morgan("dev"));

// confugure using ejs layouts
app.use(expressLayouts); //this is middleware

// middleware
// built in middleware
app.use(express.static("public"));

// harus ada next kalau tidak maka akan hang
// app middleware
app.use((req, res, next) => {
  console.log("Time:", Date.now() * 7);
  next();
});

app.get("/", (req, res) => {
  res.render("home", {
    name: "lele",
    title: "Home",
    students,
    layout: "layouts/main",
  });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About", layout: "layouts/main" });
});

app.get("/contact", (req, res) => {
  res.render("contact", { layout: "layouts/main" });
});

app.get("/product/:id", (req, res) => {
  res.send(
    `Product id : ${req.params.id} <br /> Category : ${req.query.category}`
  );
});

app.use((req, res) => {
  res.status(404);
  res.send("<h1>404</h1>");
});

app.listen(port, () => {
  console.log("Connect!!!");
});
