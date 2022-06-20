import { useContext, useEffect } from "react";
import axios from "axios";
import 'font-awesome/css/font-awesome.min.css';

import Carousel from "../components/Carousel";
import Layout from "../components/Layout";
import styles from "../styles/discover.module.css";
import MusicList from "../components/music/MusicList";
import UrlForm from "../components/music/UrlForm";
import Controller from "../components/music/Controller";
import { Context } from "../store";
import type { NextPage } from "next";
import Head from "next/head";
import { FRONTEND_URL, API_URL } from "../constant/url";


/**
 * Discover page
 */
const Discover: NextPage = () => {
  const {musics, setMusics} = useContext(Context) as any;

  const { isPlay } = useContext(Context) as any;

  useEffect(() => {
    (async () => {
      if(musics.length === 0){
        const { data } = (await axios.get(API_URL+"/songs/songs")) as any;
        if (data.length) setMusics(data);
      }
    })();
  }, []);

  const TITLE = "Dicover Me'sic";
  const DESCRIPTION = "Descover unknown artists";
  const OG_IMAGE = `${FRONTEND_URL}/og-image.jpg`;

  //Tableau temp des liste de musique. A edit avec les valeurs modilable
  const hotelCards = [
    {
      imageSrc:
        'https://images.unsplash.com/photo-1559508551-44bff1de756b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80',
      title: 'Sante',
      artiste: 'Stromae'
    },
    {
      imageSrc:
        'https://images.unsplash.com/photo-1616940844649-535215ae4eb1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
        title: 'Suavemente',
        artiste: 'Soolking'
    },
    {
      imageSrc:
        'https://images.unsplash.com/photo-1599619351208-3e6c839d6828?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=872&q=80',
      title: 'Love Story',
      artiste: 'Indila'
    },
    {
      imageSrc:
        'https://images.unsplash.com/photo-1461092746677-7b4afb1178f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
      title: 'Molly',
      artiste: 'Gazo'
    },
    {
      imageSrc:
        'https://images.unsplash.com/photo-1559508551-44bff1de756b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80',
      title: 'La gang',
      artiste: 'DA Uzi'
    },
  ]
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
          <div className={`${styles.music_lister}, ${styles.block}`}>
            <MusicList musics={musics}/>
            <UrlForm />
          </div>
        
        <div className={`${styles.top_music}, ${styles.block}`}>
          <Carousel hotelCards={hotelCards} slide_type="song"/>
          <Carousel hotelCards={hotelCards} slide_type="artiste"/>
        </div>
        {isPlay && <Controller />}
      </Layout>
    </>
  );
};

export default Discover;
