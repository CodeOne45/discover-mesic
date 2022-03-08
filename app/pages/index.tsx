import { useContext, useEffect, useState } from "react";
// import axios from "axios";
import Layout from "../components/Layout";
import styles from "../styles/home.module.css";
import MusicList from "../components/MusicList";
import Controller from "../components/Controller";
import { Context } from "../store";
import type { NextPage } from "next";
import type { IMusic } from "../types/music";
//import Carousel from "../components/Carousel";
import { findMusics } from "../service/music";
import Head from "next/head";
import { FRONTEND_URL } from "../constant/url";

const Home: NextPage = () => {
  const [musics, setMusics] = useState<IMusic[]>([]);
  const { isPlay } = useContext(Context) as any;

  useEffect(() => {
    (async () => {
      // const { data } = (await axios.get("/api/music")) as any;
      const data = findMusics();
      if (data.length) setMusics(data);
    })();
  }, []);

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
        <div className={styles.list_wrapper}>
          <MusicList musics={musics} />
        </div>
        {isPlay && <Controller />}
      </Layout>
    </>
  );
};

export default Home;
