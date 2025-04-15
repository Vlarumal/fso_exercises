import { z } from 'zod';
import {
  NewPatientEntry,
  Gender,
} from './types';

export const NewPatientEntrySchema = z.object({
  name: z.string(),
  ssn: z.string().optional(),
  occupation: z.string(),
  dateOfBirth: z.string().date(),
  gender: z.nativeEnum(Gender),
  // entries: z.array(z.object({})).default([]),
});

const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  return NewPatientEntrySchema.parse(object);
};

export default toNewPatientEntry;
