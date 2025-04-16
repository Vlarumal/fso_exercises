import React from 'react';
import { HospitalEntry } from '../../types';
import { getIcon } from '../../utils';

const HospitalEntryComponent: React.FC<{ entry: HospitalEntry }> = ({
  entry,
}) => {
  return (
    <section key={entry.id}>
      <div>
        {entry.date} {getIcon(entry.type)}
      </div>
      <div>
        <em>{entry.description}</em>
      </div>
    </section>
  );
};

export default HospitalEntryComponent;
