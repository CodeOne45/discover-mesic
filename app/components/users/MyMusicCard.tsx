import * as React from 'react';
import { useEffect, useState } from "react";
import CardSong from "../cardTracks/CardSong";
import styles from "../../styles/artist.module.css";
import {userService} from '../../services/user.service';

interface Props {
    readonly userID?: any;
}

const MyMusicCard: React.FC<Props> = ({ userID }) => {
  const [mySongs, setmySongs] = useState<any>();
  const [activeLink, setActiveLink] = useState("liked");


  useEffect(() => {
    console.log("okay");
    (async() => {
      const { data } = (await userService.get_user_liked_playlist(userID));
      if (data.length) setmySongs(data);
    })();
  }, []);

  return (
    <React.Fragment>
        <div className={styles.my_music_header}>
          <div onClick={() => setActiveLink("liked")} className={`${activeLink === "liked" ? `${styles.active}` : ''}`}> <h3>Your liked songs </h3> </div>
          <div > <h3> | </h3> </div>
          <div onClick={() => setActiveLink("added")} className={`${activeLink === "added" ? `${styles.active}` : ''}`} > <h3>Your added songs </h3> </div>
        </div>

        <section className={styles.top_songs_container}>
        { activeLink === "liked" ? <>{mySongs? mySongs.map((track: any) => (
            <CardSong key={track} song={track} />
        )): <></> }</> 
         : <></>}
        
        </section>
    </React.Fragment>
  );
}

export default MyMusicCard;

