import { useEffect } from "react";
import { Shortcut } from "../types/shortcut.interface";

const useKeyboardShortcuts = (shortcuts: Shortcut[]) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      shortcuts.forEach(({ key, callback }) => {
        if (event.key === key) {
          callback(event, shortcuts);
        }
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [shortcuts]);
};

export default useKeyboardShortcuts;
