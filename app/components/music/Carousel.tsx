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



interface Props {
    readonly topTenSongs?: IMusic[];
    readonly slide_type?: any;
}

const Carousel: React.FC<Props> = ({ topTenSongs, slide_type }) => {
    
    const [sliderRef, setSliderRef] = useState(null);
    
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
        slidesToScroll: 1,
        infinite: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                slidesToShow: 2,
                }
            },
            {
                breakpoint: 600,
                settings: {
                slidesToShow: 1,
                }
            }
        ]
    };

    if(slide_type == 'song') {
        return (
        <div className={styles.content}>
        <div className={styles.content_header}>
            <h1 className={styles.content_title}>Most Like song</h1>
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
                            <p><FaHeart /> {card.numberOfLikes}</p>
                        </div>
                        <div className={styles.icon}>
                            <i className="fas fa-play-circle" />
                        </div>
                    </Link>
                    <div key={index} className={styles.card_content}>
                        <h4>{card.title}</h4>
                        <p>{card.author}</p>
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
                    <h1 className={styles.content_title}>Most Like Artiste</h1>
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
                    {topTenSongs.map((card: { title: string; author: string; yt_id: string; }, index: any) => ( 
                    <div className={styles.card}>     
                        <div className={styles.card_image_circle}>
                            <img src={thumbnailLink(card.yt_id)} />
                        </div>
                        <div key={index} className={styles.card_content}>
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
