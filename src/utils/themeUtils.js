const THEME_KEY = 'theme';

export const getThemeLocale = () => {
  if (typeof window !== 'undefined') {
    return window.localStorage.getItem(THEME_KEY) || 'dark';
  }
  return 'dark';
};

export const setThemeLocale = () => {
  if (typeof window !== 'undefined') {
    const nextTheme = getThemeLocale() === 'dark' ? 'light' : 'dark';
    window.localStorage.setItem(THEME_KEY, nextTheme);
  }
};

export const applyThemeLocale = () => {
  if (typeof window !== 'undefined') {
    const colorMode = getThemeLocale();
    const rootElement = document.querySelector('html');
    if (colorMode === 'dark') {
      rootElement.classList.add('dark');
    } else {
      rootElement.classList.remove('dark');
    }
  }
};