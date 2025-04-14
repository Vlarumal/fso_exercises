import patients from '../../data/patients';
import { v1 as uuid } from 'uuid';

import {
  NewPatientEntry,
  NonSensitivePatientEntry,
  PatientEntry,
} from '../types';

const getEntries = (): PatientEntry[] => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(
    ({ id, name, dateOfBirth, gender, occupation }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
    })
  );
};

const findById = (id: string): PatientEntry | undefined => {
  const entry = patients.find((patient) => patient.id === id);
  return entry;
};

const addPatient = (entry: NewPatientEntry): PatientEntry => {
  const id: string = uuid();
  const newPatientEntry = {
    id,
    ...entry,
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addPatient,
  findById,
};
