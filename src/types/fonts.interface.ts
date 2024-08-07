export interface Font {
  weight: number;
  style: 'normal' | 'italic';
  fontFile: string;
  fontFamily?: string; // Сделаем fontFamily необязательным
}

export interface Fonts {
  [key: string]: Font[];
}