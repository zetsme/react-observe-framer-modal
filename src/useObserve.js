import { useEffect, useRef, useState } from 'react';

const useObserve = (callback) => {
  const [observingElement, setObservingElement] = useState(null);

  const observer = useRef(
    new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting) {
          callback();
        }
      },
      { threshold: 1 }
    )
  );

  useEffect(() => {
    const currentElement = observingElement;
    const currentObserver = observer.current;
    if (currentElement) {
      currentObserver.observe(currentElement);
    }
    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement);
      }
    };
  }, [observingElement]);

  return { setObservingElement };
};

export default useObserve;
