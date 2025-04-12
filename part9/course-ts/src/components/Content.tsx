interface ContentPart {
  name: string;
  exerciseCount: number;
}

interface ContentProps {
  parts: ContentPart[];
}

const Content = (props: ContentProps) => {
  return (
    <div>
      {props.parts.map((part) => (
        <p key={`${part.name}-${part.exerciseCount}`}>
          {part.name} {part.exerciseCount}
        </p>
      ))}
    </div>
  );
};

export default Content;
