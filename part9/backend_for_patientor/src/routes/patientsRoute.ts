import express, { NextFunction, Request, Response } from 'express';
import patientsService from '../services/patientsService';
import {
  NewPatientEntry,
  NonSensitivePatientEntry,
  PatientEntry,
} from '../types';
import { NewPatientEntrySchema } from '../utils';
import { z } from 'zod';

const patientsRouter = express.Router();

patientsRouter.get(
  '/',
  (_req, res: Response<NonSensitivePatientEntry[]>) => {
    res.send(patientsService.getNonSensitiveEntries());
  }
);

patientsRouter.get(
  '/:id',
  (req, res: Response<PatientEntry | undefined>) => {
    const patient = patientsService.findById(req.params.id);

    if (patient) {
      res.send(patient);
      return;
    }

    res.sendStatus(404);
    return;
  }
);

const newPatientParser = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    NewPatientEntrySchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const errorMiddleWare = (
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

patientsRouter.post(
  '/',
  newPatientParser,
  (
    req: Request<unknown, unknown, NewPatientEntry>,
    res: Response<PatientEntry>
  ) => {
    const addedEntry = patientsService.addPatient(req.body);
    res.json(addedEntry);
  }
);

patientsRouter.use(errorMiddleWare);

export default patientsRouter;
