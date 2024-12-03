export function debounce(func: Function, wait: number) {
  let timeout: NodeJS.Timeout | null;
  const debounced = function (...args: any[]) {
    if (timeout) clearTimeout(timeout);
    //@ts-ignore
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
  debounced.cancel = () => {
    if (timeout) clearTimeout(timeout);
    timeout = null;
  };
  return debounced;
}