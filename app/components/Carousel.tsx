import classNames from "classnames";
import React from "react";
import { thumbnailLink } from "../constant/url";
import styles from "../styles/carousel-component.module.css";

const Carousel: React.FC = () => {
  return (
    <div className={styles.carousel_wrapper}>
      <div
        className={styles.carousel}
        style={{ background: `url('${thumbnailLink("yApGAVGvKDs")}')` }}
      >
        <h3 className={classNames(styles.music_title, "font-nunito")}>Valley</h3>
        <p
          id="recommend_text"
          className={classNames(
            styles.music_recommend_description,
            "font-nanum"
          )}
        >
          도시의 늦은 밤을 위한 분위기
        </p>
        <div className={styles.moving_text_wrapper}>
          <p className={classNames(styles.moving_text, 'font-nanum')}>오늘의 추천 음악</p>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
