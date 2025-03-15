const Filter = ({ onChange }) => {
  return (
    <form>
      filter shown with
      <input
        type='text'
        onChange={onChange}
      />
    </form>
  );
};

export default Filter;
