const argv = require("yargs").argv;

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      console.table(await listContacts());
      break;

    case "get":
      console.table(await getContactById(id));

      break;

    case "add":
      await addContact(name, email, phone);
      console.table(await listContacts());
      break;

    case "remove":
      await removeContact(id);
      console.table(await listContacts());
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
