import { useState, useEffect } from 'react';
import throttle from 'lodash.throttle';

const noop = () => { };

const useResize = () => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const scope = typeof window !== 'undefined'
    ? window
    : {
      innerWidth: 0,
      innerHeight: 0,
      addEventListener: noop,
      requestAnimationFrame: noop,
      removeEventListener: noop,
    };
  const [size, setSize] = useState({
    width: scope?.innerWidth,
    height: scope?.innerHeight,
  });
  useEffect(() => {
    const listener = throttle(() => scope?.requestAnimationFrame(() => setSize({
      width: scope?.innerWidth,
      height: scope?.innerHeight,
    })), 1000 / 60);
    scope?.addEventListener('resize', listener, { passive: true });
    return () => scope?.removeEventListener('resize', listener);
    // return () => scope?.removeEventListener('resize', listener, { passive: true });
  }, [setSize, scope]);
  return size;
};
export default useResize;
