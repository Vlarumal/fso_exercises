import { useParams } from 'react-router-dom';
import { DiagnosisEntry, PatientEntry } from '../../types';
import { getIcon } from '../../utils';
import patientService from '../../services/patients';
import diagnosisService from '../../services/diagnoses';
import { useEffect, useState } from 'react';
import { Card } from '@mui/material';
import EntryDetails from './EntryDetails';

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<PatientEntry | null>(null);
  const [diagnoses, setDiagnoses] = useState<DiagnosisEntry[] | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (!id) {
      return;
    }

    setLoading(true);

    patientService
      .getById(id)
      .then((response) => {
        setPatient(response);
        setLoading(false);
      })
      .catch(() => {
        setErrorMessage('Failed to get patient data');
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    diagnosisService
      .getAllDiagnoses()
      .then((response) => {
        setDiagnoses(response);
      })
      .catch(() => {
        setErrorMessage('Failed to load diagnoses');
      });
  }, []);

  const getDiagnosisByCode = (code: string) => {
    if (!diagnoses) return 'No diagnoses';

    const diagnosis = diagnoses.find((d) => d.code === code);

    return diagnosis ? diagnosis.name : 'Unknown diagnosis';
  };

  if (loading) return <div>Loading patient data...</div>;
  if (errorMessage) return <div>{errorMessage}</div>;
  if (!patient) return <div>No patient found</div>;

  return (
    <div>
      <h2>
        {patient.name} {getIcon(patient.gender)}
      </h2>
      <div>ssn: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>

      {patient.entries && patient.entries.length > 0 && (
        <section>
          <h2>entries</h2>
          {patient.entries.map((entry) => (
            <article key={entry.id}>
              <Card
                variant='outlined'
                sx={{
                  marginBottom: 1,
                  borderColor: 'black',
                  paddingLeft: 1,
                }}
              >
                <EntryDetails entry={entry} />
                diagnose by {entry.specialist}
              </Card>

              {entry.diagnosisCodes && (
                <section>
                  <fieldset>
                    <legend>Diagnoses</legend>
                    <ul>
                      {entry.diagnosisCodes.map((code: string) => (
                        <li key={code}>
                          {code} {getDiagnosisByCode(code)}
                        </li>
                      ))}
                    </ul>
                  </fieldset>
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
