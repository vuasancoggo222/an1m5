import config from "./mangaConfig"

export const getMangaDetail = (id: string,page:number = 1) => config.get(`/api/manga/${id}`);

export const getMangaDetailChapter = (id: string,chapterId : string) => config.get(`/api/manga/${id}/${chapterId}`)