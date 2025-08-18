import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top when pathname changes
    // You can choose between these options:
    
    // Option 1: Instant scroll (current)
    // window.scrollTo(0, 0);
    
    // Option 2: Smooth scroll (uncomment if you prefer smooth scrolling)
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    
    // Option 3: Scroll to top with offset (if you have a fixed header)
    // const headerHeight = 80; // Adjust based on your header height
    // window.scrollTo(0, headerHeight);
    
  }, [pathname]);

  return null; // This component doesn't render anything
};

export default ScrollToTop;
