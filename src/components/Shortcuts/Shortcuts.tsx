import React from "react";
import { ShortcutsProps } from "./props.interface";
import { Shortcut } from "./shortcut";
import Style from "./style.module.css";

function Shortcuts({ shortcutsKey, shortcutActive = false }: ShortcutsProps) {
  if (Array.isArray(shortcutsKey)) {
    return (
      <div className={Style.container}>
        {shortcutsKey.map((k, i) => (
          <Shortcut key={i} shortcutKey={k} active={shortcutActive} size="small" />
        ))}
      </div>
    );
  } else {
    return <Shortcut shortcutKey={shortcutsKey} active={shortcutActive} size="small" />;
  }
}

export { Shortcuts }