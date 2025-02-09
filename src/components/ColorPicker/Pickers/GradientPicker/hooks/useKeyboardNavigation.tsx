import { useCallback, useEffect } from "react";
import { ColorStop } from "../../../props.interface";

export function useKeyboardNavigation(
  focusedIndex: number | undefined,
  colors: ColorStop[],
  setFocusedIndex: (index: number | undefined) => void,
  setSelectedIndex?: (index: number | undefined) => void,
  onChange?: (
    color: ColorStop[] | ((prevColor: ColorStop[]) => ColorStop[])
  ) => void,
  disabled?: boolean
) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (focusedIndex !== undefined) {
        const updatedColors = [...colors];

        switch (e.key) {
          case "Delete":
          case "Backspace":
            if (disabled) break;
            updatedColors.splice(focusedIndex, 1);
            setFocusedIndex(undefined);
            setSelectedIndex?.(undefined);
            break;

          case "Escape":
            setFocusedIndex(undefined);
            setSelectedIndex?.(undefined);
            break;

          case "ArrowLeft":
            if (disabled) break;
            updatedColors[focusedIndex].position = Math.max(
              updatedColors[focusedIndex].position - 0.01,
              0
            );
            break;

          case "ArrowRight":
            if (disabled) break;
            updatedColors[focusedIndex].position = Math.min(
              updatedColors[focusedIndex].position + 0.01,
              1
            );
            break;

          default:
            return;
        }

        onChange?.(updatedColors);
      }
    },
    [focusedIndex, colors, onChange, setFocusedIndex, setSelectedIndex]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);
}
