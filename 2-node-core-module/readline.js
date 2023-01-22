const readline = require("node:readline");
const rl = readline.Interface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("What is your name?", (name) => {
  console.log(`Thank you ${name} for fill the form`);
  rl.close();
});
