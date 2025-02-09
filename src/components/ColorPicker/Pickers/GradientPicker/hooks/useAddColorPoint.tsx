import { useCallback, RefObject } from "react";
import { ColorStop } from "../../../props.interface";
import { hexToHsla } from "utils/color/convert";
import { HslaColor } from "utils/color/props.interface";

export function useAddColorPoint(
  containerRef: RefObject<HTMLDivElement>,
  width: number,
  colors: ColorStop[] = [],
  onChange?: (
    color: ColorStop[] | ((prevColor: ColorStop[]) => ColorStop[])
  ) => void,
  setFocusedIndex?: (index: number | undefined) => void,
  setSelectedIndex?: (index: number | undefined) => void
) {
  const getRandomColor = useCallback((): HslaColor => {
    return hexToHsla(
      `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")}`
    );
  }, []);

  const addColorPoint = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const position = Math.min(
        Math.max((e.clientX - rect.left) / width, 0),
        1
      );

      const sortedColors = [...colors].sort((a, b) => a.position - b.position);
      let newColor = getRandomColor();

      for (let i = 0; i < sortedColors.length - 1; i++) {
        if (
          sortedColors[i].position <= position &&
          sortedColors[i + 1].position >= position
        ) {
          newColor = sortedColors[i].color;
          break;
        }
      }

      const newColors = [...colors, { color: newColor, position }];
      newColors.sort((a, b) => a.position - b.position);

      onChange?.(newColors);
      
      setFocusedIndex?.(newColors.findIndex((c) => c.position === position));
      setSelectedIndex?.(newColors.findIndex((c) => c.position === position));
    },
    [containerRef, width, colors, onChange, setFocusedIndex, setSelectedIndex, getRandomColor]
  );

  return addColorPoint;
}
