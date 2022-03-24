import { useContext, useEffect } from "react";
import axios from "axios";
import 'font-awesome/css/font-awesome.min.css';

import Layout from "../components/Layout";
import MusicList from "../components/MusicList";
import UrlForm from "../components/UrlForm";
import Controller from "../components/Controller";
import { Context } from "../store";
import type { NextPage } from "next";
import Head from "next/head";
import { FRONTEND_URL, API_URL } from "../constant/url";

import styles from "../styles/discover.module.css";

/**
 * Discover page
 */
const Discover: NextPage = () => {
  const {musics, setMusics} = useContext(Context) as any;

  const { isPlay } = useContext(Context) as any;

  useEffect(() => {

    document.body.classList.add("discover_page");

    (async () => {
      document.querySelector('#music_options_pause')?.addEventListener('click', function() {
        document.querySelector('.controller-component_button__JWbDP').click();
        console.log(isPlay);
      })
      if(musics.length === 0){
        const { data } = (await axios.get(API_URL+"/songs/songs")) as any;
        if (data.length) setMusics(data);
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
        <div className={styles.list_wrapper}>
          <div className={styles.music_container}>
            <MusicList musics={musics} />
          </div>
          <div className={styles.music_options}>
            <i id="music_options_dislike" className={styles.icon + ' fa fa-close'} aria-hidden="true"></i>
            <i id="music_options_pause"  className={styles.icon + ' fa fa-pause'} aria-hidden="true"></i>
            <i id="music_options_like" className={styles.icon + ' fa fa-heart'} aria-hidden="true"></i>
          </div>
          <UrlForm />          
        </div>
        <div className={styles.other_song}>
        </div>
        {isPlay && <Controller />}
      </Layout>
    </>
  );
};

export default Discover;
