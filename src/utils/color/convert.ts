import { normalizeColor } from "./check";
import {
  RgbColor,
  RgbaColor,
  HslColor,
  HslaColor,
  HexColor,
  HwbColor,
  LchColor,
  OklchColor,
  LabColor,
  OklabColor,
  RgbString,
  RgbaString,
  HslString,
  HslaString,
  HwbString,
  LchString,
  OklchString,
  LabString,
  OklabString,
} from "./props.interface";

export function hexStringToRgbaColor(hexString: HexColor): RgbaColor {
  return hexToRgba(hexString);
}

export function rgbStringToRgbaColor(rgbString: RgbString): RgbaColor {
  const matches = rgbString.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
  if (!matches) {
    throw new Error("Invalid RGB color format");
  }
  const [, r, g, b] = matches.map(Number);
  return { r, g, b, a: 1 };
}

export function rgbaStringToRgbaColor(rgbaString: RgbaString): RgbaColor {
  const matches = rgbaString.match(
    /rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/
  );
  if (!matches) {
    throw new Error("Invalid RGBA color format");
  }
  const [, r, g, b, a] = matches.map(Number);
  return { r, g, b, a };
}
export function hslStringToRgbaColor(hslString: HslString): RgbaColor {
  const matches = hslString.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
  if (!matches) {
    throw new Error("Invalid HSL color format");
  }
  let [h, s, l] = matches.slice(1).map(Number);
  s /= 100;
  l /= 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;

  let [r, g, b] = [0, 0, 0];
  if (h < 60) {
    [r, g, b] = [c, x, 0];
  } else if (h < 120) {
    [r, g, b] = [x, c, 0];
  } else if (h < 180) {
    [r, g, b] = [0, c, x];
  } else if (h < 240) {
    [r, g, b] = [0, x, c];
  } else if (h < 300) {
    [r, g, b] = [x, 0, c];
  } else {
    [r, g, b] = [c, 0, x];
  }

  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  return { r, g, b, a: 1 };
}

export function hslaStringToRgbaColor(hslaString: HslaString): RgbaColor {
  const matches = hslaString.match(
    /hsla\((\d+),\s*(\d+)%,\s*(\d+)%,\s*([\d.]+)\)/
  );
  if (!matches) {
    throw new Error("Invalid HSLA color format");
  }
  let [h, s, l, a] = matches.slice(1).map(Number);
  s /= 100;
  l /= 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;

  let [r, g, b] = [0, 0, 0];
  if (h < 60) {
    [r, g, b] = [c, x, 0];
  } else if (h < 120) {
    [r, g, b] = [x, c, 0];
  } else if (h < 180) {
    [r, g, b] = [0, c, x];
  } else if (h < 240) {
    [r, g, b] = [0, x, c];
  } else if (h < 300) {
    [r, g, b] = [x, 0, c];
  } else {
    [r, g, b] = [c, 0, x];
  }

  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  return { r, g, b, a };
}

export function hwbStringToRgbaColor(hwbString: HwbString): RgbaColor {
  const matches = hwbString.match(/hwb\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
  if (!matches) {
    throw new Error("Invalid HWB color format");
  }
  let [h, w, b] = matches.slice(1).map(Number);
  w /= 100;
  b /= 100;

  const l = 1 - b;
  const s = 1 - w;
  const hsl = `hsl(${h}, ${s * 100}%, ${l * 100}%)`;

  return hslStringToRgbaColor(hsl as HslString);
}

export function lchStringToRgbaColor(lchString: LchString): RgbaColor {
  const [l, c, h] = lchString
    .match(/lch\((\d+),\s*(\d+),\s*(\d+)\)/)!
    .slice(1)
    .map(Number);

  // Convert LCH to LAB
  const hRad = (h / 360) * 2 * Math.PI;
  const a = c * Math.cos(hRad);
  const b = c * Math.sin(hRad);

  const lab = `lab(${l}, ${a}, ${b})`;
  return labStringToRgbaColor(lab as LabString);
}

export function oklchStringToRgbaColor(oklchString: OklchString): RgbaColor {
  const [l, c, h] = oklchString
    .match(/oklch\((\d+),\s*(\d+),\s*(\d+)\)/)!
    .slice(1)
    .map(Number);

  // Convert OKLCH to OKLAB
  const hRad = (h / 360) * 2 * Math.PI;
  const a = c * Math.cos(hRad);
  const b = c * Math.sin(hRad);

  const oklab = `oklab(${l}, ${a}, ${b})`;
  return oklabStringToRgbaColor(oklab as OklabString);
}

export function labStringToRgbaColor(labString: LabString): RgbaColor {
  const [l, a, b] = labString
    .match(/lab\((\d+),\s*(\d+),\s*(\d+)\)/)!
    .slice(1)
    .map(Number);

  // Convert LAB to XYZ
  const y = (l + 16) / 116;
  const x = a / 500 + y;
  const z = y - b / 200;

  const [x3, y3, z3] = [x ** 3, y ** 3, z ** 3];
  const [xR, yR, zR] = [
    x3 > 0.008856 ? x3 : (x - 16 / 116) / 7.787,
    y3 > 0.008856 ? y3 : (y - 16 / 116) / 7.787,
    z3 > 0.008856 ? z3 : (z - 16 / 116) / 7.787,
  ];

  const [r, g, _b] = [
    xR * 3.2406 - yR * 1.5372 - zR * 0.4986,
    -xR * 0.9689 + yR * 1.8758 + zR * 0.0415,
    xR * 0.0557 - yR * 0.204 + zR * 1.057,
  ];

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(_b * 255),
    a: 1,
  };
}

export function oklabStringToRgbaColor(oklabString: OklabString): RgbaColor {
  const [l, a, b] = oklabString
    .match(/oklab\((\d+),\s*(\d+),\s*(\d+)\)/)!
    .slice(1)
    .map(Number);

  // Convert OKLAB to XYZ
  const y = (l + 0.3963377774 * a + 0.2158037573 * b) / 1.0;
  const x = (l - 0.1055613458 * a - 0.0638541728 * b) / 1.0;
  const z = (l - 0.0894841775 * a - 0.0106268854 * b) / 1.0;

  // Convert XYZ to RGB
  const [r, g, _b] = [
    x * 3.2406 - y * 1.5372 - z * 0.4986,
    -x * 0.9689 + y * 1.8758 + z * 0.0415,
    x * 0.0557 - y * 0.204 + z * 1.057,
  ];

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(_b * 255),
    a: 1,
  };
}

// Преобразование цвета в оттенок серого
export function rgbToGray(color: RgbaColor): number {
  const normalized = normalizeColor(color);
  return 0.2126 * normalized.r + 0.7152 * normalized.g + 0.0722 * normalized.b;
}



export function rgbToHsl(rgb: RgbColor): HslColor {
  const { r, g, b } = rgb;
  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;
  const max = Math.max(rNorm, gNorm, bNorm);
  const min = Math.min(rNorm, gNorm, bNorm);
  const delta = max - min;
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (delta !== 0) {
    if (max === rNorm) {
      h = ((gNorm - bNorm) / delta + (gNorm < bNorm ? 6 : 0)) % 6;
    } else if (max === gNorm) {
      h = (bNorm - rNorm) / delta + 2;
    } else {
      h = (rNorm - gNorm) / delta + 4;
    }
    s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    h *= 60;
    if (s > 1) s = 1;
  }

  return { h: h, s: s * 100, l: l * 100 };
}

// RGB to other formats
export function rgbToHwb(rgb: RgbColor): HwbColor {
  const hsl = rgbToHsl(rgb);
  const { h, l, s } = hsl;
  const w = (1 - l / 100 - s / 100);
  const b = (1 - l / 100 - w);
  return { h: h, w: w * 100, b: b * 100 };
}

export function rgbToLch(rgb: RgbColor): LchColor {
  const lab = rgbToLab(rgb);
  return labToLch(lab);
}

export function rgbToOklch(rgb: RgbColor): OklchColor {
  const oklab = rgbToOklab(rgb);
  return oklabToOklch(oklab);
}

// Функция для конвертации других цветов в RGB
export function rgbToLab(rgb: RgbColor): LabColor {
  const { r, g, b } = rgb;
  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;

  const x = rNorm * 0.4124564 + gNorm * 0.3575761 + bNorm * 0.1804375;
  const y = rNorm * 0.2126729 + gNorm * 0.7151522 + bNorm * 0.0721750;
  const z = rNorm * 0.0193339 + gNorm * 0.1191920 + bNorm * 0.9503041;

  const yNorm = y / 0.95047;  // Normalized reference white
  const xNorm = x / 0.4124564;
  const zNorm = z / 0.019334;

  const l = (116 * yNorm ** (1 / 3) - 16) / 100;
  const a = (xNorm ** (1 / 3) - yNorm ** (1 / 3)) * 500;
  const _b = (yNorm ** (1 / 3) - zNorm ** (1 / 3)) * 200;

  return { l, a, b: _b };
}

export function rgbToOklab(rgb: RgbColor): OklabColor {
  const lab = rgbToLab(rgb);
  return labToOklab(lab);
}

// Конвертация RGB в RGBA
export function rgbToRgba(rgb: RgbColor, alpha: number = 1): RgbaColor {
  const { r, g, b } = rgb;
  return { r, g, b, a: alpha };
}

// Конвертация RGB в HSLA
export function rgbToHsla(rgb: RgbColor, alpha: number = 1): HslaColor {
  const hsl = rgbToHsl(rgb);
  return { ...hsl, a: alpha };
}

// Конвертация RGB в HEX
export function rgbToHex(rgb: RgbColor): HexColor {
  const { r, g, b } = rgb;
  const toHex = (value: number) => value.toString(16).padStart(2, '0');
  return `#${toHex(r).toUpperCase()}${toHex(g).toUpperCase()}${toHex(b).toUpperCase()}`;
}

// Конвертация RGBA в RGB
export function rgbaToRgb(rgba: RgbaColor): RgbColor {
  const { r, g, b } = rgba;
  return { r, g, b };
}

// Конвертация RGBA в HSL
export function rgbaToHsl(rgba: RgbaColor): HslColor {
  const { r, g, b } = rgba;
  const rgb = { r, g, b };
  return rgbToHsl(rgb);
}

export function rgbaToHsla(rgba: RgbaColor): HslaColor {
  const { a } = rgba;
  const hsl = rgbaToHsl(rgba);
  return { ...hsl, a };
}

// Конвертация RGBA в HEX
export function rgbaToHex(rgba: RgbaColor): HexColor {
  const { r, g, b } = rgba;
  const rgb = { r, g, b };
  return rgbToHex(rgb);
}

// Конвертация RGBA в HWB
export function rgbaToHwb(rgba: RgbaColor): HwbColor {
  const { r, g, b } = rgba;
  const rgb = { r, g, b };
  return rgbToHwb(rgb);
}

// Конвертация RGBA в LCH
export function rgbaToLch(rgba: RgbaColor): LchColor {
  const { r, g, b } = rgba;
  const rgb = { r, g, b };
  const lab = rgbToLab(rgb);
  return labToLch(lab);
}

// Конвертация RGBA в OKLCH
export function rgbaToOklch(rgba: RgbaColor): OklchColor {
  const { r, g, b } = rgba;
  const rgb = { r, g, b };
  const oklab = rgbToOklab(rgb);
  return oklabToOklch(oklab);
}

// Конвертация RGBA в LAB
export function rgbaToLab(rgba: RgbaColor): LabColor {
  const { r, g, b } = rgba;
  const rgb = { r, g, b };
  return rgbToLab(rgb);
}

// Конвертация RGBA в OKLAB
export function rgbaToOklab(rgba: RgbaColor): OklabColor {
  const { r, g, b } = rgba;
  const rgb = { r, g, b };
  return rgbToOklab(rgb);
}

export function hslToRgb(hsl: HslColor): RgbColor {
  const { h, s, l } = hsl;
  const sNorm = s / 100;
  const lNorm = l / 100;
  const c = (1 - Math.abs(2 * lNorm - 1)) * sNorm;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = lNorm - c / 2;
  let r = 0, g = 0, b = 0;

  if (0 <= h && h < 60) {
    r = c; g = x; b = 0;
  } else if (60 <= h && h < 120) {
    r = x; g = c; b = 0;
  } else if (120 <= h && h < 180) {
    r = 0; g = c; b = x;
  } else if (180 <= h && h < 240) {
    r = 0; g = x; b = c;
  } else if (240 <= h && h < 300) {
    r = x; g = 0; b = c;
  } else {
    r = c; g = 0; b = x;
  }

  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255)
  };
}

// Конвертация HSL в RGBA
export function hslToRgba(hsl: HslColor, alpha: number = 1): RgbaColor {
  const rgb = hslToRgb(hsl);
  return { ...rgb, a: alpha };
}

// Конвертация HSL в HEX
export function hslToHex(hsl: HslColor): HexColor {
  const rgb = hslToRgb(hsl);
  return rgbToHex(rgb);
}

// Конвертация HSL в HWB
export function hslToHwb(hsl: HslColor): HwbColor {
  const rgb = hslToRgb(hsl);
  return rgbToHwb(rgb);
}

// Конвертация HSL в LCH
export function hslToLch(hsl: HslColor): LchColor {
  const rgb = hslToRgb(hsl);
  const lab = rgbToLab(rgb);
  return labToLch(lab);
}

// Конвертация HSL в HSLA
export function hslToHsla(hsl: HslColor, alpha: number = 1): HslaColor {
  return { ...hsl, a: alpha };
}

// Конвертация HSL в OKLCH
export function hslToOklch(hsl: HslColor): OklchColor {
  const rgb = hslToRgb(hsl);
  const oklab = rgbToOklab(rgb);
  return oklabToOklch(oklab);
}

// Конвертация HSL в LAB
export function hslToLab(hsl: HslColor): LabColor {
  const rgb = hslToRgb(hsl);
  return rgbToLab(rgb);
}

// Конвертация HSL в OKLAB
export function hslToOklab(hsl: HslColor): OklabColor {
  const rgb = hslToRgb(hsl);
  return rgbToOklab(rgb);
}

// Конвертация HSLA в RGB
export function hslaToRgb(hsla: HslaColor): RgbColor {
  const { h, s, l, a } = hsla;
  const hsl = { h, s, l };
  const rgb = hslToRgb(hsl);
  return rgb;
}

// Конвертация HSLA в RGBA
export function hslaToRgba(hsla: HslaColor): RgbaColor {
  const { h, s, l, a } = hsla;
  const rgb = hslToRgb({ h, s, l });
  return { ...rgb, a };
}

// Конвертация HSLA в HSL
export function hslaToHsl(hsla: HslaColor): HslColor {
  const { h, s, l } = hsla;
  return { h, s, l };
}

// Конвертация HSLA в HEX
export function hslaToHex(hsla: HslaColor): HexColor {
  const rgb = hslaToRgb(hsla);
  return rgbToHex(rgb);
}

// Конвертация HSLA в HWB
export function hslaToHwb(hsla: HslaColor): HwbColor {
  const rgb = hslaToRgb(hsla);
  return rgbToHwb(rgb);
}

// Конвертация HSLA в LCH
export function hslaToLch(hsla: HslaColor): LchColor {
  const rgb = hslaToRgb(hsla);
  const lab = rgbToLab(rgb);
  return labToLch(lab);
}

// Конвертация HSLA в OKLCH
export function hslaToOklch(hsla: HslaColor): OklchColor {
  const rgb = hslaToRgb(hsla);
  const oklab = rgbToOklab(rgb);
  return oklabToOklch(oklab);
}

// Конвертация HSLA в LAB
export function hslaToLab(hsla: HslaColor): LabColor {
  const rgb = hslaToRgb(hsla);
  return rgbToLab(rgb);
}

// Конвертация HSLA в OKLAB
export function hslaToOklab(hsla: HslaColor): OklabColor {
  const rgb = hslaToRgb(hsla);
  return rgbToOklab(rgb);
}

// HWB to RGB
export function hwbToRgb(hwb: HwbColor): RgbColor {
  const { h, w, b } = hwb;
  const c = 1 - w - b;
  const hsl = hwbToHsl(h, w, b);
  return hslToRgb(hsl);
}

export function hwbToHsl(h: number, w: number, b: number): HslColor {
  const s = (1 - w - b) / (1 - Math.min(w, b));
  return { h: h, s: s * 100, l: (1 - s) * 50 };
}

// Конвертация HWB в HSLA
export function hwbToHsla(hwb: HwbColor, alpha: number = 1): HslaColor {
  const rgb = hwbToRgb(hwb);
  const hsl = rgbToHsl(rgb);
  return { ...hsl, a: alpha };
}

// Конвертация HWB в HEX
export function hwbToHex(hwb: HwbColor): HexColor {
  const rgb = hwbToRgb(hwb);
  return rgbToHex(rgb);
}

// Конвертация HWB в LCH
export function hwbToLch(hwb: HwbColor): LchColor {
  const rgb = hwbToRgb(hwb);
  const lab = rgbToLab(rgb);
  return labToLch(lab);
}

// Конвертация HWB в OKLCH
export function hwbToOklch(hwb: HwbColor): OklchColor {
  const rgb = hwbToRgb(hwb);
  const oklab = rgbToOklab(rgb);
  return oklabToOklch(oklab);
}

// Конвертация HWB в LAB
export function hwbToLab(hwb: HwbColor): LabColor {
  const rgb = hwbToRgb(hwb);
  return rgbToLab(rgb);
}

// Конвертация HWB в OKLAB
export function hwbToOklab(hwb: HwbColor): OklabColor {
  const rgb = hwbToRgb(hwb);
  return rgbToOklab(rgb);
}

// Конвертация HWB в RGBA
export function hwbToRgba(hwb: HwbColor, alpha: number = 1): RgbaColor {
  const rgb = hwbToRgb(hwb);
  return { ...rgb, a: alpha };
}

// LCH to LAB
export function lchToLab(lch: LchColor): LabColor {
  const { l, c, h } = lch;
  const a = Math.cos(h * Math.PI / 180) * c;
  const b = Math.sin(h * Math.PI / 180) * c;
  return { l: l, a: a, b: b };
}

// Конвертация LCH в RGB
export function lchToRgb(lch: LchColor): RgbColor {
  const lab = lchToLab(lch);
  return labToRgb(lab);
}

// Конвертация LCH в RGBA
export function lchToRgba(lch: LchColor, alpha: number = 1): RgbaColor {
  const lab = lchToLab(lch);
  const rgb = labToRgb(lab);
  return { ...rgb, a: alpha };
}

// Конвертация LCH в HSL
export function lchToHsl(lch: LchColor): HslColor {
  const lab = lchToLab(lch);
  const rgb = labToRgb(lab);
  return rgbToHsl(rgb);
}

// Конвертация LCH в HSLA
export function lchToHsla(lch: LchColor, alpha: number = 1): HslaColor {
  const lab = lchToLab(lch);
  const rgb = labToRgb(lab);
  return rgbToHsla(rgb, alpha);
}

// Конвертация LCH в HEX
export function lchToHex(lch: LchColor): HexColor {
  const lab = lchToLab(lch);
  const rgb = labToRgb(lab);
  return rgbToHex(rgb);
}

// Конвертация LCH в HWB
export function lchToHwb(lch: LchColor): HwbColor {
  const lab = lchToLab(lch);
  const rgb = labToRgb(lab);
  return rgbToHwb(rgb);
}

// Конвертация LCH в OKLCH
export function lchToOklch(lch: LchColor): OklchColor {
  const lab = lchToLab(lch);
  const oklab = labToOklab(lab);
  return oklabToOklch(oklab);
}

// Конвертация LCH в OKLAB
export function lchToOklab(lch: LchColor): OklabColor {
  const lab = lchToLab(lch);
  return labToOklab(lab);
}

// Конвертация HEX в RGB
export function hexToRgb(hex: HexColor): RgbColor {
  // Инициализация переменных значениями по умолчанию
  let r = 0, g = 0, b = 0;

  // Удаление символа `#`, если он присутствует
  let _hex = hex.replace(/^#/, '');

  if (_hex.length === 6) {
    // Формат #RRGGBB
    [r, g, b] = [
      parseInt(_hex.slice(0, 2), 16),
      parseInt(_hex.slice(2, 4), 16),
      parseInt(_hex.slice(4, 6), 16)
    ];
  } else if (_hex.length === 3) {
    // Формат #RGB
    [r, g, b] = [
      parseInt(_hex[0] + _hex[0], 16),
      parseInt(_hex[1] + _hex[1], 16),
      parseInt(_hex[2] + _hex[2], 16)
    ];
  } else if (_hex.length === 8) {
    // Формат #AARRGGBB
    [r, g, b] = [
      parseInt(_hex.slice(0, 2), 16),
      parseInt(_hex.slice(2, 4), 16),
      parseInt(_hex.slice(4, 6), 16)
    ];
  } else if (_hex.length === 4) {
    // Формат #ARGB
    [r, g, b] = [
      parseInt(_hex[0] + _hex[0], 16),
      parseInt(_hex[1] + _hex[1], 16),
      parseInt(_hex[2] + _hex[2], 16)
    ];
  } else {
    throw new Error('Invalid HEX color format');
  }

  return { r, g, b };
}

// Конвертация HEX в RGBA
export function hexToRgba(hex: HexColor): RgbaColor {
  let r = 0, g = 0, b = 0, a = 1;

  // Удаление символа `#`, если он присутствует
  let _hex = hex.replace(/^#/, '');

  if (_hex.length === 8) {
    // Формат #AARRGGBB
    [r, g, b, a] = [
      parseInt(_hex.slice(0, 2), 16),
      parseInt(_hex.slice(2, 4), 16),
      parseInt(_hex.slice(4, 6), 16),
      parseInt(_hex.slice(6, 8), 16) / 255
    ];
  } else if (_hex.length === 6) {
    // Формат #RRGGBB
    [r, g, b] = [
      parseInt(_hex.slice(0, 2), 16),
      parseInt(_hex.slice(2, 4), 16),
      parseInt(_hex.slice(4, 6), 16)
    ];
  } else if (_hex.length === 3) {
    // Формат #RGB
    [r, g, b] = [
      parseInt(_hex[0] + _hex[0], 16),
      parseInt(_hex[1] + _hex[1], 16),
      parseInt(_hex[2] + _hex[2], 16)
    ];
  } else if (_hex.length === 4) {
    // Формат #ARGB
    [r, g, b, a] = [
      parseInt(_hex[0] + _hex[0], 16),
      parseInt(_hex[1] + _hex[1], 16),
      parseInt(_hex[2] + _hex[2], 16),
      parseInt(_hex[3] + _hex[3], 16) / 255
    ];
  } else {
    throw new Error('Invalid HEX color format');
  }

  return { r, g, b, a };
}

// Конвертация HEX в HSL
export function hexToHsl(hex: HexColor): HslColor {
  const rgb = hexToRgb(hex);
  return rgbToHsl(rgb);
}

// Конвертация HEX в HSLA
export function hexToHsla(hex: HexColor, alpha: number = 1): HslaColor {
  const rgb = hexToRgb(hex);
  return rgbToHsla(rgb, alpha);
}

// Конвертация HEX в HWB
export function hexToHwb(hex: HexColor): HwbColor {
  const rgb = hexToRgb(hex);
  return rgbToHwb(rgb);
}

// Конвертация HEX в LCH
export function hexToLch(hex: HexColor): LchColor {
  const rgb = hexToRgb(hex);
  const lab = rgbToLab(rgb);
  return labToLch(lab);
}

// Конвертация HEX в OKLCH
export function hexToOklch(hex: HexColor): OklchColor {
  const rgb = hexToRgb(hex);
  const oklab = rgbToOklab(rgb);
  return oklabToOklch(oklab);
}

// Конвертация HEX в LAB
export function hexToLab(hex: HexColor): LabColor {
  const rgb = hexToRgb(hex);
  return rgbToLab(rgb);
}

// Конвертация HEX в OKLAB
export function hexToOklab(hex: HexColor): OklabColor {
  const rgb = hexToRgb(hex);
  return rgbToOklab(rgb);
}

// OKLAB to RGB
export function oklabToRgb(oklab: OklabColor): RgbColor {
  const { l, a, b } = oklab;
  const y = (l + 16) / 116;
  const x = a / 500 + y;
  const z = y - b / 200;
  const rgb = [
    (x * 0.4000 + y * 0.4000 + z * 0.2000) * 255,
    (x * 0.2000 + y * 0.6000 + z * 0.2000) * 255,
    (x * 0.2000 + y * 0.2000 + z * 0.6000) * 255
  ].map(v => Math.round(v));
  return { r: rgb[0], g: rgb[1], b: rgb[2] };
}

// OKLAB to OKLCH
export function oklabToOklch(oklab: OklabColor): OklchColor {
  const { l, a, b } = oklab;
  const c = Math.sqrt(a * a + b * b);
  const h = Math.atan2(b, a) * 180 / Math.PI;
  return { l: l, c: c, h: h >= 0 ? h : h + 360 };
}

// Конвертация OKLAB в RGBA
export function oklabToRgba(oklab: OklabColor, alpha: number = 1): RgbaColor {
  const rgb = oklabToRgb(oklab);
  return { ...rgb, a: alpha };
}

// Конвертация OKLAB в HSL
export function oklabToHsl(oklab: OklabColor): HslColor {
  const rgb = oklabToRgb(oklab);
  return rgbToHsl(rgb);
}

// Конвертация OKLAB в HSLA
export function oklabToHsla(oklab: OklabColor, alpha: number = 1): HslaColor {
  const rgb = oklabToRgb(oklab);
  return rgbToHsla(rgb, alpha);
}

// Конвертация OKLAB в HEX
export function oklabToHex(oklab: OklabColor): HexColor {
  const rgb = oklabToRgb(oklab);
  return rgbToHex(rgb);
}

// Конвертация OKLAB в HWB
export function oklabToHwb(oklab: OklabColor): HwbColor {
  const rgb = oklabToRgb(oklab);
  return rgbToHwb(rgb);
}

// Конвертация OKLAB в LCH
export function oklabToLch(oklab: OklabColor): LchColor {
  const lab = oklabToLab(oklab);
  return labToLch(lab);
}

// Конвертация OKLAB в LAB
export function oklabToLab(oklab: OklabColor): LabColor {
  // Реализация преобразования OKLAB в LAB
  const { l, a, b } = oklab;
  return { l, a, b };
}

// Конвертация OKLCH в RGB
export function oklchToRgb(oklch: OklchColor): RgbColor {
  const oklab = oklchToOklab(oklch);
  return oklabToRgb(oklab);
}

// OKLCH to OKLAB
export function oklchToOklab(oklch: OklchColor): OklabColor {
  const { l, c, h } = oklch;
  const a = Math.cos(h * Math.PI / 180) * c;
  const b = Math.sin(h * Math.PI / 180) * c;
  return { l: l, a: a, b: b };
}

// Конвертация OKLCH в RGBA
export function oklchToRgba(oklch: OklchColor, alpha: number = 1): RgbaColor {
  const oklab = oklchToOklab(oklch);
  const rgb = oklabToRgb(oklab);
  return { ...rgb, a: alpha };
}

// Конвертация OKLCH в HSL
export function oklchToHsl(oklch: OklchColor): HslColor {
  const oklab = oklchToOklab(oklch);
  const rgb = oklabToRgb(oklab);
  return rgbToHsl(rgb);
}

// Конвертация OKLCH в HSLA
export function oklchToHsla(oklch: OklchColor, alpha: number = 1): HslaColor {
  const oklab = oklchToOklab(oklch);
  const rgb = oklabToRgb(oklab);
  return rgbToHsla(rgb, alpha);
}

// Конвертация OKLCH в HEX
export function oklchToHex(oklch: OklchColor): HexColor {
  const oklab = oklchToOklab(oklch);
  const rgb = oklabToRgb(oklab);
  return rgbToHex(rgb);
}

// Конвертация OKLCH в HWB
export function oklchToHwb(oklch: OklchColor): HwbColor {
  const oklab = oklchToOklab(oklch);
  const rgb = oklabToRgb(oklab);
  return rgbToHwb(rgb);
}

// Конвертация OKLCH в LCH
export function oklchToLch(oklch: OklchColor): LchColor {
  const oklab = oklchToOklab(oklch);
  const lab = oklabToLab(oklab);
  return labToLch(lab);
}

// Конвертация OKLCH в LAB
export function oklchToLab(oklch: OklchColor): LabColor {
  const oklab = oklchToOklab(oklch);
  return oklabToLab(oklab);
}

// LAB to RGB
export function labToRgb(lab: LabColor): RgbColor {
  const { l, a, b } = lab;
  const y = (l + 16) / 116;
  const x = a / 500 + y;
  const z = y - b / 200;
  const rgb = [
    (x * 0.4124564 + y * 0.3575761 + z * 0.1804375) * 255,
    (x * 0.2126729 + y * 0.7151522 + z * 0.0721750) * 255,
    (x * 0.0193339 + y * 0.1191920 + z * 0.9503041) * 255
  ].map(v => Math.round(v));
  return { r: rgb[0], g: rgb[1], b: rgb[2] };
}

// LAB to LCH
export function labToLch(lab: LabColor): LchColor {
  const { l, a, b } = lab;
  const c = Math.sqrt(a * a + b * b);
  const h = Math.atan2(b, a) * 180 / Math.PI;
  return { l: l, c: c, h: h >= 0 ? h : h + 360 };
}

// Конвертация LAB в OKLAB
export function labToOklab(lab: LabColor): OklabColor {
  const { l, a, b } = lab;
  // Конвертация с использованием уравнений для преобразования LAB в OKLAB
  const y = (l + 16) / 116;
  const x = a / 500 + y;
  const z = y - b / 200;

  const xNorm = x ** 3;
  const yNorm = y ** 3;
  const zNorm = z ** 3;

  const lOklab = yNorm;
  const aOklab = (xNorm - yNorm) / 0.408;
  const bOklab = (yNorm - zNorm) / 0.5;

  return { l: lOklab, a: aOklab, b: bOklab };
}

// Конвертация LAB в RGBA
export function labToRgba(lab: LabColor, alpha: number = 1): RgbaColor {
  const oklab = labToOklab(lab);
  const rgb = oklabToRgb(oklab);
  return { ...rgb, a: alpha };
}

// Конвертация LAB в HSL
export function labToHsl(lab: LabColor): HslColor {
  const oklab = labToOklab(lab);
  const rgb = oklabToRgb(oklab);
  return rgbToHsl(rgb);
}

// Конвертация LAB в HSLA
export function labToHsla(lab: LabColor, alpha: number = 1): HslaColor {
  const oklab = labToOklab(lab);
  const rgb = oklabToRgb(oklab);
  return rgbToHsla(rgb, alpha);
}

// Конвертация LAB в HEX
export function labToHex(lab: LabColor): HexColor {
  const oklab = labToOklab(lab);
  const rgb = oklabToRgb(oklab);
  return rgbToHex(rgb);
}

// Конвертация LAB в HWB
export function labToHwb(lab: LabColor): HwbColor {
  const oklab = labToOklab(lab);
  const rgb = oklabToRgb(oklab);
  return rgbToHwb(rgb);
}

// Конвертация LAB в OKLCH
export function labToOklch(lab: LabColor): OklchColor {
  const oklab = labToOklab(lab);
  return oklabToOklch(oklab);
}