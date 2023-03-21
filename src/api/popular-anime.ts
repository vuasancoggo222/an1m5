import config from './config'

export const getPopularAnimeFunction = (page: number,perPage : number) => config.get(`/popular?page=${page}&perPage=${perPage}`)