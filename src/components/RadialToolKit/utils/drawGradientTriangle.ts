function drawGradientSector(
  ctx: CanvasRenderingContext2D,
  angle: number,
  rotation: number,
  colors: string[]
): void {
  const devicePixelRatio = window.devicePixelRatio || 1;
  const canvas = ctx.canvas;
  const centerX = canvas.width / (2 * devicePixelRatio);
  const centerY = canvas.height / (2 * devicePixelRatio);

  const radius = Math.sqrt(Math.pow(centerX, 2) + Math.pow(centerY, 2)); // Радиус до края Canvas

  // Угол в радианах
  const angleRadians = (angle * Math.PI) / 180;
  const rotationRadians =
    (rotation * Math.PI) / 180 - angleRadians / 2 - Math.PI / 2;

  // Создание радиального градиента
  const gradient = ctx.createRadialGradient(
    centerX,
    centerY,
    0,
    centerX,
    centerY,
    radius
  );
  const colorStops = 1 / (colors.length - 1);
  colors.forEach((color, index) => {
    gradient.addColorStop(index * colorStops, color);
  });

  // Рисование сектора круга
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.moveTo(centerX, centerY); // Начало в центре круга
  ctx.arc(
    centerX,
    centerY,
    radius,
    rotationRadians,
    rotationRadians + angleRadians
  );
  ctx.closePath();
  ctx.fill();
}

export default drawGradientSector;
