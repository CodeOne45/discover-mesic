import React, { useContext } from "react";
import classNames from "classnames";
import Link from "next/link";
import styles from "../styles/music-list-item-component.module.css";
import { IMusic } from "../types/music";
import { thumbnailLink } from "../constant/url";
import { Context } from "../store";

const MusicListItem: React.FC<IMusic> = ({ id, title }) => {
  const { music } = useContext(Context) as any;
  const currentId = music?.id;
  return (
    <Link href={`/music/${id}`}>
      <a>
        <div className={styles.item_wrapper}>
          <div
            className={classNames(
              styles.item_box,
              id === currentId ? styles.on_hover : ""
            )}
          >
            <img
              className={styles.thumbnail}
              src={thumbnailLink(id)}
              alt={title}
            />
            <div className={styles.icon}>
              <i className="fas fa-play-circle" />
            </div>
          </div>
          <h3 className={classNames(styles.title, "font-nunito")}>{title}</h3>
        </div>
      </a>
    </Link>
  );
};

export default MusicListItem;
