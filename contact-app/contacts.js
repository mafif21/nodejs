const fs = require("node:fs");
const readline = require("node:readline");

rl = readline.Interface({
  input: process.stdin,
  output: process.stdout,
});

if (!fs.existsSync("data")) {
  fs.mkdirSync("data");
}

if (!fs.existsSync("data/contact.json")) {
  fs.writeFileSync("data/contact.json", "[]", "utf-8");
}

const userQuestion = (question) => {
  return new Promise((resolve, reject) => {
    rl.question(question, (value) => {
      resolve(value);
      reject(new Error("Unknown Value"));
    });
  });
};

const save = (name, phone) => {
  const obj = { name, phone };
  const readFile = fs.readFileSync("data/contact.json", "utf-8");
  const buffer = JSON.parse(readFile);

  buffer.push(obj);
  fs.writeFileSync("data/contact.json", JSON.stringify(buffer));

  rl.close();
};

module.exports = { userQuestion, save };
