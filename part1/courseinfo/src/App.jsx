const Header = ({ course }) => {
  return <h1>{course}</h1>;
};

const Part = (props) => {
  return (
    <p>
      {props.partName} {props.exercises}
    </p>
  );
};

const Content = (props) => {
  return (
    <>
      <Part
        partName={props.parts[0].name}
        exercises={props.parts[0].exercises}
      />
      <Part
        partName={props.parts[1].name}
        exercises={props.parts[1].exercises}
      />
      <Part
        partName={props.parts[2].name}
        exercises={props.parts[2].exercises}
      />
    </>
  );
};

const Total = ({ parts }) => {
  const total =
    parts[0].exercises + parts[1].exercises + parts[2].exercises;
  return <p>Number of exercises {total}</p>;
};

const App = () => {
  const course = "Half Stack application development";
  const parts = [
    {
      name: "Fundamentals of React",
      exercises: 10,
    },
    {
      name: "Using props to pass data",
      exercises: 7,
    },
    {
      name: "State of a component",
      exercises: 14,
    },
  ];

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  );
};

export default App;
