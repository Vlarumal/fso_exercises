import { useState, useEffect } from "react";
import personService from "./services/persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";

const App = () => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [persons, setPersons] = useState([]);
  const [notification, setNotification] = useState(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const addPerson = (e) => {
    e.preventDefault();
    const person = {
      name: newName,
      number: newNumber,
    };

    const nameToCheck = newName;
    if (checkForDuplicates(nameToCheck)) {
      handleDuplicate(person);
      return;
    }

    createPerson(person);
  };

  const checkForDuplicates = (name) => {
    return persons.some((person) => person.name === name);
  };

  const handleDuplicate = (person) => {
    const userAnswer = window.confirm(
      `${person.name} is already added to phonebook, replace the old number with a new one?`
    );

    if (userAnswer) {
      const personId = persons.find((p) => p.name === person.name).id;
      updateNumber(personId, person);
      notifySuccess(person.name, true);
    }
    return;
  };

  const createPerson = (person) => {
    personService
      .create(person)
      .then((createdPerson) => {
        setPersons(persons.concat(createdPerson));
        notifySuccess(createdPerson.name);
        setNewName("");
        setNewNumber("");
      })
      .catch((error) => {
        notifyError(error.response.data.error);
        console.log(error.response.data.error);
      });
  };

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}`))
      personService
        .deletePerson(person.id)
        .catch((error) => notifyError(error))
        .finally(() => getAllAgain());
  };

  const updateNumber = (id, newPerson) => {
    personService
      .update(id, newPerson)
      .catch((error) => notifyError(error.response.data.error))
      .finally(() => getAllAgain());
  };

  const getAllAgain = () => {
    personService.getAll().then((returnedPersons) => {
      setPersons(returnedPersons);
    });
  };

  const notify = (message, isError = false) => {
    setNotification(message);
    setIsError(isError);
    setTimeout(() => {
      setNotification(null);
      setIsError(false);
    }, 5000);
  };

  const notifySuccess = (name, numberChanged) => {
    if (!numberChanged && !isError) {
      notify(`Added ${name}`);
    } else if (!isError) {
      notify(`Changed ${name}'s number`);
    }
  };

  const notifyError = (error) => {
    notify(
      // `Information of ${name} has already been removed from server`,
      `${error}`,
      true
    );
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
      <Notification
        message={notification}
        isError={isError}
      />
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
      <Persons
        personsToDisplay={personsToDisplay}
        onClick={deletePerson}
      />
    </div>
  );
};

export default App;
