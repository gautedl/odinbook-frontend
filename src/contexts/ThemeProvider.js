import React, { useState, useEffect } from 'react';
import { ThemeContext } from './ThemeContext';

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(
    localStorage.getItem('globalTheme') || 'light'
  );

  useEffect(() => {
    setTheme(localStorage.getItem('globalTheme') || '');
  }, []);

  return theme === '' ? (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div
        className={`theme--light`}
        data-theme={`theme--${theme}`}
        id="theme-provider"
      >
        {children}
      </div>
    </ThemeContext.Provider>
  ) : (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div
        className={`theme--${theme}`}
        data-theme={`theme--${theme}`}
        id="theme-provider"
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
