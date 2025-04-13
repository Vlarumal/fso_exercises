import { z } from 'zod';
import diaryData from '../../data/entries';

import {
  NonSensitiveDiaryEntry,
  DiaryEntry,
  NewDiaryEntry,
  Visibility,
  Weather,
} from '../types';

const diaries: DiaryEntry[] = diaryData;

const getEntries = (): DiaryEntry[] => {
  return diaries;
};

const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
  return diaries.map(({ id, date, weather, visibility }) => ({
    id,
    date,
    weather,
    visibility,
  }));
};

const findById = (id: number): DiaryEntry | undefined => {
  const entry = diaries.find((d) => d.id === id);
  return entry;
};

export const NewDiaryEntrySchema = z.object({
  date: z.string().date(),
  visibility: z.nativeEnum(Visibility),
  weather: z.nativeEnum(Weather),
  comment: z.string().optional(),
});

export const toNewDiaryEntry = (object: unknown): NewDiaryEntry => {
  return NewDiaryEntrySchema.parse(object);
};

const addDiary = (entry: NewDiaryEntry): DiaryEntry => {
  const newDiaryEntry = {
    id: Math.max(...diaries.map((d) => d.id)) + 1,
    ...entry,
  };

  diaries.push(newDiaryEntry);
  return newDiaryEntry;
};

export default {
  getEntries,
  addDiary,
  getNonSensitiveEntries,
  findById,
};
