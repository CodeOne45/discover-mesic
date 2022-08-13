import * as React from 'react';
import styles from "../../styles/artist.module.css";
import { FaHeart, FaPlay, FaYoutube } from "react-icons/fa";
import AvatarLayout from "../account/AvatarLayout"

interface Props {
  readonly artist?: any;
  readonly user?: any;
  readonly totalLikes?: number;
}

const Title: React.FC<Props> = ({ artist, user, totalLikes }) => {
  const userUnkown = {
      username: "unKnown"
  };
  
  return (
    <div className={styles.header_artist}>
        <div className={styles.artist_info}>
          <div className={styles.header_artist_img}>
            <img src={artist.profile_pic_url? artist.profile_pic_url: ""} alt="Artist img"/>
          </div>
          <div className={styles.header_artist_info}>
            <h1>{artist.author}</h1>
            <p><a href={"https://www.youtube.com/channel/" + `${artist.channelID}`} target="_blank" ><FaYoutube   className={styles.youtube} /></a> {artist.author}</p>
            <p> <FaHeart  className={styles.logo}/>  {totalLikes} </p> 
          </div>
        </div>
        <div className={styles.added_by}>
          <AvatarLayout user={user? user : userUnkown} withBadge={false} />
          <p className={styles.bold}> Added by <b>{user? user : "Unknown"}</b> </p>
        </div>
    </div>
  );
}

export default Title;

