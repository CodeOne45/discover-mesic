import { useState, useEffect, createContext } from 'react';
import { useRouter } from 'next/router';
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Container from "../store";
import { useTranslation, LanguageSwitcher } from 'next-export-i18n';
import useWindowSize from '../helpers/useWindowSize'

import { ThemeProvider } from "next-themes";

import Head from 'next/head'
import NotAvalable from '../components/app-available/NotAvalable';

import ReactSwitch from 'react-switch';
//import Head from "next/head";
import PreloaderComp from '../components/preloader/preloaderComp';

import {userService} from '../services/user.service';

export const ThemeContext = createContext(null);


function MyApp({ Component, pageProps, width }: AppProps) {

  //const [theme, setTheme] = useState('light');
  const size = useWindowSize();    


  useEffect(() => {
    if (width < 768) {
      setIsMobile(true);
    }
  }, [width]);


  const toggleTheme = () => {
      setTheme((curr) => (curr === 'light' ? 'dark' : 'light'));
  };
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [authorized, setAuthorized] = useState<boolean>(false);
  const {t} = useTranslation();

  useEffect(() => {
      // on initial load - run auth check 
      authCheck(router.asPath);

      // on route change start - hide page content by setting authorized to false  
      const hideContent = () => setAuthorized(false);
      router.events.on('routeChangeStart', hideContent);

      // on route change complete - run auth check 
      router.events.on('routeChangeComplete', authCheck)

      // unsubscribe from events in useEffect return function
      return () => {
          router.events.off('routeChangeStart', hideContent);
          router.events.off('routeChangeComplete', authCheck);
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function authCheck(url) {
    // redirect to login page if accessing a private page and not logged in 
    setUser(userService.userValue);
    const privatePaths = ['/music/[yt_id]'];
    const path = url.split('?')[0];
    if (!userService.userValue && privatePaths.includes(path)) {
        setAuthorized(false);
        router.push({
            pathname: '/account/login',
            query: { returnUrl: router.asPath }
        });
    } else {
        setAuthorized(true);
    }
  }

  if (!authorized) {
    return <PreloaderComp />
  }

  if (size.width < 992) {
    return (
      <NotAvalable />  
    );
  }
          
  return (
    <ThemeProvider enableSystem={false} attribute="class">
      <Head>
        <meta name="viewport" content="viewport-fit=cover" />
      </Head>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;