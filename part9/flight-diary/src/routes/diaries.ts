import express, { NextFunction, Request, Response } from 'express';

import diaryService, {
  NewDiaryEntrySchema,
} from '../services/diaryService';

import { DiaryEntry, NewDiaryEntry } from '../types';
import { z } from 'zod';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(diaryService.getEntries());
});

router.get('/:id', (req, res) => {
  const diary = diaryService.findById(Number(req.params.id));

  if (diary) {
    res.send(diary);
  } else {
    res.sendStatus(404);
  }
});

const newDiaryEntryParser = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    NewDiaryEntrySchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

router.post(
  '/',
  newDiaryEntryParser,
  (
    req: Request<unknown, unknown, NewDiaryEntry>,
    res: Response<DiaryEntry>
  ) => {
    const addedEntry = diaryService.addDiary(req.body);
    res.json(addedEntry);
  }
);

router.use(errorMiddleware);

export default router;
