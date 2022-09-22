
import { useEffect, useState } from "react";
import pochetteImage from '../asset/pochette.png';
import styles from "../styles/home.module.css";
import { useTranslation } from 'next-export-i18n';

const TITLE_1 = "Discover";
const TITLE_2 = "Me'sic";

import { thumbnailLink } from "../constant/url";
import Link from "next/link";
import { songService } from "../services/music.service";

const Landing: React.FC = () => {

  const { t } = useTranslation();


  const  [numberOfSongs, setnumberOfSongs] = useState<number>(0);

  
  const  [ytBackground, setYtBackground] = useState<string>();

  useEffect(() => {
    (async () => {
        const { data } = (await songService.randomSong());
        if (data.length){
          setYtBackground(data[0].yt_id);
        }
    })();
  }, []);  
  
  useEffect(() => {
    (async () => {
        const { data } = (await songService.songsList());
        if (data.length){
          setnumberOfSongs(data.length);
        }
    })();
  }, []); 

    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.title}>
            <span>{TITLE_1}</span>
            <span>{TITLE_2}</span>
          </div>
          <div className={styles.content_container}>
            <span>{t('landing.with')}</span>
            <span>{t('landing.make_shine')}</span>
            <span>
              {t('landing.more_than')}<span className={styles.music_number}>{numberOfSongs}</span> {t('landing.unknown')}
            </span>
          </div>
        </div>
        <div className={styles.image}>
          <div className={styles.image_container}>
            <div className={styles.image_container_block}></div>
            <img className={styles.image_container_img} src={ytBackground?thumbnailLink(ytBackground): pochetteImage.src} alt="Landing pochette"/>
            <div className={styles.image_container_icon_container} >
              <i id={styles.image_container_icon_cancel} className={"fa fa-window-close "+ styles.image_container_icon}></i>
              <i id={styles.image_container_icon_heart} className={"fa fa-solid fa-heart "+ styles.image_container_icon}></i>
            </div>
          </div>
        </div>   
        <Link href="/discover" >
          <a className={styles.content_button}>
            {t('landing.Discover')}
          </a>
        </Link>
        <div className={styles.catchphrase}>
          “{t('landing.beautiful')}”
        </div>
      </div>
    );
  };
  export default Landing;