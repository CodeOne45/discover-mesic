import * as React from 'react';
import styles from "../../styles/artist.module.css";
import { FaHeart, FaPlay, FaYoutube } from "react-icons/fa";

interface Props {
    readonly artist?: any;
}

const Title: React.FC<Props> = ({ artist }) => {
  return (
    <div className={styles.header_artist}>
        <div className={styles.artist_info}>
          <div className={styles.header_artist_img}>
            <img src={artist.profile_pic_url? artist.profile_pic_url: ""} alt="Artist img"/>
          </div>
          <div className={styles.header_artist_info}>
            <h1>{artist.author}</h1>
            <p><a href={"https://www.youtube.com/watch?v=" + `${artist.yt_id}`} target="_blank" ><FaYoutube   className={styles.youtube} /></a> {artist.author}</p>
            <p> <FaHeart  className={styles.logo}/>  {artist.numberOfLikes} </p> 
          </div>
        </div>
        <div className={styles.added_by}>
            <p className={styles.bold}> Added by {artist.addedBy? artist.addedBy : "Unknown"} </p>
        </div>
    </div>
  );
}

export default Title;

