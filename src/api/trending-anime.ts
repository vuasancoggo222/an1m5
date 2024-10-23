import config from "./config";

export const getTrendingAnimeFunction = (page:number,perPage:number) => config.get(`/anilist/trending?perPage=${perPage}&page=${page}`)