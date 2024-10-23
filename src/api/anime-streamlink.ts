import config from "./config";

export const getAnimeStreaming = (id : any) => config.get(`/anilist/watch/${id}`)