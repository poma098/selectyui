import { useEffect, useCallback, RefObject } from "react";
import calculateCircleCoordinatesInRange from "../utils/calculateCircleCoordinatesInRange";
import { PropsRadialToolKit, RadialToolKitItem } from "../props.interface";


interface UseRadialToolkitHandlersProps {
  items: RadialToolKitItem[];
  limit: PropsRadialToolKit["limit"];
  circleOuterSize: PropsRadialToolKit["circleOuterSize"];
  containerRef: RefObject<HTMLDivElement>;
  activeIndex: number;
  setRotationAngle: (angle: number) => void;
  setSelectedIndex: (index: number | undefined) => void;
  onClick?: PropsRadialToolKit["onClick"];
  onClickMore?: PropsRadialToolKit["onClickMore"];
}

const useRadialToolkitHandlers = ({
  items,
  limit,
  circleOuterSize,
  containerRef,
  activeIndex,
  setRotationAngle,
  setSelectedIndex,
  onClick,
  onClickMore,
}: UseRadialToolkitHandlersProps) => {
  // Обработчик движения мыши
  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const mouseX = event.clientX;
      const mouseY = event.clientY;

      // Вычисляем угол поворота
      let angle =
        (Math.atan2(mouseY - centerY, mouseX - centerX) * 180) / Math.PI + 90;
      setRotationAngle(angle);
    },
    [containerRef, setRotationAngle]
  );

  // Обработчик нажатия клавиши или клика
  const handleKeyPressOrClick = useCallback(
    (event: KeyboardEvent | MouseEvent) => {
      const isKeyPress = event instanceof KeyboardEvent;
      const isClick = event instanceof MouseEvent && event.button === 0;

      let findIndex = -1;

      if (isKeyPress) {
        const key = event.key;
        findIndex = items
          .slice(0, limit)
          .findIndex(
            (item) => item.button?.toUpperCase() === key.toUpperCase()
          );
      } else if (isClick) {
        findIndex = Math.min(activeIndex, limit);
      }

      if (findIndex !== -1) {
        // Координаты выбранного элемента
        const coordinates = calculateCircleCoordinatesInRange(
          circleOuterSize,
          limit < items.length ? limit + 2 : items.length + 1,
          findIndex,
          -90,
          270
        );

        const selectedItem = items.slice(0, limit ?? items.length)?.[findIndex];

        setRotationAngle(coordinates.angle);

        if (selectedItem) {
          event.stopPropagation();
          event.preventDefault();

          if (onClick) {
            const shouldProceed = onClick(selectedItem) ?? true;
            if (!shouldProceed) return;
          }

          setSelectedIndex(findIndex);
          selectedItem.callback?.(selectedItem, findIndex, coordinates);
        } else if (findIndex === limit && onClickMore) {
          event.stopPropagation();
          event.preventDefault();

          const moreItems = items.slice(limit).map((item) => ({
            icon: item.icon,
            label: item.label,
            callback: item.callback,
          }));

          const shouldProceed = onClickMore(moreItems) ?? true;
          if (!shouldProceed) return;

          setSelectedIndex(-1);
        }
      }
    },
    [
      items,
      limit,
      circleOuterSize,
      activeIndex,
      setRotationAngle,
      setSelectedIndex,
      onClick,
      onClickMore,
    ]
  );

  // Эффект для привязки обработчиков событий
  useEffect(() => {
    document.body.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("keypress", handleKeyPressOrClick);
    document.body.addEventListener("click", handleKeyPressOrClick);

    return () => {
      document.body.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("keypress", handleKeyPressOrClick);
      document.body.removeEventListener("click", handleKeyPressOrClick);
    };
  }, [handleMouseMove, handleKeyPressOrClick]);

  return {
    handleMouseMove,
    handleKeyPressOrClick,
  };
};

export default useRadialToolkitHandlers;
