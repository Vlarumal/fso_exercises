import { useParams } from 'react-router-dom';
import { PatientEntry } from '../../types';
import { Female, Male } from '@mui/icons-material';
import patientService from '../../services/patients';
import { useEffect, useState } from 'react';

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<PatientEntry | null>(null);

  useEffect(() => {
    if (!id) {
      return;
    }

    patientService.getById(id).then((response) => {
      setPatient(response);
    });
  }, [id]);

  const getGenderIcon = (gender: PatientEntry['gender']) => {
    switch (gender) {
      case 'male':
        return <Male />;
      case 'female':
        return <Female />;
      case 'other':
        break;
      default:
        break;
    }
  };

  if (!patient) {
    return <div>Something went wrong</div>;
  }

  return (
    <div>
      <h2>
        {patient.name} {getGenderIcon(patient.gender)}
      </h2>
      <div>ssn: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>

      {patient.entries && patient.entries.length > 0 && (
        <section>
          <h2>entries</h2>
          {patient.entries.map((entry) => (
            <article key={entry.id}>
              <div>
                {entry.date} <em>{entry.description}</em>
              </div>

              {entry.diagnosisCodes && (
                <section>
                  <ul>
                    {entry.diagnosisCodes.map((code: string) => (
                      <li key={code}>{code}</li>
                    ))}
                  </ul>
                </section>
              )}
            </article>
          ))}
        </section>
      )}
    </div>
  );
};

export default PatientPage;
