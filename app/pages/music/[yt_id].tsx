import React, { useContext, useEffect, useState } from "react";
import Layout from "../../components/Layout";
import styles from "../../styles/music-page.module.css";
import { useRouter } from "next/router";
import { FRONTEND_URL, thumbnailLink, API_URL } from "../../constant/url";
import { Context } from "../../store";
import classNames from "classnames";
import { GetServerSideProps } from "next";
import Head from "next/head";
import type { IMusic } from "../../types/music";
import { songService } from "../../services/music.service";
import PreloaderComp from "../../components/preloader/preloaderComp";

/**
 * Handle /music/[yt_id] type url
 */
const Music: React.FC<IMusic | any> = (data) => {

  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const { musics, setMusics, music, setMusic, setIsPlay } = useContext(
    Context
  ) as any;

  const yt_id = data?.yt_id ?? undefined;

  useEffect(() => {
    (async () => {
      if (musics.length === 0) {
        const { data } = await songService.songsList();
        if (data.length) setMusics(data);
      }
    })();
  }, []);

  useEffect(() => {
    if (yt_id && musics) {
      setIsLoaded(true);
      setIsPlay(true);
      const databis = songService.findMusicById(yt_id as string, musics);
      console.log(databis);

      if (databis) setMusic(databis);
    } else router?.push("/404");
  }, [yt_id, musics]);

  console.log(music);
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
                  <h5 className={classNames(styles.author, "font-nunito")}>
                    {music.author}
                  </h5>
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
  const yt_id = context.query?.yt_id;
  if (yt_id) {
    return { props: { yt_id } };
  }
  return { props: {} } as any;
};

export default Music;
