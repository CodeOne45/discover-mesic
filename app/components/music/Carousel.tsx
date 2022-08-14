import {useState} from 'react';
import Slider from 'react-slick';
import { FaChevronLeft,  FaChevronRight, FaHeart} from 'react-icons/fa'

import { thumbnailLink } from "../../constant/url";

import styles from "../../styles/carousel--like-music-component.module.css";
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import type { IMusic } from "../../types/music";

import PreloaderComp from '../preloader/preloaderComp';
import Link from '../Link';
import { useTranslation } from 'next-export-i18n';



interface Props {
    readonly topTenSongs?: IMusic[];
    readonly slide_type?: any;
}

const Carousel: React.FC<Props> = ({ topTenSongs, slide_type }) => {
    
    const [sliderRef, setSliderRef] = useState(null);
    
    const {t} = useTranslation();

    const settings = { 
        fade: true ,
        speed: 500, // ms
        autoplay: false,
        initialSlide: 2,
        lazyLoad: true,
        autoplaySpeed: 3000,
    }

    const sliderSettings = {
        // removes default buttons
        arrows: false,
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                slidesToShow: 3,
                }
            },
            {
                breakpoint: 600,
                settings: {
                slidesToShow: 3,
                }
            }
        ]
    };

    if(slide_type == 'song') {
        return (
        <div className={styles.content}>
            <div className={styles.content_header}>
                <h1 className={styles.content_title}>{t('carousel.Most_Liked_Songs')}</h1>
                <div className={styles.button_container}>
                    {sliderRef ? (
                        <>
                        <button onClick={sliderRef?.slickPrev}>
                            <FaChevronLeft />
                        </button>
                        <button onClick={sliderRef?.slickNext}>
                            <FaChevronRight />
                        </button>
                        </>
                    ): null}
                </div>
            </div>
            <Slider ref={setSliderRef} {...sliderSettings}>
                {topTenSongs.map((card: { id: srting ; title: string; author: string; yt_id: string; numberOfLikes:double; }, index: any) => ( 
                    <div className={styles.card}>  
                        <Link className={styles.Link} href={`/music/${card.yt_id}`}>   
                            <div className={styles.card_image}>
                                <img src={thumbnailLink(card.yt_id)} />
                            </div>
                            <div className={styles.icon}>
                                <i className="fas fa-play-circle" />
                            </div>
                        </Link>
                        <div key={index} className={styles.card_content}>
                            <div className={styles.card_content_main_info}>
                                <h4>{card.title}</h4>
                                <p><a href={`/artist/${card.author}`}>{card.author}</a></p>
                            </div>
                            <div className={styles.card_content_likes}>
                                <p><FaHeart className={styles.card_content_likes_icon} /> {card.numberOfLikes}</p>
                            </div>                            
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
        )      
    } else if(slide_type == 'artiste') {
        return (
            <div className={styles.content}>
                <div className={styles.content_header}>
                    <h1 className={styles.content_title}>{t('carousel.Most_Liked_Artists')}</h1>
                    <div className={styles.button_container}>
                        <button onClick={sliderRef?.slickPrev}>
                            <FaChevronLeft />
                        </button>
                        <button onClick={sliderRef?.slickNext}>
                            <FaChevronRight />
                        </button>
                    </div>
                </div>
                <Slider ref={setSliderRef} {...sliderSettings}>
                    {topTenSongs.map((card: { title: string; author: string; profile_pic_url: string; }, index: any) => ( 
                    <div className={styles.card_artist}>     
                        <div className={styles.card_image_circle}>
                            <a href={`/artist/${card.author}`}> <img src={card.profile_pic_url} /></a>
                        </div>
                        <div key={index} className={styles.card_content_artist}>
                            <h4>{card.author}</h4>
                        </div>
                    </div> 
                    ))}
                </Slider>
            </div>
        ) 
    }

    return (<PreloaderComp />);

}

export default Carousel;
