import { SwipeButtonProps } from '../../types';
import FavoriteIcon from "@material-ui/icons/Favorite";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Controller from "./Controller";

import styles from "../../styles/music-list-item-component.module.css";

export default function SwipeButton({
  exit,
  removeCard,
  id,
}: SwipeButtonProps) {
  const handleSwipe = (action: 'left' | 'right') => {
    if (action === 'left') {
      exit(-200);
    } else if (action === 'right') {
      exit(200);
    }
    removeCard(id, action);
  };
  return (
    <div className="flex items-center space-x-8 absolute pt-[40rem] pl-[6.6rem]">
        <div className={styles.buttons_swipe}>
            <IconButton className={styles.close} onClick={() => handleSwipe('left')}>
                <CloseIcon className={styles.close_icon} fontSize="large" />
            </IconButton>
            <Controller />
            
            <IconButton
                className={styles.fav}
                onClick={() => {
                    handleSwipe('right');
                }}  
            >
                <FavoriteIcon fontSize="large" />
            </IconButton>
        </div>

      
    </div>
  );
}