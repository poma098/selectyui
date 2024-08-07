import { osName } from "react-device-detect";
import { ShortcutProps } from "./props.interface";
import Style from "./style.module.css";
import React from "react";

function replaceKey(key: string) {
  return key.toLowerCase().replace("alt", "⌥").replace("ctrl", "⌃")
}

function Shortcut({ shortcutKey, active = false, size = "medium" }: ShortcutProps) {
  const splitKey = shortcutKey.split("+");
  const infoDevice = osName;
  const isMac = infoDevice === "Mac OS";

  return (
    <div className={Style.elementShortcut} data-size={size}>
      {splitKey.map((k, i) => {
        if (i < splitKey.length - 1) {
          return (
            <React.Fragment key={i}>
              <kbd className={Style.elementShortcutKey} data-active={active} data-size={size}>
                {k.length > 1 ? (isMac ? replaceKey(k) : k) : k.toUpperCase()}
              </kbd>
              <span className={Style.elementShortcutPlus} data-size={size}>
                +
              </span>
            </React.Fragment>
          );
        } else {
          return (
            <kbd
              key={i}
              className={Style.elementShortcutKey}
              data-active={active}
              data-size={size}
            >
              {k.length > 1 ? (isMac ? replaceKey(k) : k) : k.toUpperCase()}
            </kbd>
          );
        }
      })}
    </div>
  );
}

export default Shortcut;
