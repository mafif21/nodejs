const contacts = require("./contacts");

const main = async () => {
  try {
    const name = await contacts.userQuestion("Whats is your name? ");
    const phone = await contacts.userQuestion("Whats your phone number? ");

    contacts.save(name, phone);
  } catch (error) {
    console.log(error);
  }
};

main();
