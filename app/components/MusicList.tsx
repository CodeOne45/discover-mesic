import React from "react";
import MusicListItem from "./MusicListItem";
import { IMusic } from "../types/music";
import classNames from "classnames";
import TinderCard from "react-tinder-card";
import { thumbnailLink } from "../constant/url";
import styled from "styled-components";

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


  const onSwipe = (music) => {
    //console.log("You swiped: " + direction);
    if(music != null){
      console.log(music.id);
    }
  };

  const onCardLeftScreen = (myIdentifier) => {
    console.log(myIdentifier + " left the screen");
  };

  

  return (
    <CardDiv>
      {musics.map((person, index) => {
        return (
          <TinderCard
            key={index}
            className="swipe"
            onSwipe={() => onSwipe((person == null)? {}: person) }
            onCardLeftScreen={() => onCardLeftScreen("fooBar")}
            preventSwipe={["up", "down"]}
          >
            <MusicListItem key={person.id} id={person.id} title={person.title} author={person.author} />
          </TinderCard>
        );
      })}
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
