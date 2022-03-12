import { findMusicById, findMusicsBySearch, findMusics } from "../../service/music";
import type { NextApiRequest, NextApiResponse } from "next";
import type { IMusic } from "../../types/music";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<IMusic[] | IMusic | null>
) {
  if (req.method === "GET") {
    const musicId = req.query?.id;
    const searchText = req.query?.search;
    if (musicId && typeof musicId === "string") {
      const music = findMusicById(musicId);
      return res.status(200).json(music);
    }
    if (searchText && typeof searchText === "string") {
      const musics = findMusicsBySearch(searchText);
      return res.status(200).json(musics);
    }
    const musics = findMusics();
    res.status(200).json(musics);
  }
}
