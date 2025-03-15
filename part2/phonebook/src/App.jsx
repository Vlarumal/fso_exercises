import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [filteredPersons, setFilteredPersons] = useState([]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

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

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const handleSearchChange = (e) => {
    const personToSearchFor = e.target.value.toLowerCase();
    const filteredPersons = persons.filter((person) =>
      person.name.toLocaleLowerCase().includes(personToSearchFor)
    );
    setFilteredPersons(filteredPersons);
  };

  const checkForDuplicates = (name) => {
    return persons.some((person) => person.name === name);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        filter shown with
        <input
          type='text'
          onChange={handleSearchChange}
        />
      </form>
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name:
          <input
            value={newName}
            onChange={handleNameChange}
            autoFocus
            required
          />
        </div>
        <div>
          number:
          <input
            type='tel'
            value={newNumber}
            onChange={handleNumberChange}
            required
          />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {filteredPersons.length > 0
        ? filteredPersons.map((person) => (
            <p key={person.id}>
              {person.name} {person.number}
            </p>
          ))
        : persons.map((person) => (
            <p key={person.id}>
              {person.name} {person.number}
            </p>
          ))}
    </div>
  );
};

export default App;
