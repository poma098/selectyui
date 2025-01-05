export type PropsAmplitudeGraph = PropsAmplitudeGraphBarWidth | PropsAmplitudeGraphTargetPoints;

interface PropsAmplitudeGraphBase {
  amplitudes: number[];
  width?: number | string; // Ширина Canvas
  height?: number | string; // Высота Canvas
  roundCorners?: boolean; // Сглаживание углов
  alignment?: "top" | "middle" | "bottom"; // Центрирование графика
  barColor?: string; // Цвет столбиков
  incompleteBarColor?: string; // Цвет для "не достигнутых" столбиков
  gap?: number; // Расстояние между столбиками
  progress?: number; // Прогресс от 0 до 1
  className?: string;
  style?: React.CSSProperties;
}

interface PropsAmplitudeGraphBarWidth extends PropsAmplitudeGraphBase {
  barWidth: number;
  targetPoints?: never;
}

interface PropsAmplitudeGraphTargetPoints extends PropsAmplitudeGraphBase {
  targetPoints: number;
  barWidth?: never;
}