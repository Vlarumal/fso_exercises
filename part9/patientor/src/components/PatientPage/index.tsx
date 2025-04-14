import { useParams } from 'react-router-dom';
import { Patient } from '../../types';
import { Female, Male } from '@mui/icons-material';
import patientService from '../../services/patients';
import { useEffect, useState } from 'react';

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    if (!id) {
      return;
    }

    patientService.getById(id).then((response) => {
      setPatient(response);
    });
  }, [id]);

  const getGenderIcon = (gender: Patient['gender']) => {
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
    </div>
  );
};

export default PatientPage;
