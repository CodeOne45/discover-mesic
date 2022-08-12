import { GetServerSideProps } from "next";
import { useContext, useEffect, useState } from "react";
import Layout from "../../components/Layout";
import PreloaderComp from "../../components/preloader/preloaderComp";
import { FRONTEND_URL, thumbnailLink } from "../../constant/url";
import { songService } from "../../services/music.service";
import { Context } from "../../store";
import { IMusic } from "../../types/music";
import pochetteImage from '../../asset/pochette.png';
import { userService } from "../../services/user.service";
import styles from "../../styles/artist.module.css";
import { FaHeart, FaPlay, FaYoutube } from "react-icons/fa";

import Title from "../../components/artist/Title";
import Songs from "../../components/artist/Songs";

/**
 * Handle /artist/[author] type url 
 */
 const Author: React.FC<IMusic | any> = (props) => {
  const author = props.data[0]?.author ?? undefined;
  const [user, setUser] = useState<any>();
  useEffect(() => {
    (async () => {
      if(props.data[0].addedBy){
        const  addedBy  = (await userService.getUserProfilById(props.data[0].addedBy));
        const allLikes = (await songService.findTotalLikesbyUsername(author))            
        if (addedBy.data.username){
          setUser(JSON.stringify(addedBy.data.username));
        }
        if(allLikes.data.totalLikes){
          setTotallikes(Number(JSON.stringify(allLikes.data.totalLikes)));
        }
      }        
    })();
  }, [props.data[0].yt_id]);

  if (!props.data) {
      return <PreloaderComp />;
    }
  return (
    <Layout>
      <div className={styles.container_right}>
        <Title artist={props.data[0]} />.
        <Songs songs={props.data} />
      </div>
    </Layout>
  );
 };

export const getServerSideProps: GetServerSideProps = async (context) => {
  const author = context.query?.author;
  if (author) {
      try{
          const { data } = (await songService.findMusicsByArtists(author)) as any;
          
          if (data) return { props: {data} };
      }catch(e) {
          console.log(e);
      }
      
  }
  return { props: {} } as any;
};

export default Author;