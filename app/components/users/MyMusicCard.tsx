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

  useEffect(() => {
    console.log("okay");
    (async () => {
      console.log("okay");
      //const { data } = (await userService.get_user_liked_playlist(userID));
      //console.log("okay" + data)
      //if (data.length) setmySongs(data);
    });
    (async() => {
      const { data } = (await userService.get_user_liked_playlist(userID));
      console.log("okay" + data)
      if (data.length) setmySongs(data);
    })();
  }, []);

  return (
    <React.Fragment>
        <h2>Your liked songs </h2>

        <section className={styles.top_songs_container}>
        {mySongs? mySongs.map((track: any) => (
            <CardSong key={track} song={track} />
        )): <></> }
        </section>
    </React.Fragment>
  );
}

export default MyMusicCard;

