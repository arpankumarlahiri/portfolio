import { useState, useEffect } from 'react';

interface dimensions {
    width: number;
    height: number;
  }

function getWindowDimensions():dimensions {
  if (typeof window === 'undefined')
    return {
      width: 0,
      height: 0,
    };
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState<dimensions>(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}