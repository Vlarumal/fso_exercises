import Header from "./Header";
import Content from "./Content";

const CoursePart = ({ coursePart }) => {
  return (
    <div>
      <Header name={coursePart.name} />
      <Content parts={coursePart.parts} />
    </div>
  );
};

export default CoursePart;
