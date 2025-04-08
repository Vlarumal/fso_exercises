interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (
  exerciseHours: number[],
  targetAmount: number
): Result => {
  try {
    if (!exerciseHours || exerciseHours.length === 0) {
      throw new Error("Exercice hours can't be empty.");
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

const exerciseHours = [3, 0, 2, 4.5, 0, 3, 1];
const targetAmount = 2;
const result = calculateExercises(exerciseHours, targetAmount);
if (result) {
  console.log(result);
}
