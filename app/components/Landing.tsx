
import { useEffect } from "react";
import pochetteImage from '../asset/pochette.png';
import styles from "../styles/home.module.css";
const TITLE = "Dicover Me'sic";
const CATCHPHRASE = "Always the most beautiful things are hidden, like diamonds";
const SUBTITLE_1 = "With DISCOVER ME’SIC, ";
const SUBTITLE_2 = "Discover or make shine a unknown artist";
const BUTTON_TEXT = "Discover";

const Landing: React.FC = () => {
    useEffect(() => {
        (async () => {    
          document.body.addEventListener("mousemove", (e) => {
            const x = e.clientX;
            const y = e.clientY;
            const width = window.innerWidth;
            const height = window.innerHeight;
          
            const bleu = y / width * 100;
            const green = y / height * 100;
            const  red = (x / width) + (y / height) * 100;
          
            document.body.style.backgroundColor = `rgb(${red}%, ${green}%, ${bleu}%)`
          })
        })();
      }, []);
    
    return (
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
    );
  };
  
  export default Landing;