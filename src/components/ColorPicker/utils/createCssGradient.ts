import { HslaColor } from "utils/color/props.interface";
import {
  ColorStop,
  GradientType,
  RadialGradientShape,
  RadialGradientSize,
} from "../props.interface";
import { hslaToHex } from "utils/color/convert";


/**
 * Converts an HSLA color to a HEX string.
 *
 * @param {HslaColor} hsla - The HSLA color to convert.
 * @param {boolean} modeAlpha - If true, include the alpha channel in the HEX representation.
 * @returns {string} An 8-character HEX string if modeAlpha === true, 6 characters otherwise.
 */
function convertHslaToHex(hsla: HslaColor, modeAlpha: boolean): string {
  const hex = hslaToHex(hsla); // Предположительно возвращает 8-символьный HEX
  return modeAlpha ? hex : hex.slice(0, 7); // Убираем 2 символа альфа-канала, если modeAlpha === false
}

/**
 * Generates a CSS gradient string from an array of color stops.
 * 
 * @param {ColorStop[]} colors - An array of color stops, each containing a color and its position.
 * @param {GradientType} type - The type of gradient, e.g., 'linear' or 'radial'.
 * @param {number} [angle=180] - The angle of the gradient in degrees, applicable for linear gradients.
 * @param {boolean} [modeAlpha=true] - If true, include alpha channel in the HEX color representation.
 * @param {RadialGradientShape} [shape="circle"] - The shape of the radial gradient, applicable for radial gradients.
 * @param {RadialGradientSize} [size] - The size of the radial gradient, applicable for radial gradients.
 * @returns {string} The CSS gradient string.
 * 
 * @throws {Error} If all color stop positions are not between 0 and 1.
 */
export function createCssGradient(
  colors: ColorStop[],
  type: GradientType,
  angle: number = 180,
  modeAlpha: boolean = true,
  shape: RadialGradientShape = "circle",
  size?: RadialGradientSize
): string {
  // 1. Валидация входных данных
  if (!Array.isArray(colors) || colors.length === 0) {
    return `linear-gradient(0deg, transparent 0%, transparent 100%)`;
  }

  if (type.includes("linear") && (angle < 0 || angle > 360)) {
    return `${type}-gradient(0deg, transparent 0%, transparent 100%)`;
  }

  if (colors.length <= 1) {
    return `${type}-gradient(${angle}deg, ${colors[0].color} 0%, ${colors[0].color} 100%)`;
  }

  // 2. Фильтрация, сортировка и преобразование цветов
  const sortedColors = colors
    .filter(({ position }) => position >= 0 && position <= 1)
    .sort((a, b) => a.position - b.position)
    .map(
      ({ color, position }) =>
        `${convertHslaToHex(color, modeAlpha)} ${(position * 100).toFixed(2)}%`
    );

  if (sortedColors.length === 0) {
    throw new Error(
      "Invalid color stops: all positions must be between 0 and 1."
    );
  }

  // 3. Генерация градиента
  if (type.includes("linear")) {
    return `${type}-gradient(${angle}deg, ${sortedColors.join(", ")})`;
  } else {
    const sizePart = size ? `${size}, ` : "";
    return `${type}-gradient(${shape}, ${sizePart}${sortedColors.join(", ")})`;
  }
}
