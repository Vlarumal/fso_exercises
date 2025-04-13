import { PartProps } from '../types';

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({ part }: PartProps) => {
  switch (part.kind) {
    case 'basic':
      return (
        <div>
          <h2>
            {part.name} {part.exerciseCount}
          </h2>
          <em>{part.description}</em>
        </div>
      );
    case 'group':
      return (
        <div>
          <h2>
            {part.name} {part.exerciseCount}
          </h2>
          <p>project exercises: {part.groupProjectCount}</p>
        </div>
      );
    case 'background':
      return (
        <div>
          <h2>
            {part.name} {part.exerciseCount}
          </h2>
          <em>{part.description}</em>
          <p>submit to {part.backgroundMaterial}</p>
        </div>
      );
    case 'special':
      return (
        <div>
          <h2>
            {part.name} {part.exerciseCount}
          </h2>
          <em>{part.description}</em>
          <p>required skills: {part.requirements.join(', ')}</p>
        </div>
      );
    default:
      return assertNever(part);
  }
};

export default Part;
