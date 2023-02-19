import 'font-awesome/css/font-awesome.min.css';
import type { NextPage } from "next";
import Head from "next/head";

import Landing from "../components/Landing";
import Experience from '../components/Experience';
import Layout from "../components/Layout";
import Details from '../components/Details';
import Download from '../components/app-available/Download';  
import Footer from '../components/Footer';


import { FRONTEND_URL } from "../constant/url";
import { useTranslation } from 'next-export-i18n';


/**
 * Home page
 */
const Home: NextPage = () => {
  const {t} = useTranslation();
  const TITLE = "Discover Me'sic";
  const OG_IMAGE = `${FRONTEND_URL}/og-image.jpg`;

  return (
    <>
      <Head>
        <title>{TITLE}</title>

        <meta name={"description"} content={t('Discover_unknown_artists')} />
        <meta name="url" content={FRONTEND_URL} />

        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={t('Discover_unknown_artists')} />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:url" content={FRONTEND_URL} />

        <link rel="canonical" href={FRONTEND_URL} />
        
      </Head>
      <Layout>
          <Landing />
          <Experience />
          <Details />
          <Download />
          <Footer />
      </Layout>
    </>
  );
};

export default Home;
