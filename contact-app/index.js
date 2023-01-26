const yargs = require("yargs");
const { save, deleteData, showData, detail } = require("./contacts");

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

yargs.command({
  command: "delete",
  describe: "Remove existing data",
  builder: {
    name: {
      describe: "User Name",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    deleteData(argv.name);
  },
});

yargs.command({
  command: "show",
  describe: "Show all contact in your file",
  handler() {
    showData();
  },
});

yargs.command({
  command: "detail",
  describe: "Show detail in specific contact",
  builder: {
    name: {
      describe: "User Name",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    detail(argv.name);
  },
});

yargs.parse();
