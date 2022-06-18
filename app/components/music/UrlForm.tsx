import React, { useState } from "react";
import { API_URL } from "../../constant/url";
import axios from "axios";


const UrlForm: React.FC = () => {
  const [yt_id, setyt_id] = useState("");
  const [title, settitle] = useState("");
  const [author, setauthor] = useState("");
  const [message, setMessage] = useState("");

  let handleSubmit = async (e : any) => {
    e.preventDefault();
    let data = {
      yt_id: yt_id,
      title: title,
      author: author,
    };
    try {
      console.log(data);

      let res = await axios.post(API_URL+"/songs/newsong", data);
      console.log(res.status);
      if (res.status === 200) {
        setyt_id("");
        settitle("");
        setMessage("Song added successfully");
      }
    } catch (err : any) {
      if(err.response.status === 400) {
        setMessage("Error : Body is empty !");
      }else{
        setMessage("Eroor : Some error occured !");
      }
      console.log(err.response);
    }
  };

  //TODO: Verify if input are empty or not
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={yt_id}
          placeholder="Youtube URL"
          onChange={(e) => setyt_id(e.target.value)}
        />
        <input
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
        />

        <button type="submit">Make shine</button>

        <div className="message">{message ? <p>{message}</p> : null}</div>
      </form>
    </div>
  );
}

export default UrlForm;