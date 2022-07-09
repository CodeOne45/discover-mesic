/** Music Hook store */
import React, { useCallback, useEffect, useState } from "react";
import type { IMusic } from "../types/music";

export const Context = React.createContext({});

interface Props {
  children?: React.ReactNode;
}

const Container: React.FC<Props> = ({ children }) => {
  const [musics, setMusics] = useState<IMusic[]>([]);
  const [topMusics, setTopMusics] = useState<IMusic[]>([]);
  const [playStarted, setPlayStarted] = useState<boolean>(false);
  const [isPlay, setIsPlay] = useState<boolean>(false);
  const [music, setMusic] = useState<IMusic>();
  

  const handleKeydown = useCallback((event: any) => {
    if (event.code === 'Space') {
      setIsPlay(!isPlay);
    }
  }, [isPlay]);

  /** Handle play & pause */
  useEffect(() => {
    if (music) {
      const iframe = document.querySelector("#player") as any;
      if (iframe) {
        if (isPlay) {
          iframe?.contentWindow.postMessage(
            '{"event":"command","func":"playVideo","args":""}',
            "*"
          );
        } else {
          iframe?.contentWindow.postMessage(
            '{"event":"command","func":"pauseVideo","args":""}',
            "*"
          );
        }
      }
    }
  }, [isPlay]);

  /** Creating and running YT player in back for each passed music */
  return (
    <Context.Provider value={{ isPlay, setIsPlay, music, setMusic, playStarted, setPlayStarted, musics, setMusics ,topMusics, setTopMusics}}>
      <div id="keydown_event_handler" onKeyDown={handleKeydown} tabIndex={0}>
        {children}
        {music && (
          <iframe
            id="player"
            style={{ display: "none" }}
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${music?.yt_id}?version=3&enablejsapi=1&autoplay=1&control=0`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; playsinline"
          ></iframe>
        )}
      </div>
    </Context.Provider>
  );
};

export default Container;
