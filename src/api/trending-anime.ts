import config from "./config";

export const getTrendingAnimeFunction = (page:number,perPage:number) => config.get(`trending?perPage=${perPage}&page=${page}`)