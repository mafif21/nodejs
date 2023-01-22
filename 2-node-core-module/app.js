// Core Modules

// file system
const fs = require("node:fs");

//writing string to file from js ( synchronus )
fs.writeFileSync(
  "test.txt",
  "Hi file ini ditulis secara sinkronus menggunakan javascript"
);
