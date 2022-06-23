import React, { useState } from "react";
import styles from "../../styles/music-list-item-component.module.css";
import {songService} from '../../services/music.service';


const UrlForm: React.FC = () => {
  const [yt_id, setyt_id] = useState("");
  //const [title, settitle] = useState("");
  //const [author, setauthor] = useState("");
  const [message, setMessage] = useState("");
  const [color, setColor] = useState("");


  let handleSubmit = async (e : any) => {
    e.preventDefault();
    /*let data = {
      yt_id: yt_id,
      title: title,
      author: author,
    };*/
    let data = {
      yt_id: yt_id,
    };
    try {
      let res = await songService.addSong(data);
      if (res.status === 200) {
        //setyt_id("");
        //settitle("");
        setColor("green")
        setMessage("Song added successfully");
      }
    } catch (err : any) {
      if(err.response.status === 400) {
        setColor("red")
        setMessage("Error : empty input !");
      }else{
        setColor("red")
        setMessage("Eroor : Some error occured !");
      }
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
          placeholder="Youtube URL"
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

        <button className={styles.btn} type="submit">Make shine</button>

        <div className="message">{message ? <p style={{ color: `${color}` }}>{message}</p> : null}</div>
      </form>
    </div>
  );
}

export default UrlForm;