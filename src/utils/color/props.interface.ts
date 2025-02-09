// Шаблоны для строк
export type HexColor = `#${string}`;

export type RgbString =
  | `rgb(${number}, ${number}, ${number})`
  | `rgb(${number},${number},${number})`;
export type RgbaString =
  | `rgba(${number}, ${number}, ${number}, ${number})`
  | `rgba(${number},${number},${number},${number})`;
export type HslString =
  | `hsl(${number} ${number}% ${number}%)`
  | `hsl(${number} ${number} ${number}%)`
  | `hsl(${number} ${number}% ${number})`
  | `hsl(${number} ${number} ${number})`
  | `hsl(${number}deg ${number}% ${number}%)`
  | `hsl(${number}deg ${number} ${number}%)`
  | `hsl(${number}deg ${number}% ${number})`
  | `hsl(${number}deg ${number} ${number})`
  | `hsl(${number} ${number}% ${number}% / ${number})`
  | `hsl(${number} ${number} ${number}% / ${number})`
  | `hsl(${number} ${number}% ${number} / ${number})`
  | `hsl(${number} ${number} ${number} / ${number})`
  | `hsl(${number}deg ${number}% ${number}% / ${number})`
  | `hsl(${number}deg ${number} ${number}% / ${number})`
  | `hsl(${number}deg ${number}% ${number} / ${number})`
  | `hsl(${number}deg ${number} ${number} / ${number})`;

export type HslaString =
  | `hsl(${number} ${number}% ${number}%)`
  | `hsl(${number} ${number} ${number}%)`
  | `hsl(${number} ${number}% ${number})`
  | `hsl(${number} ${number} ${number})`
  | `hsl(${number}deg ${number}% ${number}%)`
  | `hsl(${number}deg ${number} ${number}%)`
  | `hsl(${number}deg ${number}% ${number})`
  | `hsl(${number}deg ${number} ${number})`
  | `hsl(${number} ${number}% ${number}% / ${number})`
  | `hsl(${number} ${number} ${number}% / ${number})`
  | `hsl(${number} ${number}% ${number} / ${number})`
  | `hsl(${number} ${number} ${number} / ${number})`
  | `hsl(${number}deg ${number}% ${number}% / ${number})`
  | `hsl(${number}deg ${number} ${number}% / ${number})`
  | `hsl(${number}deg ${number}% ${number} / ${number})`
  | `hsl(${number}deg ${number} ${number} / ${number})`;

export type HwbString =
  | `hwb(${number} ${number}% ${number}%)`
  | `hwb(${number} ${number} ${number}%)`
  | `hwb(${number} ${number}% ${number})`
  | `hwb(${number} ${number} ${number})`
  | `hwb(${number} ${number}% ${number}% / ${number})`
  | `hwb(${number} ${number} ${number}% / ${number})`
  | `hwb(${number} ${number}% ${number} / ${number})`
  | `hwb(${number} ${number} ${number} / ${number})`
  | `hwb(${number} ${number}% ${number}% / ${number}%)`
  | `hwb(${number} ${number} ${number}% / ${number}%)`
  | `hwb(${number} ${number}% ${number} / ${number}%)`
  | `hwb(${number} ${number} ${number} / ${number}%)`
  | `hwb(${number}deg ${number}% ${number}%)`
  | `hwb(${number}deg ${number} ${number}%)`
  | `hwb(${number}deg ${number}% ${number})`
  | `hwb(${number}deg ${number} ${number})`
  | `hwb(${number}deg ${number}% ${number}% / ${number})`
  | `hwb(${number}deg ${number} ${number}% / ${number})`
  | `hwb(${number}deg ${number}% ${number} / ${number})`
  | `hwb(${number}deg ${number} ${number} / ${number})`
  | `hwb(${number}deg ${number}% ${number}% / ${number}%)`
  | `hwb(${number}deg ${number} ${number}% / ${number}%)`
  | `hwb(${number}deg ${number}% ${number} / ${number}%)`
  | `hwb(${number}deg ${number} ${number} / ${number}%)`

export type LchString =
  | `lch(${number} ${number} ${number})`
  | `lch(${number} ${number} ${number} / ${number})`
  | `lch(${number} ${number} ${number} / ${number}%)`;

export type OklchString =
  | `oklch(${number} ${number} ${number})`
  | `oklch(${number} ${number} ${number} / ${number})`
  | `oklch(${number} ${number} ${number} / ${number}%)`;

export type LabString =
  | `lab(${number} ${number} ${number})`
  | `lab(${number} ${number} ${number} / ${number})`
  | `lab(${number} ${number} ${number} / ${number}%)`;

export type OklabString =
  | `oklab(${number} ${number} ${number})`
  | `oklab(${number} ${number} ${number} / ${number})`
  | `oklab(${number} ${number} ${number} / ${number}%)`;

// Объекты цветов
export interface RgbColor {
  r: number;
  g: number;
  b: number;
}

export interface RgbaColor {
  r: number;
  g: number;
  b: number;
  a: number;
}

export interface HslColor {
  h: number;
  s: number;
  l: number;
}

export interface HslaColor {
  h: number;
  s: number;
  l: number;
  a: number;
}

export interface HwbColor {
  h: number;
  w: number;
  b: number;
}

export interface LchColor {
  l: number;
  c: number;
  h: number;
}

export interface OklchColor {
  l: number;
  c: number;
  h: number;
}

export interface LabColor {
  l: number;
  a: number;
  b: number;
}

export interface OklabColor {
  l: number;
  a: number;
  b: number;
}

/**
 * Диагнозы, при которых цвета плохо видны
 * 
 * @property {'Proteranopia'} Proteranopia - Тип дальтонизма, при котором отсутствует восприятие красного цвета. Люди с протанопией не могут различать между красными и зелеными цветами.
 * @property {'Deuteranopia'} Deuteranopia - Тип дальтонизма, при котором отсутствует восприятие зелёного цвета. Люди с дейтеранопией также не могут различать между красными и зелеными цветами.
 * @property {'Tritanopia'} Tritanopia - Тип дальтонизма, при котором отсутствует восприятие синего цвета. Люди с тританопией не могут различать между синими и жёлтыми цветами.
 * @property {'Achromatopsia'} Achromatopsia - Полная цветовая слепота, при которой люди видят только оттенки серого.
 */
export type ColorBlindType = 'Proteranopia' | 'Deuteranopia' | 'Tritanopia' | 'Achromatopsia';

// Интерфейс для результата проверки контрастности
export interface ContrastResultBlindness {
  isContrasting: boolean; // Являются ли цвета контрастными
  nonVisibleDiagnoses: ColorBlindType[]; // Диагнозы, при которых цвета плохо видны
}