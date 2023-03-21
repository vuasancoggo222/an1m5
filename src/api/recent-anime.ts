import config from "./config";

export const getRecentAnimeFunction = () =>  config.get(`recent-episodes?perPage=50`)