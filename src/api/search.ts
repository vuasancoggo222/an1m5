import config from "./config";

export const searchFunction = (
  query: string = "",
  page: number = 1,
  perPage: number = 20,
  season: string|any = undefined,
  format: string|any = undefined,
  genres: string|any = undefined,
  year: string|any = undefined
) => {

  
  let url = `/anilist/advanced-search`;
  const params: any = { season, format, genres, year, query, page, perPage };

  return config.get(url, {
    params,
  });
};
export const searchAnimeByGenresFunction = (genres: any, perPage: number) =>
  config.get(
    `/anilist/advanced-search?genres=["${genres}"]&perPage=${perPage}`
  );
