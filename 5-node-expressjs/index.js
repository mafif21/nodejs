import express from "express";
import path from "path";

const app = express();
const __dirname = path.resolve(); //solving if dirname cant define
const port = 3000;

app.get("/", (req, res) => {
  res.sendFile("./home.html", { root: __dirname });
});

app.get("/about", (req, res) => {
  res.sendFile("./about.html", { root: __dirname });
});

app.get("/contact", (req, res) => {
  res.sendFile("./contact.html", { root: __dirname });
});

app.get("/product/:id", (req, res) => {
  res.send(
    `Product id : ${req.params.id} <br /> Category : ${req.query.category}`
  );
});

app.use("/", (req, res) => {
  res.status(404);
  res.send("<h1>404</h1>");
});

app.listen(port, () => {
  console.log("Connect!!!");
});
