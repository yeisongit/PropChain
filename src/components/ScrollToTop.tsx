import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { scrollToTopSmooth } from '@/utils/scroll';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // small delay allows layout to update before scrolling
    const id = window.setTimeout(() => scrollToTopSmooth(), 0);
    return () => window.clearTimeout(id);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
