import { useEffect, useState } from "react";

export const useCountdown = (time) => {
  const [countDown, setCountDown] = useState(time);
  const reset = () => setCountDown(time);

  useEffect(() => {
    if (countDown > 0) {
      const interval = setInterval(() => {
        setCountDown(countDown - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [countDown]);

  return { ...getReturnValues(countDown), reset };
};

const getReturnValues = (countDown) => {
  let minutes= Math.floor(countDown / 60);
  let seconds= Math.floor(countDown % 60);

  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  return { minutes, seconds };
};
