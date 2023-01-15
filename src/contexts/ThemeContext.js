import { createContext, useContext } from 'react';

export const globalTheme = {
  theme: '',
  setTheme: (t) => {},
};

export const ThemeContext = createContext(globalTheme);

export const useThemeContext = () => useContext(ThemeContext);

globalTheme.theme = localStorage.getItem('globalTheme') || 'light';
globalTheme.setTheme = (t) => {
  globalTheme.theme = t;
  localStorage.setItem('globalTheme', t);
};
