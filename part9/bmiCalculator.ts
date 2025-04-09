import { isNotNumber } from './utils';

interface NumberValues {
  height: number;
  weight: number;
}

const parseArguments = (args: string[]): NumberValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNotNumber(args[2]) && !isNotNumber(args[3])) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

export const calculateBmi = (
  height: number,
  weight: number
): string => {
  const heightInMeters = height / 100;
  const bmi = weight / heightInMeters ** 2;

  if (bmi < 18.5) {
    return 'Underweight';
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    return 'Normal range';
  } else if (bmi >= 25 && bmi <= 29.9) {
    return 'Overweight';
  } else if (bmi >= 30) {
    return 'Obese';
  } else {
    return 'Something is wrong';
  }
};

if (require.main === module) {
  try {
    const { height, weight } = parseArguments(process.argv);
    console.log(calculateBmi(height, weight));
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.error(errorMessage);
  }
}
