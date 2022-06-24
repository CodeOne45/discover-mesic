import axios from "axios";
import { GetServerSideProps } from "next";
import { Head } from "next/document";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import Layout from "../../components/Layout";
import PreloaderComp from "../../components/preloader/preloaderComp";
import { API_URL, FRONTEND_URL, thumbnailLink } from "../../constant/url";
import { songService } from "../../services/music.service";
import { Context } from "../../store";
import { IMusic } from "../../types/music";
import pochetteImage from '../../asset/pochette.png';
import { userService } from "../../services/user.service";
import styles from "../../styles/artist.module.css";
import { FaHeart, FaPlay, FaYoutube } from "react-icons/fa";
import Controller from "../../components/music/Controller";

/**
 * Handle /artist/[author] type url 
 */
 const Author: React.FC<IMusic | any> = (props) => {
  const {  setMusic, setIsPlay, playStarted, setPlayStarted } = useContext(Context) as any;
  const author = props.data[0]?.author ?? undefined;
    const [user, setUser] = useState<any>();
    const [totallikes, setTotallikes] = useState<number>();
    const TITLE = props.data[0]? ` Songs of ${author}` : undefined;
    const URL = `${FRONTEND_URL}/artist/${author}`;
    const boutton =  (music : IMusic) => {
      if (music != null) {
        setMusic(music);
        setIsPlay(true);
      
      }
    };

    useEffect(() => {
        (async () => {
            const  addedBy  = (await userService.getUserProfilById(props.data[0].addedBy));
            const allLikes = (await songService.findTotalLikesbyUsername(author))            
            if (addedBy.data.username){
              setUser(JSON.stringify(addedBy.data.username));
            }
            if(allLikes.data.totalLikes){
              setTotallikes(Number(JSON.stringify(allLikes.data.totalLikes)));
            }
        })();

      }, [props.data[0].yt_id]);

    if (!props.data) {
        return <PreloaderComp />;
      }
    return (
      <Layout>
        
              <div className={styles.content}>
              
              <div className={styles.card}>     
                  <div className={styles.card_image_circle}>
              <img src={props.data[0].yt_id?thumbnailLink(props.data[0].yt_id): pochetteImage.src} alt="Landing pochette"/>
            </div>
            </div>
           
            <div className={styles.card_content}>
            <h1>{TITLE}</h1>
              <p> {author}<a href={"https://www.youtube.com/watch?v=" + `${props.data[0].yt_id}`} target="_blank" ><FaYoutube   className={styles.youtube} /></a> </p>
              <div className={styles.bold}>  Added by</div> <p> {user} </p>
          <p> <FaHeart  className={styles.logo}/>  {totallikes} </p> 
          </div>
          <div>         
          
          </div>
              
            <div>
              <div className={styles.bold}>
                <h3> More content from {props.data[0].author}</h3></div>
                {props.data.map((artist: any) => (
                  <div>
                    <p key={artist.id}> Title : {artist.title}</p>
                    <img src={artist.yt_id?thumbnailLink(artist.yt_id): pochetteImage.src} alt="Landing pochette"/>
                    <p>   <FaPlay /> <FaHeart  className={styles.heart}/> {artist.numberOfLikes}</p>
                  
                    <p>Date insertion : {artist.dateInsertion}</p>
                  </div>
                ))}
              </div>
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