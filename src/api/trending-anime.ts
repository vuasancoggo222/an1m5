import config from "./config";

export const getTrendingAnimeFunction = (perPage:number) => config.get(`trending?perPage=${perPage}`)