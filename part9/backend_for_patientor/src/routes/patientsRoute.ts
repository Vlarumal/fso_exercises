import express, { Response } from 'express';
import patientsService from '../services/patientsService';
import { NonSensitivePatientEntry } from '../types';

const patientsRouter = express.Router();

patientsRouter.get(
  '/',
  (_req, res: Response<NonSensitivePatientEntry[]>) => {
    res.send(patientsService.getNonSensitiveEntries());
  }
);

export default patientsRouter;
