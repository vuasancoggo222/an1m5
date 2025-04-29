import config from "./mangaConfig";

export const getListManga = ({
  page = 1,
  category = null,
  state = null,
  type = null,
}) =>
  config.get(`/api/mangaList`, {
    params: {
      category,
      page,
      type,
      state,
    },
  });
