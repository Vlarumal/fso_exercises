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
        partName={props.part1[0]}
        exercises={props.part1[1]}
      />
      <Part
        partName={props.part2[0]}
        exercises={props.part2[1]}
      />
      <Part
        partName={props.part3[0]}
        exercises={props.part3[1]}
      />
    </>
  );
};

const Total = ({ total }) => {
  return <p>Number of exercises {total}</p>;
};

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course={course} />
      <Content
        part1={[part1.name, part1.exercises]}
        part2={[part2.name, part2.exercises]}
        part3={[part3.name, part3.exercises]}
        // part2={part2}
        // exercises2={exercises2}
        // part3={part3}
        // exercises3={exercises3}
      />
      <Total total={part1.exercises + part2.exercises + part3.exercises} />
    </div>
  );
};

export default App;
