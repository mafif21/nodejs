const fs = require("node:fs");

// make folder if not exists
const dirPath = "./data";
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

// make file json if not exists at folder data
const filePath = "./data/contact.json";
if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, "[]", "utf-8");
}

const loadData = () => {
  const buffer = fs.readFileSync(filePath, "utf-8");
  const data = JSON.parse(buffer);
  return data;
};

module.exports = { loadData };
