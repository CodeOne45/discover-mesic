import React, { useState, useEffect, useContext } from 'react';
import { Context } from "../../store";
import styles from "../../styles/timeline.module.css";


const Timeline = () => {
  const { isPlay, music } = useContext(Context) as any;
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const iframe = document.querySelector("#player") as any;
    if (iframe) {
      const updateProgress = () => {
        if (iframe.contentWindow) {
          iframe.contentWindow.postMessage('{"event":"listening","func":"getCurrentTime","args":""}', '*');
          iframe.contentWindow.postMessage('{"event":"listening","func":"getDuration","args":""}', '*');
        }
      };

      const timer = setInterval(updateProgress, 1000);
      return () => clearInterval(timer);
    }
  }, [music]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data && typeof event.data === 'string') {
        try {
          const data = JSON.parse(event.data);
          if (data.event === 'infoDelivery') {
            if (data.info && data.info.currentTime) {
              setProgress(data.info.currentTime);
            }
            if (data.info && data.info.duration) {
              setDuration(data.info.duration);
            }
          }
        } catch (error) {
          console.error('Error parsing message:', error);
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    const iframe = document.querySelector("#player") as any;
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.postMessage(`{"event":"command","func":"seekTo","args":[${newTime},true]}`, '*');
    }
  };

  return (
    <div className={styles.timeline}>
      <input
        type="range"
        min="0"
        max={duration}
        value={progress}
        onChange={handleSeek}
        className={styles.progress_bar}
      />
      <div className={styles.time_display}>
        {formatTime(progress)} / {formatTime(duration)}
      </div>
    </div>
  );
};

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

export default Timeline;