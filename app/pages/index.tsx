import { useContext, useEffect } from "react";
import axios from "axios";
import 'font-awesome/css/font-awesome.min.css';

import Layout from "../components/Layout";
import styles from "../styles/home.module.css";
import MusicList from "../components/MusicList";
import UrlForm from "../components/UrlForm";
import Controller from "../components/Controller";
import { Context } from "../store";
import type { NextPage } from "next";
import Head from "next/head";
import { FRONTEND_URL, API_URL } from "../constant/url";

import pochetteImage from '../asset/pochette.png';

/**
 * Home page
 */
const Home: NextPage = () => {
  const {musics, setMusics} = useContext(Context) as any;

  const { isPlay } = useContext(Context) as any;

  useEffect(() => {
    (async () => {
      const { data } = (await axios.get(API_URL+"/songs/songs")) as any;
      //const data = findMusics(); --> to use .json file data
      if (data.length) setMusics(data);

      document.body.addEventListener("mousemove", (e) => {
        const x = e.clientX;
        const y = e.clientY;
        const width = window.innerWidth;
        const height = window.innerHeight;
      
        const bleu = y / width * 100;
        const green = y / height * 100;
        const  red = (x / width) + (y / height) * 100;
      
        //document.body.style.backgroundColor = `rgb(${red}%, ${green}%, ${bleu}%)`
      })
    })();
  }, []);

  const TITLE = "Dicover Me'sic";
  const DESCRIPTION = "Descover unknown artists";
  const OG_IMAGE = `${FRONTEND_URL}/og-image.jpg`;
  const CATCHPHRASE = "Always the most beautiful things are hidden, like diamonds";
  const SUBTITLE_1 = "With DISCOVER ME’SIC, ";
  const SUBTITLE_2 = "Discover or make shine a unknown artist";
  const BUTTON_TEXT = "Discover";

  //const pochetteImage = require('../../assets/pochette.png');


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
        {
        /*
        <div className={styles.list_wrapper}>
          <UrlForm />
          <MusicList musics={musics} />
          
        </div>
        {isPlay && <Controller />}
        */
        }
        <div className={styles.list_wrapper}>
          <span className={styles.switch_language_btn}>FR | EN</span>
          <span className={styles.catchphrase}>“{CATCHPHRASE}”</span>

          <div className={styles.content}>
            <h1 className={styles.content_title}>{TITLE}</h1>
            <span className={styles.content_subtitle}>{SUBTITLE_1}</span>
            <span className={styles.content_subtitle}>{SUBTITLE_2}</span>
            <a href="/discover" className={styles.content_button}>{BUTTON_TEXT}</a>
          </div>
          <div className={styles.image_container}>
            <div className={styles.image_container_block}></div>
            <img className={styles.image_container_img} src={pochetteImage.src}/>
            <div className={styles.image_container_icon_container} >
              <i id={styles.image_container_icon_cancel} className={"fa fa-window-close "+ styles.image_container_icon}></i>
              <i id={styles.image_container_icon_heart} className={"fa fa-solid fa-heart "+ styles.image_container_icon}></i>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Home;
