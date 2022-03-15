import React, { useState } from "react";
import { API_URL } from "../constant/url";


const UrlForm: React.FC = () => {
  const [yt_id, setyt_id] = useState("");
  const [title, settitle] = useState("");
  const [author, setauthor] = useState("");
  const [message, setMessage] = useState("");

  let handleSubmit = async (e : any) => {
    e.preventDefault();
    try {
      let res = await fetch(API_URL+"/songs/newsong", {
        method: "POST",
        body: JSON.stringify({
          yt_id: yt_id,
          title: title,
          author: author,
        }),
      });
      console.log(yt_id);
      let resJson = await res.json();
      if (res.status === 200) {
        setyt_id("");
        settitle("");
        setMessage("Song added successfully");
      } else {
        setMessage("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div >
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