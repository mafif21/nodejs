const http = require("http");
const fs = require("fs");
const port = 3000;

const render = (file, res) => {
  fs.readFile(file, "utf-8", (error, data) => {
    if (error) {
      res.writeHead(404);
      res.write("File not found");
    } else {
      res.write(data);
    }
    res.end();
  });
};

http
  .createServer((req, res) => {
    res.writeHead("200", { "Content-Type": "text/html" });
    const url = req.url;

    switch (url) {
      case "/about":
        render("./about.html", res);
        break;

      case "/contact":
        res.write("<h1>Hello Contact</h1>");
        res.end();
        break;

      default:
        render("index.html", res);
        break;
    }
  })
  .listen(port, () => {
    console.log("Server is listening on port 3000");
  });
