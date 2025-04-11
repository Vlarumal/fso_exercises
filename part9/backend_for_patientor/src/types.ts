import { z } from 'zod';
import { NewEntrySchema } from './utils';

export interface DiagnosisEntry {
  code: string;
  name: string;
  latin?: string;
}

export interface PatientEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn?: string;
  gender: string;
  occupation: string;
}

export enum Gender {
  Female = 'female',
  Male = 'male',
  Other = 'other',
}

export type NewPatientEntry = z.infer<typeof NewEntrySchema>;
export type NonSensitivePatientEntry = Omit<PatientEntry, 'ssn'>;
