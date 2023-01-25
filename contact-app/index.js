const yargs = require("yargs");
const { save } = require("./contacts");

// mengambil argumen dari command line
yargs.command({
  command: "add",
  describe: "Adding new data",
  builder: {
    name: {
      describe: "User Name",
      demandOption: true,
      type: "string",
    },
    phone: {
      describe: "Phone Number",
      demandOption: true,
      type: "int",
    },
  },
  handler(argv) {
    save(argv.name, argv.phone);
  },
});

yargs.parse();

// const contacts = require("./contacts");

// const main = async () => {
//   try {
//     const name = await contacts.userQuestion("Whats is your name? ");
//     const phone = await contacts.userQuestion("Whats your phone number? ");

//     contacts.save(name, phone);
//   } catch (error) {
//     console.log(error);
//   }
// };

// main();
