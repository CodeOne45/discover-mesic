export const thumbnailLink = (id: string) =>
  `https://img.youtube.com/vi/${id}/0.jpg`;

export const FRONTEND_URL =
  "https://discovermesic.com" || process.env.FRONTEND_URL;
//export const API_URL = process.env.BACKEND_PUBLIC_API_URL + "/api";
export const API_URL = process.env.BACKEND_PUBLIC_API_URL;
