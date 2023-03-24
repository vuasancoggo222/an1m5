import config from "./config";

export const getAnimeStreamFunction = (id: string) => config.get(`/watch/${id}`);
