import { isNotNumber } from './utils';

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface CorrectValues {
  exerciseHours: number[];
  targetAmount: number;
}

const getArguments = (args: string[]): CorrectValues => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const argsAfterCheck: number[] = [];
  args.slice(2).forEach((arg) => {
    if (!isNotNumber(arg)) {
      argsAfterCheck.push(Number(arg));
    }
  });

  if (args.length - 2 === argsAfterCheck.length) {
    return {
      targetAmount: argsAfterCheck[0],
      exerciseHours: argsAfterCheck.slice(1),
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

export const calculateExercises = (
  exerciseHours: number[],
  targetAmount: number
): Result | undefined => {
  try {
    if (!exerciseHours || exerciseHours.length === 0) {
      throw new Error("Exercise hours can't be empty.");
    }

    const periodLength = exerciseHours.length;
    const trainingDays = exerciseHours.filter(
      (exercise) => exercise > 0
    ).length;
    const average =
      exerciseHours.reduce((sum, current) => sum + current, 0) /
      periodLength;
    const success = average >= targetAmount;
    let rating: number;
    let ratingDescription: string;

    if (average > targetAmount) {
      rating = 3;
      ratingDescription = 'Excellent result';
    } else if (average === targetAmount) {
      rating = 2;
      ratingDescription = 'Good!';
    } else {
      rating = 1;
      ratingDescription = 'Not too bad but could be better';
    }

    const target = targetAmount;

    return {
      periodLength,
      trainingDays,
      success,
      rating,
      ratingDescription,
      target,
      average,
    };
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong:';
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    console.error(errorMessage);
    return;
  }
};

// const exerciseHours = [3, 0, 2, 4.5, 0, 3, 1];
// const targetAmount = 2;
// const result = calculateExercises(exerciseHours, targetAmount);
// if (result) {
//   console.log(result);
// }

if (require.main === module) {
  try {
    const { targetAmount, exerciseHours } = getArguments(
      process.argv
    );
    console.log(calculateExercises(exerciseHours, targetAmount));
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.error(errorMessage);
  }
}
