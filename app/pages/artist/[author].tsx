import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import PreloaderComp from "../../components/preloader/preloaderComp";
import { songService } from "../../services/music.service";
import { IMusic } from "../../types/music";
import { userService } from "../../services/user.service";
import styles from "../../styles/artist.module.css";
import Container from "../../store";

import Title from "../../components/artist/Title";
import Songs from "../../components/artist/Songs";


/**
 * Handle /artist/[author] type url 
 */
const Author: React.FC<IMusic | any> = (props) => {
  console.log(props);

  const author = props.data?.[0]?.author ?? undefined;
  const [user, setUser] = useState<any>();
  const [Totallikes, setTotallikes] = useState<number>();

  useEffect(() => {
    (async () => {
      if(props.data?.[0]?.addedBy){
        const  addedBy  = (await userService.getUserProfilById(props.data[0].addedBy));
        if (addedBy.data.username){
          setUser(addedBy.data.username);
        }
      }  
      const allLikes = (await songService.findTotalLikesbyUsername(author))  
      if(allLikes.data.totalLikes){
        setTotallikes(Number(JSON.stringify(allLikes.data.totalLikes)));
      }      
    })();
  }, [props.data?.[0]?.yt_id]);

  if (!props.data) {
    return <PreloaderComp />;
  }

  return (
    <Layout>
      <div className={styles.container_right}>
        <Title artist={props.data[0]} user={user} totalLikes={Totallikes} />
        <Songs songs={props.data} />
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const author = context.query?.author as string;
  if (author) {
    try {
      const { data } = (await songService.findMusicsByArtists(author)) as any;
      if (data) {
        return { props: { data } };
      }
    } catch (e) {
      console.log(e);
    }
  }
  return { props: { data: ['lol'] } };
};


export default Author;