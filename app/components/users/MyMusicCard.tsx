import * as React from 'react';
import { useEffect, useState } from "react";
import CardSong from "../cardTracks/CardSong";
import styles from "../../styles/artist.module.css";
import {userService} from '../../services/user.service';
import {songService} from '../../services/music.service';
import { m } from 'framer-motion';

interface Props {
    readonly userID?: any;
}

const MyMusicCard: React.FC<Props> = ({ userID }) => {
  const [mySongs, setmySongs] = useState<any>();
  const [addedSongs, setaddedSongs] = useState<any>();
  let [LikedOrAddedSongs, setLikedOrAddedSongs] = useState<any>();

  const [activeLink, setActiveLink] = useState("liked");
  const [refresh, setRefresh] = useState<boolean>(false);

  // function to get user's liked songs and added songs
  const getUserSongs = async () => {
    const { data } = (await userService.get_user_liked_playlist(userID));
    if (data.length) setmySongs(data);

    const addedSongs = (await songService.songsList());

    if(userID && addedSongs.length != 0){
      var result = addedSongs.data.filter((x)=>x.addedBy === userID);
      setaddedSongs(result);
    }
  };

  useEffect(() => {
    getUserSongs();
  }, []);

  useEffect(() => {
    getUserSongs();
  }, [userID, refresh]);

  // set LikedOrAddedSongs if activeLink change
  useEffect(() => {
    if (activeLink === "liked") {
      console.log(mySongs)
      setLikedOrAddedSongs(mySongs);
    } else if (activeLink === "added") {
      setLikedOrAddedSongs(addedSongs);
    }
    else{
      setLikedOrAddedSongs([]);
    }
    console.log(LikedOrAddedSongs)
  }, [activeLink, mySongs, addedSongs, refresh]);



  return (
    <React.Fragment>
        <div className={styles.my_music_header}>
          <div onClick={() => setActiveLink("liked")} className={`${activeLink === "liked" ? `${styles.active}` : `${styles.inactive}`}`}> <h3>Your liked songs </h3> </div>
          <div > <h3> | </h3> </div>
          <div onClick={() => setActiveLink("added")} className={`${activeLink === "added" ? `${styles.active}` : `${styles.inactive}`}`} > <h3>Your added songs </h3> </div>
        </div>
        <section className={styles.top_songs_container}>
          {LikedOrAddedSongs? LikedOrAddedSongs.length > 2 ? LikedOrAddedSongs.map((track: any) => (
              <CardSong song={track} liked={activeLink === "liked" ? true : false} refresh={refresh} setRefresh={setRefresh} />
          )): <> <p> {activeLink === "liked" ? "No song liked yet!" : "No song added ! It's never late."} </p> </> : <> <p> Some error occured! </p> </>}
        </section>
    </React.Fragment>
  );
}


export default MyMusicCard;

