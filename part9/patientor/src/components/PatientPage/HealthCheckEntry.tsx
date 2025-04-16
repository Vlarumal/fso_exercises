import { HealthCheckEntry } from '../../types';
import { getIcon } from '../../utils';

const HealthCheckEntryComponent: React.FC<{
  entry: HealthCheckEntry;
}> = ({ entry }) => {
  return (
    <section key={entry.id}>
      <div>
        {entry.date} {getIcon(entry.type)}
      </div>
      <div>
        <em>{entry.description}</em>
      </div>
      <div>{getIcon(entry.healthCheckRating)}</div>
    </section>
  );
};

export default HealthCheckEntryComponent;
