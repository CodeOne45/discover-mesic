import React from "react";
import { useContext, useEffect, useState } from "react";

import { thumbnailLink } from "../../constant/url";
import { FaPlay, FaHeart} from 'react-icons/fa'
import styles from "../../styles/artist.module.css";
import classNames from "classnames";

import { Context } from "../../store";
import { IMusic } from "../../types/music";


const CardSong = ({ song }) => {
  const { music, setMusic, isPlay, setIsPlay } = useContext(Context) as any;
  const [iconPlay, seticonPlay] = useState<boolean>(false);
  const [musicToPlay, setmusicToPlay] = useState<IMusic>(song);

  function playSong(){
    if(isPlay && musicToPlay == music){
      setIsPlay(false);
      seticonPlay(false)
    }
    else{
      if (musicToPlay != null) {
        setMusic(musicToPlay);
        setIsPlay(true);
        seticonPlay(true);
      }
    }
  };

  useEffect(() => {
    if(music){
      if(music != musicToPlay){
        console.log("music");
        seticonPlay(false);
      }
    }
  }, [music]);

  return (
    <div className={styles.container_song}>
      <div className={styles.container_song_info}>
        <div className={styles.cover_container}>
          <img src={song.yt_id?thumbnailLink(song.yt_id): ""} alt={song.title} />
        </div>
        <div className={styles.info_container}>
          <span>{song.title}</span>
          <div className={styles.contributors}>
            <p key={song.author} className={styles.track_artist}>
              {song.author}
            </p>
          </div>
        </div>
      </div>
      <div className={styles.container_song_buttons}>
        <button className={styles.button_play} onClick={() => playSong()}>
          <i
            className={classNames(
              iconPlay ? "fas fa-pause" : "fas fa-play",
            )}
          />
        </button>
        <div className={styles.container_song_likes}>
          <FaHeart /> 
          <p> {song.numberOfLikes}</p>
        </div>
      </div>
    </div>
  );
};

export default CardSong;