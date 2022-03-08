import React, { useCallback, useEffect, useState } from "react";
import Controller from "../components/Controller";
import type { IMusic } from "../types/music";

export const Context = React.createContext({});

interface Props {
  children?: React.ReactNode;
}

const Container: React.FC<Props> = ({ children }) => {
  const [isPlay, setIsPlay] = useState<boolean>(false);
  const [music, setMusic] = useState<IMusic>();

  const handleKeydown = useCallback((event: any) => {
    if (event.code === 'Space') {
      setIsPlay(!isPlay);
    }
  }, [isPlay]);

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

  return (
    <Context.Provider value={{ isPlay, setIsPlay, music, setMusic }}>
      <div id="keydown_event_handler" onKeyDown={handleKeydown} tabIndex={0}>
        {children}
        {music && (
          <iframe
            id="player"
            style={{ display: "none" }}
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${music?.id}?version=3&enablejsapi=1&autoplay=1&control=0`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
        )}
        {music && <Controller />}
      </div>
    </Context.Provider>
  );
};

export default Container;
