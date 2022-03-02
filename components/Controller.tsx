import React, { useCallback, useContext } from "react";
import styles from "../styles/controller-component.module.css";
import classNames from "classnames";
import { Context } from "../store";
import { thumbnailLink } from "../constant/url";

/* eslint-disable @next/next/no-img-element */
const Controller: React.FC = () => {
  const { music, isPlay, setIsPlay } = useContext(
    Context
  ) as any;

  const handleClickPlayButton = useCallback(() => {
    setIsPlay(!isPlay);
  }, [isPlay]);

  return (
    <div className={styles.controller} style={{ background: `url('${thumbnailLink(music?.id)}')` }}>
      <button className={styles.button} onClick={handleClickPlayButton}>
        <i
          className={classNames(
            isPlay ? "fas fa-pause" : "fas fa-play",
            styles.icon
          )}
        />
      </button>
    </div>
  );
};

export default Controller;
