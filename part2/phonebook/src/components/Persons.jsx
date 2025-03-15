const Persons = ({ personsToDisplay, onClick }) => {
  return personsToDisplay.map((person) => (
    <p key={person.id}>
      {person.name} {person.number}
      <button onClick={() => onClick(person)}>delete</button>
    </p>
  ));
};

export default Persons;
