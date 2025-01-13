import { useEffect, useRef } from "react";

const useAnimationFrame = (callback: () => void, deps: any[]) => {
  const savedCallback = useRef(callback);

  // Обновляем ссылку на callback, чтобы избежать зависимости от функции
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    let animationFrameId: number;

    const loop = () => {
      savedCallback.current(); // Вызываем последнюю версию callback
      animationFrameId = requestAnimationFrame(loop);
    };

    loop();
    return () => cancelAnimationFrame(animationFrameId);
  }, deps); // Указываем зависимости
};


export default useAnimationFrame;