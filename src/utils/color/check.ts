import { rgbaToHex, rgbToGray } from "./convert";
import { ColorBlindType, ContrastResultBlindness, RgbaColor } from "./props.interface";

function getBrightness(r: number, g: number, b: number, a: number = 1): number {
  // Убедитесь, что значения RGB находятся в диапазоне от 0 до 255
  r = Math.max(0, Math.min(255, r));
  g = Math.max(0, Math.min(255, g));
  b = Math.max(0, Math.min(255, b));

  // Вычисляем яркость как значение от 0 до 1
  const brightness = 0.2126 * (r / 255) + 0.7152 * (g / 255) + 0.0722 * (b / 255);

  // Применяем альфа-канал
  return brightness * a;
}

// Функция для проверки, является ли цвет темным
export function isDarkColor(rgba: RgbaColor): boolean {
  const brightness = getBrightness(rgba.r, rgba.g, rgba.b, rgba.a);
  return brightness < 0.5;
}

// Функция для проверки, является ли цвет светлым
export function isLightColor(rgba: RgbaColor): boolean {
  return !isDarkColor(rgba);
}

// Функция для проверки, является ли цвет прозрачным
export function isTransparent(rgba: RgbaColor): boolean {
  return rgba.a === 0;
}

// Функция для проверки, является ли цвет полупрозрачным
export function isHalfTransparent(rgba: RgbaColor): boolean {
  return rgba.a < 0.5;
}

// Функция для проверки, является ли цвет контрастным для заданного цвета
export function isContrastColor(
  rgb: RgbaColor,
  contrastColor: RgbaColor
): boolean {
  const k = getContrastRatio(rgb, contrastColor); // Коэффициент контрастности от 0 до 1
  return k > 0.5;
}

// Функция возвращаемая коэффициент контрастности для цвета
export function getContrastRatio(
  rgb: RgbaColor,
  contrastColor: RgbaColor
): number {
  const rgbBrightness = getBrightness(rgb.r, rgb.g, rgb.b, rgb.a);
  const contrastColorBrightness = getBrightness(
    contrastColor.r,
    contrastColor.g,
    contrastColor.b,
    contrastColor.a
  );

  // Определение светлого и темного цвета
  const L1 = Math.max(rgbBrightness, contrastColorBrightness);
  const L2 = Math.min(rgbBrightness, contrastColorBrightness);

  // Расчет коэффициента контраста
  const contrastRatio = (L1 + 0.05) / (L2 + 0.05);

  // Нормализация коэффициента контраста в диапазоне [0, 1]
  // Коэффициент контраста варьируется от 1 (для одинаковых цветов) до потенциально более высоких значений
  // Для нормализации можно использовать логарифмическую шкалу или любое другое подходящее преобразование.
  return Math.min((contrastRatio - 1) / (21 - 1), 1);
}

export function blendColors(color1: RgbaColor, color2: RgbaColor): RgbaColor {
  const a = color1.a + color2.a * (1 - color1.a);
  const r = (color1.r * color1.a + color2.r * color2.a * (1 - color1.a)) / a;
  const g = (color1.g * color1.a + color2.g * color2.a * (1 - color1.a)) / a;
  const b = (color1.b * color1.a + color2.b * color2.a * (1 - color1.a)) / a;

  return { r, g, b, a };
}

export function normalizeColor(color: RgbaColor): RgbaColor {
  return {
    r: color.r / 255,
    g: color.g / 255,
    b: color.b / 255,
    a: color.a,
  };
}

/**
 * Проверяет, виден ли данный цвет для людей с ахроматопсией (полной цветовой слепотой).
 * Ахроматопсия — это состояние, при котором человек не видит цвета и воспринимает только оттенки серого.
 * 
 * @param color - Цвет в формате RGBA.
 * @returns Возвращает true, если цвет виден в оттенках серого, и false, если нет.
 */
export function isVisibleToAchromatopsia(color: RgbaColor): boolean {
  const normalized = normalizeColor(color);
  const gray =
    0.2126 * normalized.r + 0.7152 * normalized.g + 0.0722 * normalized.b;
  return gray < 0.55;
}

// Симуляция дальтонизма
export function simulateColorBlindness(color: RgbaColor, type: ColorBlindType): RgbaColor {
  const normalized = normalizeColor(color);
  switch (type) {
    case 'Proteranopia':
      return {
        r: 0.567 * normalized.r + 0.433 * normalized.g,
        g: 0.558 * normalized.r + 0.442 * normalized.g,
        b: 0.242 * normalized.g + 0.758 * normalized.b,
        a: normalized.a
      };
    case 'Deuteranopia':
      return {
        r: 0.625 * normalized.r + 0.375 * normalized.g,
        g: 0.700 * normalized.r + 0.300 * normalized.g,
        b: 0.300 * normalized.g + 0.700 * normalized.b,
        a: normalized.a
      };
    case 'Tritanopia':
      return {
        r: 0.967 * normalized.r + 0.033 * normalized.g,
        g: 0.733 * normalized.r + 0.267 * normalized.g,
        b: 1.000 * normalized.b,
        a: normalized.a
      };
    case 'Achromatopsia':
      const gray = rgbToGray(color);
      return { r: gray, g: gray, b: gray, a: color.a };
    default:
      return normalized;
  }
}

export function deNormalizeColor(color: RgbaColor): RgbaColor {
  return {
    r: Math.round(color.r * 255),
    g: Math.round(color.g * 255),
    b: Math.round(color.b * 255),
    a: color.a
  };
}

// Проверка контрастности между двумя цветами
export function checkContrastBlindness(color1: RgbaColor, color2: RgbaColor): ContrastResultBlindness {
  const isContrasting = isContrastColor(color1, color2);
  const diagnoses: ColorBlindType[] = ['Proteranopia', 'Deuteranopia', 'Tritanopia', 'Achromatopsia'];
  const nonVisibleDiagnoses = diagnoses.filter(diag => {
    const simulatedColor1 = deNormalizeColor(simulateColorBlindness(color1, diag));
    const simulatedColor2 = deNormalizeColor(simulateColorBlindness(color2, diag));
    const simContrastRatio = getContrastRatio(simulatedColor1, simulatedColor2);
    return simContrastRatio < 0.025;
  });

  return {
    isContrasting,
    nonVisibleDiagnoses
  };
}