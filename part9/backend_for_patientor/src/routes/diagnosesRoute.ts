import express, { Response } from 'express';
import diagnosesService from '../services/diagnosesService';
import { DiagnosisEntry } from '../types';

const diagnosesRouter = express.Router();

diagnosesRouter.get('/', (_req, res: Response<DiagnosisEntry[]>) => {
  res.send(diagnosesService.getEntries());
});

export default diagnosesRouter;
