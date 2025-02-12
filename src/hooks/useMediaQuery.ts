import { useEffect, useState } from 'react';

export default function useMediaQuery(query: string) {
  const [isMatch, setIsMatch] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    setIsMatch(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => setIsMatch(e.matches);

    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [query]);

  return isMatch;
}
