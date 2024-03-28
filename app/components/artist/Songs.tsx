import * as React from 'react';
import CardSong from "../cardTracks/CardSong";
import styles from "../../styles/artist.module.css";
import Container from "../../store";

interface Props {
    readonly songs?: any;
}

const Songs: React.FC<Props> = ({ songs }) => {
  return (
    <React.Fragment>
        <section className={styles.top_songs_container}>
          <h2>More content from {songs[0].author} </h2>
          {songs.map((track: any) => (
              <Container>
                <CardSong key={track} song={track} />
              </Container>
          ))}
        </section>
    </React.Fragment>
  );
}

export default Songs;

