import { useContext, useEffect, useState } from "react";
import 'font-awesome/css/font-awesome.min.css';

import Carousel from "../components/music/Carousel";
import Layout from "../components/Layout";
import styles from "../styles/discover.module.css";
import MusicList from "../components/music/MusicList";
import { Context } from "../store";
import type { NextPage } from "next";
import Head from "next/head";
import { FRONTEND_URL } from "../constant/url";
import {songService} from '../services/music.service';
import useWindowSize from '../helpers/useWindowSize'


/**
 * Discover page
 */
const Discover: NextPage = () => {
  const {musics, setMusics} = useContext(Context) as any;
  const {topMusics, setTopMusics} = useContext(Context) as any;
  const size = useWindowSize();    

  const [activeLink, setActiveLink] = useState("full"); // 9 was default in example

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

  useEffect(() => {
    if(size.width < 1100){
      setActiveLink("player");
    } else{
      setActiveLink("full");
    }
  }, [size.width]);

  const TITLE = "Discover Me'sic";
  const DESCRIPTION = "Discover unknown artists";
  const OG_IMAGE = `${FRONTEND_URL}/og-image.jpg`;

  const project = () => {
    switch(activeLink) {

      case "player":   return (<div className={`${styles.music_lister}, ${styles.block}`}>
                          <MusicList musics={musics}/>
                      </div> );
      case "top":   return (<div className={`${styles.other_music}, ${styles.block}`}>
                          <Carousel topTenSongs={topMusics} slide_type="song"/>
                          <Carousel topTenSongs={topMusics} slide_type="artiste"/>
                      </div>);

      default:      return (<div className={`${styles.other_music}, ${styles.block}`}>
                                <Carousel topTenSongs={topMusics} slide_type="song"/>
                                <Carousel topTenSongs={topMusics} slide_type="artiste"/>
                            </div>)
    }
  }
 
  
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
        {size.width < 1100 ? (

          <div className={styles.tab_nav_container}>
            <div onClick={() => setActiveLink("player")} className={`${styles.tab} ${activeLink === "player" ? `${styles.active}` : ''}`}>
              <i className="fas fa-home"></i>
              <p>Home</p>
            </div>
            <div onClick={() => setActiveLink("top")} className={`${styles.tab} ${activeLink === "top" ? `${styles.active}` : ''}`}>
              <i className="fas fa-search"></i>
              <p>search</p>
            </div>
          </div>
        ) : ( 
          <div className={`${styles.music_lister}, ${styles.block}`}>
            <MusicList musics={musics}/>
          </div> 
        )
      }
      { project() }  
      </Layout>
    </>
  );
};

export default Discover;
