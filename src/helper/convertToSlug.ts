import slugify from "slugify";

export default function convertToSlug (string : string){
        return slugify(string,{
            lower: true,     
            locale: 'en',
            strict: true,
        })
}   