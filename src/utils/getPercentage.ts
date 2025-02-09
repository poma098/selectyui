/**
 * Calculates the percentage position of a current value within a given range.
 * 
 * @param min - The minimum value of the range.
 * @param max - The maximum value of the range, must be greater than 'min'.
 * @param current - The current value to calculate the percentage for.
 * @returns The percentage (as a number between 0 and 1) representing the 
 *          current value's position between the min and max values.
 *          Returns 0 if the current value is less than min, and 1 if greater than max.
 * @throws Error if 'min' is not less than 'max'.
 */
export function getPercentage(min: number, max: number, current: number): number {
  if (min >= max) {
    throw new Error("The 'min' value must be less than the 'max' value.");
  }

  if (current < min) {
    return 0;
  } else if (current > max) {
    return 1;
  }

  return (current - min) / (max - min);
}