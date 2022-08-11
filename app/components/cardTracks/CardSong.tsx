import React from "react";
import { thumbnailLink } from "../../constant/url";
import { FaPlay, FaHeart} from 'react-icons/fa'
import styles from "../../styles/artist.module.css";

const CardSong = ({ song }) => {
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
        <FaPlay/>
        <p><FaHeart /> {song.numberOfLikes}</p>
      </div>
    </div>
  );
};

export default CardSong;