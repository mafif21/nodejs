// Core Modules

// file system
const fs = require("node:fs");

// using try catch because asynchronus
try {
  //making directory
  fs.mkdirSync("data");

  //writing string to file from js ( synchronus )
  fs.writeFileSync(
    "data/test.txt",
    "Hi file ini ditulis secara sinkronus menggunakan javascript"
  );
} catch (error) {
  console.log(error);
}
