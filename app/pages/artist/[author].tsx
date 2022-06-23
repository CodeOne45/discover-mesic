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



/**
 * Handle /artist/[author] type url 
 */
 const Author: React.FC<IMusic | any> = (props) => {
    const router = useRouter();
    const author = props.data[0]?.author ?? undefined;
    const { music, setMusic, user, setUser } = useContext(Context) as any;
    const TITLE = props.data[0]? ` Songs of ${props.data[0].author}` : undefined;
    const URL = `${FRONTEND_URL}/artist/${author}`;
    console.log(author)
    console.log(TITLE)
    useEffect(() => {
        (async () => {
            const  addedBy  = (await userService.getById(props.data[0].addedBy));
            if (addedBy){
              setUser(addedBy);
              console.log(user);
            }
        })();

      }, [props.data[0].addedBy]);

    if (!props.data) {
        return <PreloaderComp />;
      }
    return (
        <>
            <Layout>
            <div>
      {props.data.map((artist: any) => (
        <div>
        <p> Artist's name :  {artist.author}</p>
        <p key={artist.id}> Title : {artist.title}</p>
        <img src={artist.yt_id?thumbnailLink(artist.yt_id): pochetteImage.src} alt="Landing pochette"/>
        <p> Number of likes :{artist.numberOfLikes}</p>
        <p>Date insertion : {artist.dateInsertion}</p>
        </div>
      ))}
    </div>
            </Layout>
        </>
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