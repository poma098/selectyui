export type DropDownMenuPosition =
  | "left-bottom"
  | "right-bottom"
  | "center-bottom"
  | "left-top"
  | "right-top"
  | "center-top"
  | "left-center"
  | "right-center"
  | "bottomOrTop"
  | "topOrBottom"
  | "topOrBottomLeft"
  | "bottomOrTopLeft"
  | "auto";

export interface DefinitionCoords {
  x: number;
  y: number;
  widthParent: number;
  heightParent: number;
  widthItem: number;
  heightItem: number;
  position: DropDownMenuPosition;
}
