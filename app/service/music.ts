import musics from "../music.json";
import type { IMusic } from "../types/music";

export function findMusics(): IMusic[] {
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

export function findMusicsBySearch(keyword: string): IMusic[] {
  const result: IMusic[] = [];
  const regex = new RegExp(keyword, "i");
  for (const music of musics) {
    if (regex.test(music.title)) result.push(music);
  }
  return result;
}

export function findMusicById(id: string): IMusic | null {
  for (const music of musics) {
    if (id === music.id) return music;
  }
  return null;
}
