import React, { useContext, useState , useMemo, useEffect, useRef} from "react";
import { useRouter } from 'next/router';
import { IMusic } from "../../types/music";
import classNames from "classnames";
import TinderCard from "react-tinder-card";
import { thumbnailLink } from "../../constant/url";
import FavoriteIcon from "@material-ui/icons/Favorite";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import styles from "../../styles/music-list-item-component.module.css";
import { Context } from "../../store";
import UrlForm from "./UrlForm";
import Controller from "./Controller";
import {songService} from '../../services/music.service';
import {userService} from '../../services/user.service';



interface Props {
  readonly musics: IMusic[];
}

const MusicList: React.FC<Props> = ({ musics }) => {
  const { music, setMusic, setIsPlay, playStarted, setPlayStarted } = useContext(Context) as any;
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentIndexRef = useRef(currentIndex)
  const canSwipe = currentIndex >= 0;
  const [user, setUser] = useState(null);

  const router = useRouter();


  useEffect(() => {
    const subscription = userService.user.subscribe(x => setUser(x));
    return () => subscription.unsubscribe();
  }, []);

  const updateCurrentIndex = (val: any) => {
    setCurrentIndex(val)
    currentIndexRef.current = val
  }

  const childRefs = useMemo(
    () =>
      Array(musics.length)
        .fill(0)
        .map((i) => React.createRef()),
    [musics]
  )
  useEffect(() => {
    if (musics) {
      setCurrentIndex(musics.length - 1);
    } else router?.push("/404");
  }, [musics]);
  
  const swiped =  (dir : any, musicSwiped : IMusic, index : any) => {
    if (musicSwiped != null) {
      if (dir === "right") {
        (async() => {
          let res = await songService.increaseLikes(music.yt_id);
          
          if(user){
            let data = {
              idMusic : music._id
            };
            let add = await userService.add_to_playlist(user.data.id, data)
          } 
        })();
        console.log("Music added to your favrotes !");
      } else {
        console.log("Music skiped !");
      }
      setMusic(musicSwiped);
      setIsPlay(true);
      
      updateCurrentIndex(index - 1);
    }
  };

  const swipe = async (dir : any) => {
    if (canSwipe && currentIndex < musics.length) {
      await childRefs[currentIndex].current.swipe(dir) // Swipe the card!
    }
  }

  const onCardLeftScreen = (myIdentifier : any) => {
    console.log(myIdentifier + " left the screen");
  };

  return (
    <div className={styles.list_wrapper}>
      {musics.length
        ? musics.map((music, index) => {
            playStarted
              ? console.log("musicStarted")
              : (setMusic(music), setIsPlay(true), setPlayStarted(true));
            return (
              <div>
                <TinderCard
                  key={index}
                  ref={childRefs[index]}
                  className={styles.swipe}
                  onSwipe={(dir) => swiped(dir, musics[index - 1], index)}
                  onCardLeftScreen={() => onCardLeftScreen("fooBar")}
                  preventSwipe={["up", "down"]}
                >
                  <div className={styles.content}>
                    <div className={styles.item_wrapper}>
                      <div className={classNames(styles.item_box)}>
                        <img
                          className={styles.thumbnail}
                          src={thumbnailLink(music.yt_id)}
                          alt={music.title}
                        />
                      </div>
                      <h2 className={classNames(styles.title, "font-nunito")}>
                        {music.title}
                      </h2>
                      <h3  className={classNames(styles.author, "font-nunito")}>
                        <a href={`/artist/${music.author}`}>{music.author}</a>
                      </h3>
                    </div>
                  </div>
                </TinderCard>
              </div>
            );
          })
        : `No music found!`}
        <div className={styles.buttons_swipe}>
          <IconButton className={styles.close} onClick={() => swipe('left')}>
            <CloseIcon className={styles.close_icon} fontSize="large" />
          </IconButton>
          <Controller />
          <IconButton
            className={styles.fav}
            onClick={() => {
              swipe('right');
            }}  
          >
            <FavoriteIcon fontSize="large" />
          </IconButton>
        </div>
        <div className={styles.input}>
          <UrlForm />
        </div>
    </div>
  );
};

/* <Buttons>
<Button onPress={() => swipe('left')} title='Swipe left!' />
<Button onPress={() => swipe('right')} title='Swipe right!' />
</Buttons>*/

export default MusicList;
