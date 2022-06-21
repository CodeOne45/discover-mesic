import { useContext, useEffect } from "react";
import 'font-awesome/css/font-awesome.min.css';

import Carousel from "../components/music/Carousel";
import Layout from "../components/Layout";
import styles from "../styles/discover.module.css";
import MusicList from "../components/music/MusicList";
import UrlForm from "../components/music/UrlForm";
import Controller from "../components/music/Controller";
import { Context } from "../store";
import type { NextPage } from "next";
import Head from "next/head";
import { FRONTEND_URL } from "../constant/url";
import {songService} from '../services/music.service';


/**
 * Discover page
 */
const Discover: NextPage = () => {
  const {musics, setMusics} = useContext(Context) as any;
  const {topMusics, setTopMusics} = useContext(Context) as any;

  const { isPlay } = useContext(Context) as any;


  useEffect(() => {
    (async () => {
      if(musics.length === 0){
        const { data } = (await songService.songsList());
        if (data.length) setMusics(data);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if(topMusics.length === 0){
        const { data } = (await songService.topTen());
        if (data.length) setTopMusics(data);
      }
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
        <div className={`${styles.music_lister}, ${styles.block}`}>
          <MusicList musics={musics}/>
          <UrlForm />
        </div>
        <div className={`${styles.other_music}, ${styles.block}`}>
          <Carousel topTenSongs={topMusics} slide_type="song"/>
          <Carousel topTenSongs={topMusics} slide_type="artiste"/>
        </div>
        {isPlay && <Controller />}
      </Layout>
    </>
  );
};

export default Discover;
