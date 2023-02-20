import { useContext, useEffect, useState } from "react";
import 'font-awesome/css/font-awesome.min.css';

import Layout from "../components/Layout";
import styles from "../styles/discover.module.css";
import MusicList from "../components/music/MusicList";


import { Context} from "../store";
import Container from "../store";

import type { NextPage } from "next";
import Head from "next/head";
import { FRONTEND_URL } from "../constant/url";
import {songService} from '../services/music.service';

// Wrap Discover component with Container
export default function App() {
  return (
    <Container>
      <Discover />
    </Container>
  );
}

/**
 * Discover page
 */
const Discover: NextPage = () => {
  const { musics, setMusics } = useContext<{ musics: IMusic[]; setMusics: (value: IMusic[]) => void }>(Context);
  console.log(musics, setMusics);  


  useEffect(() => {
    (async () => {
      const { data } = (await songService.songsList());
      if (data.length){
        setMusics(data);
      }
    })();
  }, []);



  const TITLE = "Discover Me'sic";
  const DESCRIPTION = "Discover unknown artists";
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
          <MusicList musics={musics?(musics.length > 0 ? musics : []) : []} />
        </div>       
      </Layout>
      
    </>
  );
};

//export default Discover;

/*
/*<div className={styles.block}>
        <div className={styles.music_lister}>
          <MusicList musics={musics}/>
        </div>
        <div className={styles.other_music}>
          <Router>
            <Routes>
              <Route path='/discover/topten' element={<> <Carousel topTenSongs={topMusics} slide_type="song"/><Carousel topTenSongs={topMusics} slide_type="artiste"/> </>} />
              <Route path='/accoutn/login' element={<Login />} />
            </Routes>
          </Router>
        </div>
      </div>*/