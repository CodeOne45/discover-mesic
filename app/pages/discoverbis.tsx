import { useContext, useEffect, useState } from "react";
import 'font-awesome/css/font-awesome.min.css';
import { AnimatePresence } from 'framer-motion';
import { IMusic } from "../types/music";
import MusicCard from "../components/music/MusicCard";

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
  const {setMusic, setIsPlay, playStarted, setPlayStarted } = useContext(Context) as any;

  const [rightSwipe, setRightSwipe] = useState(0);
  const [leftSwipe, setLeftSwipe] = useState(0);

  const [isLoading, setLoading] = useState(true);

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

  const stats = [
    {
      name: 'Left',
      count: leftSwipe,
    },
    {
      name: 'Right',
      count: rightSwipe,
    },
  ];

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



  const TITLE = "Discover Me'sic";
  const DESCRIPTION = "Discover unknown artists";
  const OG_IMAGE = `${FRONTEND_URL}/og-image.jpg`;
  
  if (isLoading) {
    return <div className="App">Loading...</div>;
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
      </div>
      <MusicCard
                key={index}
                data={card}
                active={index === activeIndex}
                removeCard={removeCard}
              />
      */