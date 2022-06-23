import {fetchWrapper} from '../helpers/fetch-wrapper';
import type { IMusic } from "../types/music";
import { API_URL } from "../constant/url";

export const songService = {
    songsList,
    addSong,
    randomSong,  
    topTen,
    findMusics,
    findMusicsBySearch,
    findMusicById,
    findMusicsByArtists,
};

function songsList(){
    return fetchWrapper.get(`${API_URL}/songs/songs`);
}

function addSong(song){
    return fetchWrapper.post(`${API_URL}/songs/newsong`, song);
}

function randomSong(){
    return fetchWrapper.get(`${API_URL}/songs/randomSong`);
}

function topTen(){
    return fetchWrapper.get(`${API_URL}/songs/topten`);
}


function findMusics(musics: IMusic[]): IMusic[] {
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

function findMusicsBySearch(keyword: string, musics :IMusic[] ): IMusic[] {
  const result: IMusic[] = [];
  const regex = new RegExp(keyword, "i");
  for (const music of musics) {
    if (regex.test(music.title)) result.push(music);
    else if (regex.test(music.author)) result.push(music);
  }
  return result;
}

function findMusicById(id: string, musics :IMusic[]): IMusic | null {
  for (const music of musics) {
    if (id === music.yt_id) return music;
  }
  return null;
}
function findMusicsByArtists(author: any){
  return fetchWrapper.post(`${API_URL}/songs/artistsongs`, {author: author});

}
