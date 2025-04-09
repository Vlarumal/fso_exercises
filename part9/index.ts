import express from 'express';
import { calculateBmi } from './bmiCalculator';

const app = express();

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
  } catch (error) {
    res.status(400).json({ error: 'malformatted parameters' });
    return;
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
