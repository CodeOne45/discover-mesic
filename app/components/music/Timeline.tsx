import React, { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../../store";

const Timeline: React.FC = () => {
  const { music } = useContext(Context) as any;
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time - minutes * 60);
    return `${minutes < 10 ? "0" + minutes : minutes}:${
      seconds < 10 ? "0" + seconds : seconds
    }`;
  };

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const player = new window.YT.Player(iframe, {
      events: {
        onReady: () => {
          setDuration(player.getDuration());
        },
        onStateChange: (event: any) => {
          if (event.data === window.YT.PlayerState.PLAYING) {
            setIsDragging(false);
          }
        },
      },
    });

    return () => {
      player.destroy();
    };
  }, [music]);

  function handleSliderChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = Number(event.target.value);
    setCurrentTime(value);
    setIsDragging(true);
  }

  function handleSliderDragStart() {
    setIsDragging(true);
  }

  function handleSliderDragEnd() {
    setIsDragging(false);
    const iframe = iframeRef.current;
    if (!iframe) return;
    iframe.contentWindow?.postMessage(
      `{"event":"command","func":"seekTo","args":[${currentTime}, true]}`,
      "*"
    );
  }

  return (
    <div className="timeline">
      <iframe
        ref={iframeRef}
        title="YouTube video player"
        src={`https://www.youtube.com/embed/${music?.yt_id}?enablejsapi=1`}
        allowFullScreen
      ></iframe>
      <div className="timeline__controls">
        <span className="timeline__time">{formatTime(currentTime)}</span>
        <input
          type="range"
          min={0}
          max={duration}
          value={isDragging ? currentTime : player?.getCurrentTime() || 0}
          onChange={handleSliderChange}
          onMouseDown={handleSliderDragStart}
          onMouseUp={handleSliderDragEnd}
        />
        <span className="timeline__time">{formatTime(duration)}</span>
      </div>
    </div>
  );
};

export default Timeline;
