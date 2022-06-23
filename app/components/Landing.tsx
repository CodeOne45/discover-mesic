
import { useEffect } from "react";
import pochetteImage from '../asset/pochette.png';
import styles from "../styles/home.module.css";
const TITLE_1 = "Dicover";
const TITLE_2 = "Me'sic";
const CATCHPHRASE = "Always the most beautiful things are hidden, like diamonds";
const SUBTITLE_1 = "With DISCOVER ME’SIC,";
const SUBTITLE_2 = "Discover or make shine a unknown artist";
const SUBTITLE_3_1 = "More than ";
const SUBTITLE_3_2 = "Unknown Song To Discover";
const SUBTITLE_Number = '10 000';

const BUTTON_TEXT = "Discover";
import Link from "next/link";

const Landing: React.FC = () => {
    
    return (
      <div id={styles.container} className={styles.container}>
        <div className={styles.content}>
          <div className={styles.title}>
            <span>{TITLE_1}</span>
            <span>{TITLE_2}</span>
          </div>
          <div className={styles.content_container}>
            <span>{SUBTITLE_1}</span>
            <span>{SUBTITLE_2}</span>
            <span>
              {SUBTITLE_3_1}<span className={styles.music_number}>{SUBTITLE_Number}</span> {SUBTITLE_3_2}
            </span>
          </div>
        </div>
        <div className={styles.image}>
          <div className={styles.image_container}>
            <div className={styles.image_container_block}></div>
            <img className={styles.image_container_img} src={pochetteImage.src} alt="Landing pochette"/>
            <div className={styles.image_container_icon_container} >
              <i id={styles.image_container_icon_cancel} className={"fa fa-window-close "+ styles.image_container_icon}></i>
              <i id={styles.image_container_icon_heart} className={"fa fa-solid fa-heart "+ styles.image_container_icon}></i>
            </div>
          </div>
        </div>   
        <Link href="/discover" >
          <a className={styles.content_button}>
            {BUTTON_TEXT}
          </a>
        </Link>
        <div className={styles.catchphrase}>
          “{CATCHPHRASE}”
        </div>
      </div>
    );
  };
  //https://css-tricks.com/snippets/css/a-guide-to-flexbox/
  export default Landing;