import { useContext, useEffect, useState } from "react";
import 'font-awesome/css/font-awesome.min.css';
import { AnimatePresence } from 'framer-motion';
import { IMusic } from "../types/music";
import MusicCard from "../components/music/MusicCard";
import UrlForm from "../components/music/UrlForm";

import Carousel from "../components/music/Carousel";
import Layout from "../components/Layout";
import styles from "../styles/discover.module.css";
import MyMusic from "../components/users/MyMusicCard";
import EditProile from "../components/users/AddEdit";

import { Context } from "../store";
import Container from "../store";

import type { NextPage } from "next";
import Head from "next/head";
import { FRONTEND_URL } from "../constant/url";
import {songService} from '../services/music.service';
import {userService} from '../services/user.service';

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
  const {setMusic, setIsPlay, playStarted, setPlayStarted } = useContext(Context) as any;
  const [isLoading, setLoading] = useState(true);

  const {topMusics, setTopMusics} = useContext(Context) as any;

  const [activeLink, setActiveLink] = useState("full");

  const [user, setUser] = useState(null);

  const [rightSwipe, setRightSwipe] = useState(0);
  const [leftSwipe, setLeftSwipe] = useState(0);
  
  const activeIndex = musics.length - 1;
  const removeCard = (id: string, action: 'right' | 'left') => {
    console.log(musics.filter((card) => card._id === id));
    setMusics((prev) => prev.filter((card) => card._id !== id));
    if (action === 'right') {
      setRightSwipe((prev) => prev + 1);
    } else {
      setLeftSwipe((prev) => prev + 1);
    }
    setMusic(musics[activeIndex - 1]);
    setIsPlay(true);
  };

  useEffect(() => {
      const subscription = userService.user.subscribe(user => setUser(user));
      return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    // Set music with setMusic as the first music in the musics array
    (async () => {
      const { data } = (await songService.songsList());
      if (data.length){
        setMusics(data);
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
        const { data } = (await songService.topTen());
        if (data.length){
          setTopMusics(data);
        }
    })();
  }, []);

  const TITLE = "Discover Me'sic";
  const DESCRIPTION = "Discover unknown artists";
  const OG_IMAGE = `${FRONTEND_URL}/og-image.jpg`;

  const project = () => {
    switch(activeLink) {

      case "player":   return (<div className={`${styles.music_lister}, ${styles.block}`}>
                          {MusicCard()}
                      </div> );
      case "top":   return (<div className={`${styles.other_music}, ${styles.block}`}>
                          <Carousel topTenSongs={topMusics} slide_type="song"/>
                          <Carousel topTenSongs={topMusics} slide_type="artiste"/>
                      </div>);

      case "my-music":   return (<div className={`${styles.other_music}, ${styles.block}`}>
                                    {user ? <MyMusic userID={user.data.id} /> : <></>}
                                </div>);
      case "my-profile":   return (<div className={`${styles.other_music}, ${styles.block}`}>
                                  {user ? <EditProile user={user} /> : <></>}
                                </div>);
      default:      return (<div className={`${styles.other_music}, ${styles.block}`}>
                                <Carousel topTenSongs={topMusics? (topMusics.length > 0 ? topMusics : []) : []} slide_type="song"/>
                                <Carousel topTenSongs={topMusics? (topMusics.length > 0 ? topMusics : []) : []} slide_type="artiste"/>
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
        <div className="discover relative mt-[-3] h-[60rem] px-[5rem] dark:bg-[#081730] pt-[8rem]  mt-[-15rem] z-[1] flex items-top justify-between rounded-b-[5rem]">
          <div className="left flex-1">
            <AnimatePresence>
              {musics.length ? (
                musics.map((card,index) => {
                  playStarted
                  ? console.log("musics[ musics.length - 1]")
                  : (setMusic(musics[ musics.length - 1]), setIsPlay(false), setPlayStarted(true), console.log(musics[ musics.length - 1]));
                  return (
                    <MusicCard
                      key={index}
                      data={card}
                      active={index === activeIndex}
                      removeCard={removeCard}
                    />
                  );
                })
              ) : (
                <h2 className="absolute z-10 text-center text-2xl font-bold text-textGrey ">
                  Excessive swiping can be injurious to health!
                  <br />
                  Come back tomorrow for more
                </h2>
              )}
            </AnimatePresence> 
            <div className=" absolute pl-[5rem] bottom-8 left-0 w-full">
              <UrlForm />
            </div>
          </div>
          {user != null ? (
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
              <div onClick={() => setActiveLink("my-profile")} className={`${styles.tab} ${activeLink === "my-profile" ? `${styles.active}` : ''}`}>
                <i className="fas fa-user"></i>
                <p>Account</p>
              </div>
            </div>
          ) : ( 
            <></> 
          )
        }
        <div className="right mt-5 flex items-start flex-col justify-start flex-1 h-[100%] pt-[9rem]">  
        { project() }  
        </div> 
      </div>
      </Layout>
      
    </>
  );
};


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