const Persons = ({ personsToDisplay }) => {
  return personsToDisplay.map((person) => (
    <p key={person.id}>
      {person.name} {person.number}
    </p>
  ));
};

export default Persons;
