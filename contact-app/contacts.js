const fs = require("node:fs");
const chalk = require("chalk");
const validator = require("validator");

if (!fs.existsSync("data")) {
  fs.mkdirSync("data");
}

if (!fs.existsSync("data/contact.json")) {
  fs.writeFileSync("data/contact.json", "[]", "utf-8");
}

const loadedData = () => {
  const readFile = fs.readFileSync("data/contact.json", "utf-8");
  const buffer = JSON.parse(readFile);

  return buffer;
};

// create data
const save = (name, phone) => {
  // validatr phone number
  if (!validator.isMobilePhone(phone, "id-ID")) {
    console.log(chalk.red("Input indonesian number phone"));
    return false;
  }

  const obj = { name, phone };
  const contacts = loadedData();

  // check if duplicate
  const duplicate = contacts.find((value) => value.name === name);
  if (duplicate) {
    console.log(chalk.red("Contact already exist"));
    return false;
  }

  contacts.push(obj);
  fs.writeFileSync("data/contact.json", JSON.stringify(contacts));
};

// delete data
const deleteData = (unique) => {
  const datas = loadedData();

  const findData = datas.findIndex((value) => value.name === unique);
  if (findData !== 1) {
    console.log(chalk.red("Data Unknown"));
    return false;
  }

  datas.splice(findData, 1);
  console.log(datas);
  fs.writeFileSync("data/contact.json", JSON.stringify(datas));
  console.log(chalk.green("Delete Success"));
};

// show data
const showData = () => {
  const datas = loadedData();

  datas.forEach((data, index) => {
    console.log(`${++index} ${data.name} => ${data.phone}`);
  });
};

// detail
const detail = (find) => {
  const datas = loadedData();
  // var data = datas.filter(function (value) {
  //   return value.name;
  // });
  // console.log(data);

  const data = datas.find(
    (value) => value.name.toLowerCase() === find.toLowerCase()
  );
  if (!data) {
    console.log(chalk.red("Unknown Name"));
    return false;
  }

  console.log(`${data.name} - ${data.phone}`);
};

module.exports = { save, deleteData, showData, detail };
