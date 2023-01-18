import React from 'react';
import { useThemeContext } from '../../contexts/ThemeContext';
// import '../styles/general.scss';

export default function ThemeSetter() {
  const { theme, setTheme } = useThemeContext();

  const switchTheme = (e) => {
    e.preventDefault();
    const currentTheme = document
      .getElementById('theme-provider')
      .getAttribute('data-theme');

    if (currentTheme === 'theme--light') {
      setTheme('dark');
      localStorage.setItem('globalTheme', 'dark');
    } else {
      setTheme('light');
      localStorage.setItem('globalTheme', 'light');
    }
  };

  return (
    <>
      <button className="input-toggle" id="settings" onClick={switchTheme}>
        Switch theme
      </button>

      {theme === '' ? (
        <label className={`light`} htmlFor="settings" />
      ) : (
        <label className={`${theme}`} htmlFor="settings" />
      )}
    </>
  );
}
