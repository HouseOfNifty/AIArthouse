import { useEffect, useState, useRef } from 'react';

export function useOnScreen(ref, threshold = 0.25) {
  const [isOnScreen, setIsOnScreen] = useState(false);
  const observerRef = useRef(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(([entry]) =>{
      setIsOnScreen(entry.isIntersecting)}, 
      {threshold: threshold}
    );
  }, []);

  useEffect(() => {
    observerRef.current.observe(ref.current);

    return () => {
      observerRef.current.disconnect();
    };
  }, [ref]);

  return isOnScreen;
}