import { useEffect, useState } from "react";

export const BREAKPOINTS = {
  small: '@media only screen and (max-width: 599px)',
  large: '@media only screen and (min-width: 600px)',
};

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 600);
    };
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile;
}
