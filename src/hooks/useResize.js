import { useState, useEffect } from 'react';
import throttle from 'lodash.throttle';

const useResize = () => {
  const scope = typeof window !== 'undefined' ? window : {};
  const [size, setSize] = useState({
    width: scope?.innerWidth,
    height: scope?.innerHeight,
  });
  useEffect(() => {
    const opts = { passive: true };
    const listener = throttle(() => scope?.requestAnimationFrame(() => setSize({
      width: scope?.innerWidth,
      height: scope?.innerHeight,
    })), 1000 / 60);
    scope?.addEventListener('resize', listener, opts);
    return () => scope?.removeEventListener('resize', listener, opts);
  }, [setSize]);
  return size;
};
export default useResize;
