'use client'

import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({children}) => {
    const [theme, setTheme] = useState('dark');

      useEffect(() => {
        localStorage.setItem('PAGE_THEME', JSON.stringify(theme));
      }, [theme]);

    return (
        <ThemeContext.Provider value={{
            theme,
            toggleTheme: () => setTheme(theme === 'dark' ? 'light' : 'dark'),
        }}>
            {children}
        </ThemeContext.Provider>
    )
};

export const useTheme = () => useContext(ThemeContext);