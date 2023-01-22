// Core Modules

// file system
const fs = require("node:fs");

// using try catch because synchronus
try {
  //making directory
  // checking if folder data not exist
  if (!fs.existsSync("data")) {
    fs.mkdirSync("data");
  }

  //writing string to file from js ( synchronus )
  fs.writeFileSync(
    "data/test.txt",
    "Hi file ini ditulis secara sinkronus menggunakan javascript"
  );
} catch (error) {
  console.log(error);
}

// asynchronous
fs.writeFile("data/asyn.txt", "ini data asinkronus dari js", (error) => {
  console.log(error);
});

// reading data
const data1 = fs.readFileSync("data/test.txt", "utf-8");
console.log(data1);

fs.readFile("data/asyn.txt", { encoding: "utf-8" }, (error, data) => {
  if (error) {
    console.log(error);
    return;
  }

  console.log(data);
});
