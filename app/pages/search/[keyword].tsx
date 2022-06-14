import {GetServerSideProps} from 'next';
import React, {useContext, useEffect, useState} from 'react';
import Layout from '../../components/Layout';
import MusicList from '../../components/music/MusicList';
import {findMusicsBySearch} from '../../service/music';
import {IMusic} from '../../types/music';
import styles from "../../styles/home.module.css";
import { Context } from "../../store";

const Search: React.FC<{ keyword: string }> = ({keyword}) => {
  const [musicsSearched, setMusicsSearched] = useState<IMusic[]>([]);
  const {musics} = useContext(Context) as any;


  useEffect(() => {
    if (keyword) {
      (async () => {
        const data = findMusicsBySearch(keyword,musics);
        console.log("+++++++++++++++++++++++++" + musics);
        setMusicsSearched(data);
      })();
    }
  }, [keyword]);

  return (
    <Layout>
      {musicsSearched && (
        <div className={styles.list_wrapper}>
          <MusicList musics={musicsSearched}/>
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
