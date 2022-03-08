import {GetServerSideProps} from 'next';
import React, {useEffect, useState} from 'react';
import Layout from '../../components/Layout';
import MusicList from '../../components/MusicList';
import {findMusicsBySearch} from '../../service/music';
import {IMusic} from '../../types/music';
import styles from "../../styles/home.module.css";

const Search: React.FC<{ keyword: string }> = ({keyword}) => {
  const [musics, setMusics] = useState<IMusic[]>([]);

  useEffect(() => {
    if (keyword) {
      (async () => {
        const data = findMusicsBySearch(keyword);
        setMusics(data);
      })();
    }
  }, [keyword]);

  return (
    <Layout>
      {musics && (
        <div className={styles.list_wrapper}>
          <MusicList musics={musics}/>
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
