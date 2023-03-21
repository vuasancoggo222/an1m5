import config from "./config";

export const searchFunction = (
    query : string,
    page : number,
    perPage : number,
    season : string,
    format : string,
    genres : string,
    year : string ) => {
        let url = `advanced-search?query=${query}&page=${page}&perPage=${perPage}`
        const optionalQuery:any = {season,format,genres,year}
        for(const query in optionalQuery){
            if(optionalQuery[query] !== ""){
                url = `${url}&${query}=${optionalQuery[query]}`
            }
        }
        return config.get(url)
    }