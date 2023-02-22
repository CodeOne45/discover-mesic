import { CardProps } from '../../types';
import {
  motion,
  PanInfo,
  useMotionValue,
  useTransform,
} from 'framer-motion';
import SwipeButton from './SwipeButton';
import { thumbnailLink } from "../../constant/url";
import Image from 'next/image';
import { useState } from 'react';
import styles from "../../styles/music-list-item-component.module.css";

const MusicCard = ({ data, active, removeCard }: CardProps) => {
  const [exitX, setExitX] = useState(0);

  const x = useMotionValue(0);
  const input = [-200, 0, 200];
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -125, 0, 125, 200], [0, 1, 1, 1, 0]);

  const dragEnd = (
    e: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    if (info.offset.x > 100) {
      setExitX(200);
      removeCard(data._id, 'right');
    } else if (info.offset.x < -100) {
      setExitX(-200);
      removeCard(data._id, 'left');
    }
  };

  const classNames = `absolute h-[380px] w-[300px] ml-[5rem] mt-[15rem] dark:bg-black shadow-xl rounded-2xl flex flex-col justify-center items-center cursor-grab`;


  return (
    <>
      {active ? (
        <motion.div
            drag={true}
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            onDragEnd={dragEnd}
            initial={{ scale: 0.95, opacity: 0.5 }}
            animate={{
                scale: 1.05,
                opacity: 1,
            }}
            style={{ x, rotate, opacity }}
            transition={{ type: 'tween', duration: 0.3, ease: 'easeIn' }}
            whileDrag={{ cursor: 'grabbing' }}
            exit={{ x: exitX }}
            className={classNames}
        >
          <div className="scrollCards absolute m-auto h-[calc(100%-20px)] w-[calc(100%-20px)] rounded-[8px]">
            <div className="relative h-[269px] w-full overflow-hidden rounded-[8px]">
              <Image
                src={thumbnailLink(data.yt_id)}
                layout="fill"
                alt=""
                style={{
                  objectFit: 'cover',
                }}
              />
            </div>
            <h2 className={styles.title}>
                {data.title.replace(new RegExp(`\\s*-?\\s*${data.author}\\s*`, "i"), "").replace('-', '').replace('Audio', '').replace('Official Music', '').replace('(Official )', '').replace('(Visualizer)', '')}
            </h2>
            <h3  className={styles.author}>
                <a href={`/artist/${data.author}`}>{data.author}</a>
            </h3>
          </div>
        </motion.div>
      ) : null}
        <SwipeButton exit={setExitX} removeCard={removeCard} id={data._id} music={data} />
    </>
  );
};

export default MusicCard;