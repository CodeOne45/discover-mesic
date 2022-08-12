import * as React from 'react';
import CardSong from "../cardTracks/CardSong";
import styles from "../../styles/artist.module.css";

interface Props {
    readonly songs?: any;
}

const Songs: React.FC<Props> = ({ songs }) => {
  return (
    <React.Fragment>
        <h2>More content from {songs[0].author} </h2>

        <section className={styles.top_songs_container}>
        {songs.map((track: any) => (
            <CardSong key={track} song={track} />
        ))}
        </section>
    </React.Fragment>
  );
}

export default Songs;

