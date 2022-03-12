import React, { useContext } from "react";
import { IMusic } from "../types/music";
import classNames from "classnames";
import TinderCard from "react-tinder-card";
import { thumbnailLink } from "../constant/url";
import styled from "styled-components";
import styles from "../styles/music-list-item-component.module.css";
import { Context } from "../store";

const CardDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ImgDiv = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  margin-top: 19rem;
  width: 300px;
  height: 300px;
  background-size: cover;
`;

interface Props {
  readonly musics: IMusic[];
}

const MusicList: React.FC<Props> = ({ musics }) => {
  const { setMusic, isPlay, setIsPlay, playStarted, setPlayStarted } =
    useContext(Context) as any;

  const swipe = (dir : any, music : IMusic) => {
    console.log("You swiped: " + dir);
    if (music != null) {
      setMusic(music);
      setIsPlay(!isPlay);
      if (dir === "right") {
        console.log("Music added to your favrotes !");
      } else {
        console.log("Music skiped !");
      }
    }
  };

  const onCardLeftScreen = (myIdentifier : any) => {
    console.log(myIdentifier + " left the screen");
  };

  return (
    <CardDiv>
      {musics.length
        ? musics.map((music, index) => {
            playStarted
              ? console.log("musicStarted")
              : (setMusic(music), setIsPlay(false), setPlayStarted(true));
            return (
              <TinderCard
                key={index}
                className="swipe"
                onSwipe={(dir) => swipe(dir, musics[index - 1])}
                onCardLeftScreen={() => onCardLeftScreen("fooBar")}
                preventSwipe={["up", "down"]}
              >
                <ImgDiv style={{ position: "absolute" }}>
                  <div className={styles.item_wrapper}>
                    <div className={classNames(styles.item_box)}>
                      <img
                        className={styles.thumbnail}
                        src={thumbnailLink(music.yt_id)}
                        alt={music.title}
                      />
                      <div className={styles.icon}>
                        <i className="fas fa-play-circle" />
                      </div>
                    </div>
                    <h3 className={classNames(styles.title, "font-nunito")}>
                      {music.title}
                    </h3>
                  </div>
                </ImgDiv>
              </TinderCard>
            );
          })
        : `No music found!`}
    </CardDiv>
  );
};

export default MusicList;
