import React, { useState, useEffect } from "react";
import styles from "../../styles/music-list-item-component.module.css";
import {songService} from '../../services/music.service';
import { useTranslation } from 'next-export-i18n';

import { BiPlusCircle } from 'react-icons/bi';

import {userService} from '../../services/user.service';


const UrlForm: React.FC = () => {
  const [yt_id, setyt_id] = useState("");
  const [user, setUser] = useState(null);

  const [message, setMessage] = useState("");
  const [color, setColor] = useState("");

  const {t} = useTranslation();

  useEffect(() => {
    const timeId = setTimeout(() => {
      // After 3 seconds set the show value to false
      setMessage("")
    }, 3000)

    return () => {
      clearTimeout(timeId)
    }
  }, [message]);

  useEffect(() => {
    const subscription = userService.user.subscribe(x => setUser(x));
    return () => subscription.unsubscribe();
  }, []);

  let handleSubmit = async (e : any) => {
    e.preventDefault();
    if(yt_id){
      let data;
      if(user){
        data = {
          yt_id: yt_id,
          addedBy: user.data.id,
        };
      } else{
        data = {
          yt_id: yt_id,
        };
      }
      
      try {
        let res = await songService.addSong(data);
        if (res.status === 200) {
          setyt_id("");
          //settitle("");
          setColor("green")
          setMessage("Song added successfully");
        }
      } catch (err : any) {
        if(err.response.status === 400) {
          setColor("red")
          setyt_id("");
          setMessage("Error : empty input !");
        }else{
          setColor("red")
          setyt_id("");
          setMessage("Eroor : Some error occured !");
        }
      }
    }else{
      setColor("red")
      setMessage("URL is required");
    }
    
  };

  //TODO: Verify if input are empty or not
  return (
    <div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.input_box}
          type="text"
          value={yt_id}
          placeholder={t('UrlForm.Youtube')}
          onChange={(e) => setyt_id(e.target.value)}
        />
        {/*<input
          type="text"
          value={author}
          placeholder="Artist name"
          onChange={(e) => setauthor(e.target.value)}
        />
        <input
          type="text"
          value={title}
          placeholder="Song Name"
          onChange={(e) => settitle(e.target.value)}
        />*/}

        <button className={styles.btn} type="submit">{t('UrlForm.make_shine')}</button>
        <button className={styles.btn_icon} type="submit"><i><BiPlusCircle /></i></button>

        <div className="message">{message ? <p style={{ color: `${color}` }}>{message}</p> : null}</div>
      </form>
    </div>
  );
}

export default UrlForm;