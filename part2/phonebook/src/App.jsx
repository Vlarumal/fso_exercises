import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const addPerson = (e) => {
    e.preventDefault();
    const person = {
      id: persons.length + 1,
      name: newName,
      number: newNumber,
    };

    const nameToCheck = newName;
    if (checkForDuplicates(nameToCheck)) {
      alert(`${nameToCheck} is already added to the phonebook`);
      return;
    }

    setPersons(persons.concat(person));
    setNewName("");
    setNewNumber("");
  };

  const checkForDuplicates = (name) => {
    return persons.some((person) => person.name === name);
  };

  const handleSearchChange = (e) => {
    const personToSearchFor = e.target.value.toLowerCase();
    setSearchValue(personToSearchFor);
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const personsToDisplay = persons.filter((person) =>
    person.name.toLowerCase().includes(searchValue)
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChange={handleSearchChange} />
      <h3>add a new</h3>
      <PersonForm
        onSubmit={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons personsToDisplay={personsToDisplay} />
    </div>
  );
};

export default App;
