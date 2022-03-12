import React, { useContext, useEffect, useState } from "react";
import MusicListItem from "./MusicListItem";
import { IMusic } from "../types/music";
import classNames from "classnames";
import TinderCard from "react-tinder-card";
import { thumbnailLink } from "../constant/url";
import styled from "styled-components";
import Link from "next/link";
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

  const swipe = (dir, music) => {
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

  const onCardLeftScreen = (myIdentifier) => {
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

    /*<div className={styles.music_list}>
      <TinderCard
        onSwipe={onSwipe}
        onCardLeftScreen={() => onCardLeftScreen("fooBar")}
        preventSwipe={["right", "left"]}
      >
        {musics.length ? (
          musics.map(({ id, author, title }) => (
            <TinderCard
            className="swipe"
            key={id}
            preventSwipe={["up", "down"]}
           >
            <div
              className="card"
            >
              <MusicListItem key={id} id={id} title={title} author={author} />
            </div>
          </TinderCard>
          ))
        ) : (
          <h3 className={classNames(styles.blank_title, "font-nanum")}>
            No music found!
          </h3>
        )}
      </TinderCard>
    </div>*/
    /* <div>
      <div className="tinderCards__cardContainer">
        {musics.map((music) => (
          <TinderCard
            className="swipe"
            key={music.yt_id}
            preventSwipe={["up", "down"]}
          >
            <div
              style={{ backgroundImage: `url(${music.yt_id})` }}
              className="card"
            >
              <h3>{music.yt_id}</h3>
            </div>
          </TinderCard>
        ))}
      </div>
    </div>*/
  );
};

export default MusicList;
