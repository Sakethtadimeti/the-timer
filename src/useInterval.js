import { useEffect, useRef } from "react";
const useInterval = (callback, delay) => {
  const savedCallBack = useRef(null);
  const intervalRef = useRef(null);
  useEffect(() => {
    savedCallBack.current = callback;
  });
  useEffect(() => {
    const tick = () => savedCallBack.current();
    intervalRef.current = setInterval(() => {
      tick();
    }, delay);
    () => clearInterval(id);
  }, []);
  return intervalRef.current;
};
export default useInterval;
