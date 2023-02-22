import { IMusic } from "./music";
import { SetStateAction } from 'react';

export type CardProps = {
  data: IMusic;
  active: boolean;
  removeCard: (id: string, action: 'right' | 'left') => void;
};

export type SwipeButtonProps = {
  exit: (value: SetStateAction<number>) => void;
  removeCard: (id: string, action: 'right' | 'left') => void;
  id: string;
  music: IMusic;
  user: string;
};