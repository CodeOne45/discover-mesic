import 'font-awesome/css/font-awesome.min.css';
import Landing from "../components/Landing";
import Layout from "../components/Layout";
import type { NextPage } from "next";
import Head from "next/head";
import { FRONTEND_URL } from "../constant/url";


/**
 * Home page
 */
const Home: NextPage = () => {

  const TITLE = "Dicover Me'sic";
  const DESCRIPTION = "Descover unknown artists";
  const OG_IMAGE = `${FRONTEND_URL}/og-image.jpg`;

  return (
    <>
      <Head>
        <title>{TITLE}</title>

        <meta name={"description"} content={DESCRIPTION} />
        <meta name="url" content={FRONTEND_URL} />

        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:url" content={FRONTEND_URL} />

        <link rel="canonical" href={FRONTEND_URL} />
        
      </Head>
      <Layout>
          <Landing />
      </Layout>
    </>
  );
};

export default Home;
