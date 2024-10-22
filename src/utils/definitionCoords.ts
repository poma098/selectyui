import {
  DefinitionCoords,
  DropDownMenuPosition,
} from "../types/definitionCoords.interface";

export const PADDING_X = -2;
export const PADDING_Y = -2;

/**
 * Вычисляет координаты элемента относительно viewport.
 *
 * @param {HTMLElement} element - Элемент, относительно которого вычисляются координаты.
 * @param {HTMLElement} item - Элемент, для которого вычисляются координаты.
 * @param {DropDownMenuPosition} [position="auto"] - Позиция выпадающего меню.
 * @return
 */
export function definitionCoords(
  item: HTMLElement,
  parent: HTMLElement,
  position: DropDownMenuPosition = "auto",
  order?: DropDownMenuPosition[],
): DefinitionCoords {
  const itemRect = item.getBoundingClientRect();
  const parentRect = parent.getBoundingClientRect();
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  let x = 0;
  let y = 0;
  const widthItem = itemRect.width;
  const heightItem = itemRect.height;
  const widthParent = parentRect.width;
  const heightParent = parentRect.height;

  let returnPosition = position;

  function fitsInViewport(x: number, y: number) {
    return (
      x >= 0 &&
      y >= 0 &&
      x + itemRect.width <= viewportWidth &&
      y + itemRect.height <= viewportHeight
    );
  }

  switch (position) {
    case "right-top": {
      x = parentRect.right - PADDING_X;
      y = parentRect.top + PADDING_Y;
      returnPosition = position;
      break;
    }
    case "right-center": {
      x = parentRect.right - PADDING_X;
      y = parentRect.top + parentRect.height / 2 - itemRect.height / 2;
      returnPosition = position;
      break;
    }
    case "right-bottom": {
      x = parentRect.right - PADDING_X;
      y = parentRect.bottom - itemRect.height - PADDING_Y;
      returnPosition = position;
      break;
    }
    case "left-top": {
      x = parentRect.left - itemRect.width + PADDING_X;
      y = parentRect.top + PADDING_Y;
      returnPosition = position;
      break;
    }
    case "left-center": {
      x = parentRect.left - itemRect.width + PADDING_X;
      y = parentRect.top + parentRect.height / 2 - itemRect.height / 2;
      returnPosition = position;
      break;
    }
    case "left-bottom": {
      x = parentRect.left - itemRect.width + PADDING_X;
      y = parentRect.bottom - itemRect.height - PADDING_Y;
      returnPosition = position;
      break;
    }
    case "center-bottom": {
      x = parentRect.left + parentRect.width / 2 - itemRect.width / 2;
      y = parentRect.bottom - PADDING_Y;
      returnPosition = position;
      break;
    }
    case "center-top": {
      x = parentRect.left + parentRect.width / 2 - itemRect.width / 2;
      y = parentRect.top - itemRect.height + PADDING_Y;
      returnPosition = position;
      break;
    }
    case "bottomOrTop": {
      const bottomY = parentRect.bottom - PADDING_Y;
      const topY = parentRect.top - itemRect.height + PADDING_Y;
      const centerX = parentRect.left + parentRect.width / 2 - itemRect.width / 2;

      if (fitsInViewport(centerX, bottomY)) {
        x = centerX;
        y = bottomY;
        returnPosition = "center-bottom";
      } else if (fitsInViewport(centerX, topY)) {
        x = centerX;
        y = topY;
        returnPosition = "center-top";
      } else {
        // Если ни одна из предпочтительных позиций не подходит, оставляем последнюю проверенную
        x = centerX;
        y = bottomY; // Или какое-либо безопасное значение по умолчанию
        returnPosition = "center-bottom";
      }
      break;
    }
    case "topOrBottom": {
      const topY = parentRect.top - itemRect.height + PADDING_Y;
      const bottomY = parentRect.bottom - PADDING_Y;
      const centerX = parentRect.left + parentRect.width / 2 - itemRect.width / 2;

      if (fitsInViewport(centerX, topY)) {
        x = centerX;
        y = topY;
        returnPosition = "center-top";
      } else if (fitsInViewport(centerX, bottomY)) {
        x = centerX;
        y = bottomY;
        returnPosition = "center-bottom";
      } else {
        // Если ни одна из предпочтительных позиций не подходит, оставляем последнюю проверенную
        x = centerX;
        y = topY; // Или какое-либо безопасное значение по умолчанию
        returnPosition = "center-top";
      }
      break;
    }
    case "topOrBottomLeft": {
      const topY = parentRect.top - itemRect.height + PADDING_Y;
      const bottomY = parentRect.bottom - PADDING_Y;
      const leftX = parentRect.left;

      if (fitsInViewport(leftX, topY)) {
        x = leftX;
        y = topY;
        returnPosition = "left-top";
      } else if (fitsInViewport(leftX, bottomY)) {
        x = leftX;
        y = bottomY;
        returnPosition = "left-bottom";
      } else {
        // Проверяем позиции, которые меньше всего выходят за границы экрана
        const overflowTop = Math.max(0, -topY);
        const overflowBottom = Math.max(
          0,
          bottomY + itemRect.height - viewportHeight
        );

        if (overflowTop <= overflowBottom) {
          x = leftX;
          y = Math.max(topY, 0); // В случае выхода за верхнюю границу, корректируем позицию
          returnPosition = "left-top";
        } else {
          x = leftX;
          y = Math.min(bottomY, viewportHeight - itemRect.height); // В случае выхода за нижнюю границу, корректируем позицию
          returnPosition = "left-bottom";
        }
      }
      break;
    }
    case "bottomOrTopLeft": {
      const bottomY = parentRect.bottom - PADDING_Y;
      const topY = parentRect.top - itemRect.height + PADDING_Y;
      const leftX = parentRect.left;

      if (fitsInViewport(leftX, bottomY)) {
        x = leftX;
        y = bottomY;
        returnPosition = "left-bottom";
      } else if (fitsInViewport(leftX, topY)) {
        x = leftX;
        y = topY;
        returnPosition = "left-top";
      } else {
        // Проверяем позиции, которые меньше всего выходят за границы экрана
        const overflowBottom = Math.max(
          0,
          bottomY + itemRect.height - viewportHeight
        );
        const overflowTop = Math.max(0, -topY);

        if (overflowBottom <= overflowTop) {
          x = leftX;
          y = Math.min(bottomY, viewportHeight - itemRect.height); // В случае выхода за нижнюю границу, корректируем позицию
          returnPosition = "left-bottom";
        } else {
          x = leftX;
          y = Math.max(topY, 0); // В случае выхода за верхнюю границу, корректируем позицию
          returnPosition = "left-top";
        }
      }
      break;
    }
    case "auto": {
      const positions = [
        {
          pos: "right-top",
          x: parentRect.right - PADDING_X,
          y: parentRect.top + PADDING_Y,
        },
        {
          pos: "right-bottom",
          x: parentRect.right - PADDING_X,
          y: parentRect.bottom - itemRect.height - PADDING_Y,
        },
        {
          pos: "left-top",
          x: parentRect.left - itemRect.width + PADDING_X,
          y: parentRect.top + PADDING_Y,
        },
        {
          pos: "left-bottom",
          x: parentRect.left - itemRect.width + PADDING_X,
          y: parentRect.bottom - itemRect.height - PADDING_Y,
        },
        {
          pos: "center-bottom",
          x: parentRect.left + parentRect.width / 2 - itemRect.width / 2,
          y: parentRect.bottom - PADDING_Y,
        },
        {
          pos: "center-top",
          x: parentRect.left + parentRect.width / 2 - itemRect.width / 2,
          y: parentRect.top - itemRect.height + PADDING_Y,
        },
        {
          pos: "left-center",
          x: parentRect.left - itemRect.width + PADDING_X,
          y: parentRect.top + parentRect.height / 2 - itemRect.height / 2,
        },
        {
          pos: "right-center",
          x: parentRect.right + PADDING_X,
          y: parentRect.top + parentRect.height / 2 - itemRect.height / 2,
        },
      ];

      if (order && order.length > 0) {
        // order это массив с позициями, которые нужно поднять вверх в массиве positions
        const positionPriority = new Map(order.map((p, index) => [p, index]));
        positions.sort((a, b) => {
          const priorityA =
            positionPriority.get(a.pos as DropDownMenuPosition) ?? Infinity;
          const priorityB =
            positionPriority.get(b.pos as DropDownMenuPosition) ?? Infinity;
          return priorityA - priorityB;
        });
      }

      for (const { pos: position, x: posX, y: posY } of positions) {
        if (fitsInViewport(posX, posY)) {
          x = posX;
          y = posY;
          returnPosition = position as DropDownMenuPosition;
          break;
        }
      }

      // Найти все фиксированные предки
      const fixedAncestors = findFixedAncestors(parent);
      const countFixedAncestors = fixedAncestorsUniqueClasses(fixedAncestors);

      if (countFixedAncestors > 1) {
        const { x: _x, y: _y } = positionFixedElement(item, x, y);

        switch (returnPosition) {
          case "right-top":
            x = _x;
            y = _y + 12;
            break;
          case "right-bottom":
            x = _x;
            y = _y + 8;
            break;
          case "left-top":
            x = _x;
            y = _y + 12;
            break;
          case "left-bottom":
            x = _x;
            y = _y + 8;
            break;
          case "center-bottom":
            x = _x;
            y = _y + 6;
            break;
          case "center-top":
            x = _x;
            y = _y + 10;
            break;
        }
      }

      break;
    }
  }

  return {
    x,
    y,
    widthItem,
    heightItem,
    widthParent,
    heightParent,
    position: returnPosition,
  };
}

// Функция для нахождения всех фиксированных предков
export const findFixedAncestors = (
  element: HTMLElement | null,
): HTMLElement[] => {
  let fixedAncestors: HTMLElement[] = [];
  let currentElement = element;

  while (currentElement && currentElement !== document.documentElement) {
    const position = window.getComputedStyle(currentElement).position;
    if (position === "fixed") {
      fixedAncestors.push(currentElement);
    }
    currentElement = currentElement.parentElement;
  }  

  return fixedAncestors.reverse();
};

/**
 * Функция для нахождения всех фиксированных предков элемента
 * и удаления дубликатов по классам.
 * 
 * @param {HTMLElement | null} element - Элемент, для которого находятся фиксированные предки.
 * @return {HTMLElement[]} Массив уникальных фиксированных предков.
 */
export const findFixedAncestors2 = (
  element: HTMLElement | null,
): HTMLElement[] => {
  let fixedAncestors: HTMLElement[] = [];
  let currentElement = element;

  // Множество для отслеживания уникальных классов
  const uniqueClasses = new Set<string>();

  while (currentElement && currentElement !== document.documentElement) {
    const position = window.getComputedStyle(currentElement).position;
    if (position === "fixed") {
      // Получаем список классов элемента
      const classes = currentElement.className.split(/\s+/);

      // Проверяем, есть ли уже такие классы в множестве
      const hasUniqueClasses = classes.some(cls => {
        if (uniqueClasses.has(cls)) {
          return false;
        }
        uniqueClasses.add(cls);
        return true;
      });

      // Если хотя бы один класс уникален, добавляем элемент в результат
      if (hasUniqueClasses) {
        fixedAncestors.push(currentElement);
      }
    }
    currentElement = currentElement.parentElement;
  }

  return fixedAncestors;
};
function fixedAncestorsUniqueClasses(fixedAncestors: HTMLElement[]): number {
  const uniqueClasses = new Set<string>();
  for (const ancestor of fixedAncestors) {
    const classes = ancestor.className.split(/\s+/);
    for (const cls of classes) {
      if (uniqueClasses.has(cls)) {
        continue;
      }
      if (cls) uniqueClasses.add(cls);
    }
  }

  return uniqueClasses.size;
}

export function positionFixedElement(
  element: HTMLElement,
  x: number,
  y: number
): {
  x: number,
  y: number
} {
  // Проверяем, что элемент имеет position: fixed
  const style = getComputedStyle(element);
  if (style.position !== "fixed") {
    console.error("Element must have position: fixed");
    return {
      x: Infinity,
      y: Infinity,
    }
  }

  // Получаем начальные координаты элемента относительно окна
  const rect = element.getBoundingClientRect();

  // Получаем текущие смещения элемента
  const currentLeft = rect.left;
  const currentTop = rect.top;

  // Рассчитываем разницу
  const deltaX = x - currentLeft;
  const deltaY = y - currentTop;

  // Перемещаем элемент, учитывая смещения
  return {
    x: element.offsetLeft + deltaX,
    y: element.offsetTop + deltaY,
  };
}