import React from "react";
import MusicListItem from "./MusicListItem";
import styles from "../styles/music-lilst-component.module.css";
import { IMusic } from "../types/music";
import classNames from "classnames";
import TinderCard from "react-tinder-card";

interface Props {
  readonly musics: IMusic[];
}

const MusicList: React.FC<Props> = ({ musics }) => {

  const onSwipe = (direction) => {
    //<MusicListItem key={id} id={id} title={title} author={author} />
    {
      musics.length ? (
        <MusicListItem
          key={musics[getRandomInt(musics.length - 1)].id}
          id={musics[getRandomInt(musics.length - 1)].id}
          title={musics[getRandomInt(musics.length - 1)].title}
          author={musics[getRandomInt(musics.length - 1)].author}
        />
      ) : (
        console.log("no!")
      );
    }
  };

  const onCardLeftScreen = (myIdentifier) => {
    console.log(myIdentifier + " left the screen");
  };
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  return (
    <div className={styles.music_list}>
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
    </div>
   /* <div>
      <div className="tinderCards__cardContainer">
        {musics.map((person) => (
          <TinderCard
            className="swipe"
            key={person.id}
            preventSwipe={["up", "down"]}
          >
            <div
              style={{ backgroundImage: `url(${person.id})` }}
              className="card"
            >
              <h3>{person.id}</h3>
            </div>
          </TinderCard>
        ))}
      </div>
    </div>*/
  );
};

export default MusicList;
