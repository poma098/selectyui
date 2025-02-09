/**
 * Restricts a number to be within a specified range.
 *
 * @param value - The number to be clamped.
 * @param min - The minimum value to clamp to.
 * @param max - The maximum value to clamp to.
 * @returns The clamped number within the range [min, max].
 */
export const clamp = (value: number, min: number, max: number): number =>
  Math.max(min, Math.min(value, max));
