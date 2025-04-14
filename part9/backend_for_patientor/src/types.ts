import { z } from 'zod';
import { NewEntrySchema } from './utils';

export interface DiagnosisEntry {
  code: string;
  name: string;
  latin?: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Entry {}

export interface PatientEntry {
  id: string;
  name: string;
  ssn?: string;
  occupation: string;
  gender: string;
  dateOfBirth: string;
  entries: Entry[];
}

export enum Gender {
  Female = 'female',
  Male = 'male',
  Other = 'other',
}

export type NewPatientEntry = z.infer<typeof NewEntrySchema>;
export type NonSensitivePatientEntry = Omit<
  PatientEntry,
  'ssn' | 'entries'
>;
