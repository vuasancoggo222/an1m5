import axios from 'axios'

const config = axios.create({
    baseURL: 'https://api.consumet.org/meta/anilist/', 
  });

export default config ;