// Core Modules

// file system
const fs = require("node:fs");

//making directory
fs.mkdirSync("data");

//writing string to file from js ( synchronus )
fs.writeFileSync(
  "data/test.txt",
  "Hi file ini ditulis secara sinkronus menggunakan javascript"
);
