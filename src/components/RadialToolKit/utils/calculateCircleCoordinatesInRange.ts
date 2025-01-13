import { ItemPosition, RadialToolKitCoordinates } from "../props.interface";

function calculateCircleCoordinatesInRange(
  diameter: number,
  totalElements: number,
  elementIndex: number,
  startAngle: number, // Угол начала диапазона в градусах
  endAngle: number // Угол конца диапазона в градусах
): RadialToolKitCoordinates {
  if (totalElements <= 0) {
    throw new Error("Total elements must be greater than 0.");
  }
  if (elementIndex < 0 || elementIndex >= totalElements) {
    throw new Error(
      "Element index must be within the range of total elements."
    );
  }
  if (startAngle >= endAngle) {
    throw new Error("Start angle must be less than end angle.");
  }

  const radius = diameter / 2;

  // Переводим углы из градусов в радианы
  const startAngleRad = (startAngle * Math.PI) / 180;
  const endAngleRad = (endAngle * Math.PI) / 180;

  // Угловой шаг между элементами в указанном диапазоне
  const angleStep = (endAngleRad - startAngleRad) / (totalElements - 1);

  // Угол для текущего элемента
  const angle = startAngleRad + elementIndex * angleStep;

  // Переводим углы обратно в градусы
  const angleDegrees = parseFloat(((angle * 180) / Math.PI + 90).toFixed(1));

  const x = radius * Math.cos(angle) + diameter / 2;
  const y = radius * Math.sin(angle) + diameter / 2;

  let position: ItemPosition = "top";

  if (angleDegrees === 0) {
    position = "top";
  } else if (angleDegrees > 0 && angleDegrees < 180) {
    position = "right";
  } else if (angleDegrees == 180) {
    position = "bottom";
  } else if (angleDegrees > 180 && angleDegrees < 360) {
    position = "left";
  }

  return { x, y, angle: angleDegrees, position };
}

export default calculateCircleCoordinatesInRange;