import "../styles/globals.css";
import type { AppProps } from "next/app";
import Container from "../store";
import React, { createContext, useState } from 'react';
import ReactSwitch from 'react-switch';


export const ThemeContext = createContext(null);

function MyApp({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
      setTheme((curr) => (curr === 'light' ? 'dark' : 'light'));
  };
  
  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      <div id={theme}>
        <Container>
            <div className='switch_color'>
              <label>{theme === 'light' ? 'Light Mode' : 'Dark Mode'}</label>
              <ReactSwitch onChange={toggleTheme} checked={theme === 'dark'}/>
            </div>
          <Component {...pageProps} />
        </Container>
      </div>
    </ThemeContext.Provider>
  );
}

export default MyApp;
