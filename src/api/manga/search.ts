import config from "./mangaConfig";

export const searchManga = (keyword: string,page:number = 1) => config.get(` /api/search/${keyword}?page=${page}`);
