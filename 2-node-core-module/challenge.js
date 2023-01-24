const fs = require("node:fs");
const readline = require("node:readline");

const rl = readline.Interface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("What is your name?", (name) => {
  rl.question("How old are you?", (age) => {
    let contact = { name, age }; //initiate obj

    const fileStorage = fs.readFileSync("data/contacts.json", "utf-8"); //find file location
    const buffer = JSON.parse(fileStorage); //convert file to json

    buffer.push(contact); //pushing data obj to json
    fs.writeFileSync("data/contacts.json", JSON.stringify(buffer)); //wrtite json file

    console.log(`Success`);
    rl.close();
  });
});
