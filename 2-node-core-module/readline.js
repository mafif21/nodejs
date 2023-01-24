const readline = require("node:readline");
const rl = readline.Interface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("What is your name?", (name) => {
  rl.question("How old are you?", (age) => {
    console.log(`I see your name is ${name} and then you are ${age} years old`);
    rl.close();
  });
});
