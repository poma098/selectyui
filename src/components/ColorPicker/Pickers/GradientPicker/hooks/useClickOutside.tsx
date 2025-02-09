import { useEffect } from "react";

export function useClickOutside<T extends HTMLElement>(
  refs: React.RefObject<T>[],
  callback: () => void
) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const isOutside = refs.every(
        (ref) => !ref.current || !ref.current.contains(event.target as Node)
      );

      if (isOutside) {
        callback();
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [refs, callback]);
}
