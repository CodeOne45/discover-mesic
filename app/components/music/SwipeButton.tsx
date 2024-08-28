import React, { useState, useEffect } from "react";
import { SwipeButtonProps } from '../../types';
import FavoriteIcon from "@material-ui/icons/Favorite";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Controller from "./Controller";
import { songService } from '../../services/music.service';
import { userService } from '../../services/user.service';
import styles from "../../styles/music-list-item-component.module.css";

export default function SwipeButton({
  exit,
  removeCard,
  id,
  music,
}: SwipeButtonProps) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const subscription = userService.user.subscribe(x => setUser(x));
    return () => subscription.unsubscribe();
  }, []);

  const handleSwipe = (action: 'left' | 'right') => {
    if (action === 'left') {
      exit(-200);
    } else if (action === 'right') {
      (async() => {
        if(user){
          const { data } = (await userService.get_user_liked_playlist(user.data.id));
          console.log(data);
          let isExist = false;
          data.forEach((song) => {
            if(song != null && song._id == music._id){
              isExist = true;
            }
          });

          if(!isExist){
            let data = {
              idMusic : music._id
            };
            let add = await userService.add_to_playlist(user.data.id, data);
            let res = await songService.increaseLikes(music.yt_id);
          }
        } 
      })();
      exit(200);
    }
    removeCard(id, action);
  };

  return (
    <div className={styles.buttons_swipe}>
      <IconButton className={styles.close} onClick={() => handleSwipe('left')}>
        <CloseIcon className={styles.close_icon} fontSize="large" />
      </IconButton>
      <Controller />
      <IconButton
        className={styles.fav}
        onClick={() => handleSwipe('right')}
      >
        <FavoriteIcon fontSize="large" />
      </IconButton>
    </div>
  );
}