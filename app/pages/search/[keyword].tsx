import {GetServerSideProps} from 'next';
import React, {useContext, useEffect, useState} from 'react';
import Layout from '../../components/Layout';
//import MusicList from '../../components/music/MusicList';
import {songService} from '../../services/music.service';
import {IMusic} from '../../types/music';
import styles from "../../styles/home.module.css";
import { Context } from "../../store";
import PreloaderComp from '../../components/preloader/preloaderComp';

const Search: React.FC<{ keyword: string }> = ({keyword}) => {
  const [musicsSearched, setMusicsSearched] = useState<IMusic[]>([]);
  const {musics, setMusics} = useContext(Context) as any;

  useEffect(() => {
    (async () => {
      if(musics.length === 0){
        const { data } = (await songService.songsList());
        if (data.length) setMusics(data);
      }
    })();
  }, []);


  useEffect(() => {
    if (keyword && musics.length != 0) {
      (async () => {
        const data = songService.findMusicsBySearch(keyword,musics);
        setMusicsSearched(data);
      })();
    }
  }, [keyword,musics]);
  
  if (musicsSearched.length === 0) {
    return <PreloaderComp />
  }

  return (
    <Layout>
      {musicsSearched && (
        <div className={styles.list_wrapper}>
          {/*<MusicList musics={musicsSearched}/>*/}
        </div>
      )}
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {keyword} = context.query;
  return {
    props: {
      keyword,
    },
  };
};

export default Search;
