import React, { useContext, useEffect, useState } from "react";
import Layout from "../../components/Layout";
import styles from "../../styles/music-page.module.css";
import { useRouter } from "next/router";
import { FRONTEND_URL, thumbnailLink, API_URL } from "../../constant/url";
import { Context } from "../../store";
import classNames from "classnames";
import Container from "../../store";

import { GetServerSideProps } from "next";
import Head from "next/head";
import type { IMusic } from "../../types/music";
import { songService } from "../../services/music.service";
import PreloaderComp from "../../components/preloader/preloaderComp";

export default function App() {
  return (
    <Container>
      <Music />
    </Container>
  );
}

/**
 * Handle /music/[yt_id] type url
 */
const Music: React.FC<IMusic | any> = (data) => {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const { musics, setMusics, music, setMusic, setIsPlay } = useContext(
    Context
  ) as any;

  const { yt_id } = router.query;

  useEffect(() => {
    (async () => {
      const { data } = await songService.songsList();
      setMusics(data);
    })();
  }, []);

  useEffect(() => {
    if (yt_id && musics.length) {
      const databis = songService.findMusicById(yt_id as string, musics);
      if (databis) {
        setMusic(databis);
        setIsLoaded(true);
        setIsPlay(true);
      } else {
        router.push("/404");
      }
    }
  }, [yt_id, musics]);

  const TITLE = data ? `${data.title} - Discover Me'sic` : undefined;
  const URL = `${FRONTEND_URL}/music/${yt_id}`;

  if (!music) {
    return <PreloaderComp />;
  }

  return (
    <>
      {yt_id && (
        <Head>
          <title>{TITLE}</title>

          <meta property="og:title" content={TITLE} />
          <meta property="og:image" content={thumbnailLink(yt_id)} />
          <meta property="og:url" content={URL} />

          <link rel="canonical" href={URL} />
        </Head>
      )}

      <Layout>
        <div className={styles.music_page_wrapper}>
          {isLoaded && (
            <div>
              <div
                className={styles.thumbnail}
                style={{
                  background: `url('${thumbnailLink(yt_id as string)}')`,
                }}
              >
                <div className={styles.dot} />
              </div>
              <div className={styles.music_info_wrapper}>
                <div className={styles.title_wrapper}>
                  <h3 className={classNames(styles.title, "font-nunito")}>
                    {music.title}
                  </h3>
                </div>
                <div className={styles.author_wrapper}>
                  <a className="hover:underline" href={`/artist/${music.author}`}>
                    <h3  className={styles.author}>{music.author}</h3>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </Layout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const yt_id = context.query?.yt_id as string;

  try {
    const { data } = await songService.songsList();
    const music = songService.findMusicById(yt_id, data);
    console.log(music);
    if (music) {
      return { props: { yt_id } };
    }
  } catch (error) {
    console.error(error);
  }

  return { notFound: true };
};



