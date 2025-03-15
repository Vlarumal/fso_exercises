import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [persons, setPersons] = useState([]);

  const url = "http://localhost:3001/persons";

  useEffect(() => {
    axios.get(url).then((response) => {
      setPersons(response.data);
    });
  }, []);

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

    axios.post(url, person).then((response) => {
      setPersons(persons.concat(response.data));
    });

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
