import { useState, useEffect, useRef } from 'react';

export default function useLockBodyScroll(initLocked = true) {
  const [locked, setLocked] = useState(initLocked);
  const originalStyle = useRef(null);

  useEffect(() => {
    originalStyle.current = window.getComputedStyle(document.body).overflow;
    return () => {
      document.body.style.overflow = originalStyle.current;
    };
  }, []);

  useEffect(() => {
    if (locked) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = originalStyle.current;
    }
  }, [locked]);

  return [locked, () => setLocked((locked) => !locked)];
}