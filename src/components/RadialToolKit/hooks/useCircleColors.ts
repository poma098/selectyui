import { useMemo } from "react";
import { HexColor, hexToHsl, hslToHex } from "utils";

export const useCircleColors = (baseColor: HexColor): HexColor[] => {
  const colors = useMemo(
    () => [
      (hslToHex(hexToHsl(baseColor)) + "40") as HexColor,
      (hslToHex(hexToHsl(baseColor)) + "00") as HexColor,
    ],
    [baseColor]
  );

  return colors;
};
