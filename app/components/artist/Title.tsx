import * as React from 'react';
import styles from "../../styles/artist.module.css";
import { FaHeart, FaPlay, FaYoutube } from "react-icons/fa";
import AvatarLayout from "../account/AvatarLayout"

const FALLBACK_IMAGE = "https://us.123rf.com/450wm/yehorlisnyi/yehorlisnyi2104/yehorlisnyi210400016/yehorlisnyi210400016.jpg?ver=6";

interface Props {
  readonly artist?: any;
  readonly user?: any;
  readonly totalLikes?: number;
}

const Title: React.FC<Props> = ({ artist, user, totalLikes }) => {
  const userUnkown = {
      username: "unKnown"
  };
  
  const imageOnLoadHandler = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    if (event.currentTarget.className !== "error") {
      event.currentTarget.className = "success";
    }
};

// This function is triggered if an error occurs while loading an image
const imageOnErrorHandler = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
) => {
    event.currentTarget.src = FALLBACK_IMAGE;
    event.currentTarget.className = "error";
};

  return (
    <div className={styles.header_artist}>
        <div className={styles.artist_info}>
          <div className={styles.header_artist_img}>
            <img src={artist.profile_pic_url? artist.profile_pic_url: ""} onLoad={imageOnLoadHandler} onError={imageOnErrorHandler}  alt="Artist img"/>
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

