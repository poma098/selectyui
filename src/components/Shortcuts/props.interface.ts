import { ShortcutKey, ShortcutObject } from "../../types/shortcut.interface";

export interface ShortcutsProps {
  shortcutsKey: ShortcutKey;
  shortcutActive: boolean;
}

export interface ShortcutProps {
  shortcutKey: string;
  active?: boolean;
  size: ShortcutSize;
}

export type ShortcutSize = "small" | "medium" | "large";