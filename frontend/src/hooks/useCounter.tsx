import { useState, useEffect } from 'react';

type Props = {
  initialCount?: number;
  maxCount: number;
};

export const useCounter = ({ initialCount = 0, maxCount }: Props) => {
  const [count, setCount] = useState(initialCount);

  useEffect(() => {
    const duration = 1500; // 2 seconds
    const totalSteps = maxCount - initialCount;
    const intervalDuration = duration / totalSteps;

    const interval = setInterval(() => {
      setCount((prevCount) => {
        const nextCount = prevCount + 1;
        if (nextCount > maxCount) {
          clearInterval(interval);
          return maxCount;
        }
        return nextCount;
      });
    }, intervalDuration);

    return () => clearInterval(interval);
  }, [initialCount, maxCount]);

  return {
    count,
  };
};