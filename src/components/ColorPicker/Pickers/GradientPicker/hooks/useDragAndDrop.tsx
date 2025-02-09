import { useCallback, useEffect, useState, RefObject } from "react";
import { ColorStop } from "../../../props.interface";

export function useDragAndDrop<T extends HTMLElement>(
  containerRef: RefObject<T>,
  width: number,
  colors: ColorStop[],
  onChange?: (
    color: ColorStop[] | ((prevColor: ColorStop[]) => ColorStop[])
  ) => void,
  setSelectedIndex?: (index: number | undefined) => void
) {
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const [isHidden, setIsHidden] = useState<boolean>(false);
  const [initialY, setInitialY] = useState<number | null>(null);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (draggingIndex !== null && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const position = Math.min(
          Math.max((e.clientX - rect.left) / width, 0),
          1
        );

        const updatedColors = [...colors];
        updatedColors[draggingIndex] = {
          ...updatedColors[draggingIndex],
          position,
        };

        // Проверяем смещение вниз
        if (initialY !== null) {
          const deltaY = e.clientY - initialY;
          if (deltaY > 17 + 5) {
            setIsHidden(true); // Скрываем цвет
          } else {
            setIsHidden(false); // Восстанавливаем
          }
        }

        onChange?.(updatedColors);
      }
    },
    [draggingIndex, colors, width, onChange, containerRef, initialY]
  );

  const handleMouseUp = useCallback((e: MouseEvent) => {
    if (isHidden && draggingIndex !== null) {
      // Если элемент скрыт при отпускании — удаляем его
      onChange?.((prev) => prev.filter((_, index) => index !== draggingIndex));
    }
    setDraggingIndex(null);
    setIsHidden(false);
    setInitialY(null);

    if (e.target === containerRef.current) {
      setSelectedIndex?.(undefined);
    }
  }, [isHidden, draggingIndex, onChange, setSelectedIndex]);

  const handleMouseDown = useCallback(
    (index: number, e: React.MouseEvent<HTMLDivElement>) => {
      setDraggingIndex(index);
      setInitialY(e.clientY);
    },
    []
  );

  useEffect(() => {
    if (draggingIndex !== null) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [draggingIndex, handleMouseMove, handleMouseUp]);

  return { draggingIndex, setDraggingIndex, handleMouseDown, isHidden };
}
