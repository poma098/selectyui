import normalizeAngle from "./normalizeAngle";

const calculateShortestAngle = (from: number, to: number) => {
  const normalizedFrom = normalizeAngle(from);
  const normalizedTo = normalizeAngle(to);
  const diff = normalizedTo - normalizedFrom;

  if (diff > 180) return diff - 360; // Поворачиваем против часовой
  if (diff < -180) return diff + 360; // Поворачиваем по часовой
  return diff; // Кратчайший путь
};

export default calculateShortestAngle;