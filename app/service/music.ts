//import musics from "../music.json";
//import { useContext } from "react";

import type { IMusic } from "../types/music";
//import { Context } from "../store";

//const {musics} = useContext(Context) as any;

export function findMusics(musics: IMusic[]): IMusic[] {
  const length = musics.length;
  let newMusics = musics;
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length; j++) {
      if (i == j) continue;
      const random = Math.round(Math.random());
      if (random) {
        const musicTemp = newMusics[i];
        newMusics[i] = newMusics[j];
        newMusics[j] = musicTemp;
      }
    }
  }
  return newMusics;
}

export function findMusicsBySearch(keyword: string, musics :IMusic[] ): IMusic[] {
  const result: IMusic[] = [];
  const regex = new RegExp(keyword, "i");
  for (const music of musics) {
    if (regex.test(music.title)) result.push(music);
  }
  return result;
}

export function findMusicById(id: string, musics :IMusic[]): IMusic | null {
  for (const music of musics) {
    if (id === music.yt_id) return music;
  }
  return null;
}
