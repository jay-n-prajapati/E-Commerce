import { useEffect, useState } from 'react';

const useTheme = () => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    if (theme === 'dark') {
      setTheme('light');
      localStorage.setItem('theme', 'light');
      document.documentElement.classList.toggle('dark');
    } else {
      setTheme('dark');
      localStorage.setItem('theme', 'dark');
      document.documentElement.classList.toggle('dark');
    }
  };

  useEffect(() => {
    const localTheme = localStorage.getItem('theme');
    if (localTheme) {
      setTheme(localTheme);
      document.documentElement.classList.add(localTheme);
    }
  }, []);

  return { theme, toggleTheme };
};

export default useTheme;
