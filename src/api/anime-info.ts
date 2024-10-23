import config from "./config";

export const getAnimeInfoFunction = (id : any) => config.get(`/anilist/info/${id}`)