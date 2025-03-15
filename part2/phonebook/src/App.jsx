import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const addPerson = (e) => {
    e.preventDefault();
    const person = {
      name: newName,
    };

    const nameToCheck = newName;
    if (checkForDuplicates(nameToCheck)) {
      alert(`${nameToCheck} is already added to the phonebook`);
      return;
    }
    setPersons(persons.concat(person));
    setNewName("");
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const checkForDuplicates = (name) => {
    return persons.some((person) => person.name === name);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name:{" "}
          <input
            value={newName}
            onChange={handleNameChange}
            autoFocus
          />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <>
        {persons.map((person) => (
          <p key={person.name}>{person.name}</p>
        ))}
      </>
    </div>
  );
};

export default App;
