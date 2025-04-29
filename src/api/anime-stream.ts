import config from "./config";

export const getAnimeStreamFunction = (id: string) => config.get(`/anilist/watch/${id}`);
