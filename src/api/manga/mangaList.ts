import config from "./mangaConfig";

export const getListManga = (
  page: number = 1,
  category: string | null = null,
  state: string | null = null,
  type: string | null = null
) =>
  config.get(`/api/mangaList`, {
    params: {
      category,
      page,
      type,
      state,
    },
  });
