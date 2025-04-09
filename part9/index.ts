import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
import { isNotNumber } from './utils';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  try {
    if (!req.query.weight || !req.query.height) {
      res
        .status(400)
        .json({ error: 'Missing weight or height parameter(s)' });
      return;
    }

    const weight: number = Number(req.query.weight);
    const height: number = Number(req.query.height);

    if (isNaN(weight) || isNaN(height)) {
      res
        .status(400)
        .json({ error: 'Weight and height must be numbers' });
      return;
    }

    if (weight <= 0 || height <= 0) {
      res.status(400).json({
        error: 'Weight and height must be positive numbers',
      });
      return;
    }

    const bmi: string = calculateBmi(height, weight);
    res.json({
      weight,
      height,
      bmi,
    });
    return;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    res.status(400).json({ error: 'malformatted parameters' });
    return;
  }
});

app.post('/exercises', (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target } = req.body;

    if (!daily_exercises || !target) {
      res.status(400).json({
        error: 'parameters missing',
      });
      return;
    }

    const isArrayOfNumbers = (array: unknown[]): boolean => {
      return (
        Array.isArray(array) &&
        array.every((element) => !isNotNumber(element))
      );
    };

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    if (isNotNumber(target) || !isArrayOfNumbers(daily_exercises)) {
      res.status(400).json({ error: 'malformatted parameters' });
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const result = calculateExercises(daily_exercises, target);

    res.send({ result });
    return;
  } catch (error) {
    res.status(400).json(error);
    return;
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
