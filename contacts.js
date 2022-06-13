const fs = require("fs").promises;
const path = require("path");
const { number } = require("yargs");

const contactsPath = path.resolve("./db/contacts.json");

async function listContacts() {
  try {
    const contacts = await fs.readFile(contactsPath, "utf-8");
    const contactsParse = JSON.parse(contacts);
    return contactsParse;
  } catch (err) {
    console.error(err.message);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    return contacts.filter((contact) => +contact.id === contactId);
  } catch (err) {
    console.error(err.message);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const filteredContacts = JSON.stringify(
      contacts.filter((contact) => +contact.id !== contactId)
    );
    return await fs.writeFile(contactsPath, filteredContacts, "utf-8");
  } catch (err) {
    console.error(err.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const newContact = { name, email, phone };
    const newContactsList = JSON.stringify([...contacts, newContact]);
    return await fs.writeFile(contactsPath, newContactsList, "utf-8");
  } catch (err) {
    console.error(err.message);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
