const normalizeAngle = (angle: number) => ((angle % 360) + 360) % 360; // Угол в диапазоне [0, 360)

export default normalizeAngle;