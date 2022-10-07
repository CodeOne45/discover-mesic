import { useContext, useEffect, useState } from "react";
import 'font-awesome/css/font-awesome.min.css';

import Carousel from "../components/music/Carousel";
import Layout from "../components/Layout";
import styles from "../styles/discover.module.css";
import MusicList from "../components/music/MusicList";
import MyMusic from "../components/users/MyMusicCard";

import { Context } from "../store";
import type { NextPage } from "next";
import Head from "next/head";
import { FRONTEND_URL } from "../constant/url";
import {songService} from '../services/music.service';
import useWindowSize from '../helpers/useWindowSize'
import {userService} from '../services/user.service';



/**
 * Discover page
 */
const Discover: NextPage = () => {
  const {musics, setMusics} = useContext(Context) as any;
  const {topMusics, setTopMusics} = useContext(Context) as any;
  const size = useWindowSize();    

  const [activeLink, setActiveLink] = useState("full");

  const [user, setUser] = useState(null);

  useEffect(() => {
      const subscription = userService.user.subscribe(x => setUser(x));
      return () => subscription.unsubscribe();
  }, []);

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
    if(user && size.width > 1100){
      setActiveLink("top");
    }
    else if(size.width < 1100){
      setActiveLink("");
    }
    else{
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

      case "my-music":   return (<div className={`${styles.other_music}, ${styles.block}`}>
                                    {user ? <MyMusic userID={user.data.id} /> : <></>}
                                </div>);
      default:      return (<></>)
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
        <div className={`${styles.music_lister}, ${styles.block}`}>
          <MusicList musics={musics}/>
        </div>       
        {size.width < 1100 || user != null ? (
          <div className={styles.tab_nav_container}>
            <div onClick={() => setActiveLink("top")} className={`${styles.tab} ${activeLink === "top" ? `${styles.active}` : ''}`}>
              <i className="fas fa-home"></i>
              <p>Home</p>
            </div>
            <div onClick={() => setActiveLink("top")} className={`${styles.tab} ${activeLink === "discover" ? `${styles.active}` : ''}`}>
              <i className="fas fa-search"></i>
              <p>Discover</p>
            </div>
            <div onClick={() => setActiveLink("my-music")} className={`${styles.tab} ${activeLink === "my-music" ? `${styles.active}` : ''}`}>
              <i className="fas fa-music"></i>
              <p>My music</p>
            </div>
            <div onClick={() => setActiveLink("top")} className={`${styles.tab} ${activeLink === "my-profile" ? `${styles.active}` : ''}`}>
              <i className="fas fa-user"></i>
              <p>Account</p>
            </div>
          </div>
        ) : ( 
          <></> 
        )
      }
      { project() }  
      </Layout>
      
    </>
  );
};

export default Discover;

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