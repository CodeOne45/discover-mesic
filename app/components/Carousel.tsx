import {useState} from 'react';
import Slider from 'react-slick';
import { FaChevronLeft,  FaChevronRight} from 'react-icons/fa'


import styles from "../../app/styles/carousel--like-music-component.module.css";
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'


interface Props {
    readonly hotelCards: any;
    readonly slide_type: any;
}

const Carousel: React.FC<Props> = ({ hotelCards, slide_type }) => {
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
                <button onClick={sliderRef?.slickPrev}>
                    <FaChevronLeft />
                </button>
                <button onClick={sliderRef?.slickNext}>
                    <FaChevronRight />
                </button>
            </div>
        </div>
        <Slider ref={setSliderRef} {...sliderSettings}>
            {hotelCards.map((card: { title: string; artiste: string; imageSrc: string; }, index: any) => ( 
            <div className={styles.card}>     
                <div className={styles.card_image}>
                    <img src={card.imageSrc} />
                </div>
                <div key={index} className={styles.card_content}>
                    <h2>{card.title}</h2>
                    <p>{card.artiste}</p>
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
                    {hotelCards.map((card: { title: string; artiste: string; imageSrc: string; }, index: any) => ( 
                    <div className={styles.card}>     
                        <div className={styles.card_image_circle}>
                            <img src={card.imageSrc} />
                        </div>
                        <div key={index} className={styles.card_content}>
                            <h2>{card.title}</h2>
                        </div>
                    </div> 
                    ))}
                </Slider>
            </div>
        ) 
    }

}

export default Carousel;
