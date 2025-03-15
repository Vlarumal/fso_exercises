const PersonForm = ({
  newName,
  newNumber,
  handleNameChange,
  handleNumberChange,
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit}>
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
  );
};

export default PersonForm;
