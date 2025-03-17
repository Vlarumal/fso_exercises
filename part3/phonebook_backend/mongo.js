const mongoose = require("mongoose");

const password = process.argv[2];

const url = `mongodb+srv://fullstack:${password}@cluster0.zo6j1.mongodb.net/phoneBookApp?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);

mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

const getPersons = () => {
  Person.find({}).then((result) => {
    console.log("phonebook:");
    result.forEach((person) => {
      console.log(person.name, person.number);
    });
    mongoose.connection.close();
  });
};

const createPerson = (name, number) => {
  Person.create({
    name,
    number,
  }).then(() => {
    console.log(`added ${name} number ${number} to phonebook`);
    mongoose.connection.close();
  });
};

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
} else if (process.argv.length === 3) {
  getPersons();
} else if (process.argv.length === 5) {
  const name = process.argv[3].toString();
  const number = process.argv[4].toString();
  createPerson(name, number);
}
