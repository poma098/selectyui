/**
 * Интерполирует массив чисел до заданной целевой длины с помощью линейной интерполяции.
 *
 * @param {number[]} data - Исходный массив чисел для интерполяции.
 * @param {number} targetLength - Желаемая длина результирующего интерполированного массива.
 * @returns {number[]} Новый массив указанной целевой длины с интерполированными значениями между элементами исходного массива.
 *                     
 */
const interpolateArray = (data: number[], targetLength: number): number[] => {
  if (data.length === targetLength) return data;

  const result = [];
  const factor = (data.length - 1) / (targetLength - 1);

  for (let i = 0; i < targetLength; i++) {
    const index = i * factor;
    const lowerIndex = Math.floor(index);
    const upperIndex = Math.ceil(index);

    if (lowerIndex === upperIndex) {
      result.push(data[lowerIndex]);
    } else {
      const weight = index - lowerIndex;
      result.push(data[lowerIndex] * (1 - weight) + data[upperIndex] * weight);
    }
  }

  return result;
};

export default interpolateArray;