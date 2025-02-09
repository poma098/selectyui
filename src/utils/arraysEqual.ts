/**
 * Compares two arrays for equality.
 *
 * @param {Array<T>} arr1 The first array to compare.
 * @param {Array<T>} arr2 The second array to compare.
 * @return {boolean} true if the arrays are equal, false otherwise.
 */
function arraysEqual<T>(arr1: T[], arr2: T[]): boolean {
  if (arr1.length !== arr2.length) {
    return false;
  }

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }

  return true;
}

export default arraysEqual