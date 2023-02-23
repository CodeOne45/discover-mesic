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
        seticonPlay(false);
      }
    }
  }, [music]);

  return (
    <div className={styles.container_song}>
      <div className={styles.container_song_info}>
        <div className={styles.cover_container}>
          <img src={song?thumbnailLink(song.yt_id): ""} alt={song?song.title : "undefined"} />
        </div>
        <div className={styles.info_container}>
          <span>{song?song.title.replace(new RegExp(`\\s*-?\\s*${song.author}\\s*`, "i"), "").replace('-', '').replace('Audio', '').replace('Official Music', '').replace('(Official )', '').replace('(Visualizer)', '').replace('(CLIP VIDÉO)', '').replace('( Video)', '') : "undefined"}</span>
          <div className={styles.contributors}>
            <a href={`/artist/${song.author}`}>
              <p key={song?song.author : "undefined"} className={styles.track_artist}>
                {song?song.author : "undefined"}
              </p>
            </a>
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
          <p> {song?song.numberOfLikes  : "undefined"}</p>
        </div>
      </div>
    </div>
  );
};

export default CardSong;