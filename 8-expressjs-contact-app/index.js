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
app.use(expressLayouts);

// middleware
// built in middleware
app.use(express.static("public"));

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

app.use((req, res) => {
  res.status(404);
  res.send("<h1>404</h1>");
});

app.listen(port, () => {
  console.log("Connect!!!");
});
