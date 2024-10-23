import config from './config'

export const getPopularAnimeFunction = (page: number,perPage : number) => config.get(`/anilist/popular?page=${page}&perPage=${perPage}`)