export interface IMangaList {
    mangaList: [
        {
            id: string,
            image: string,
            title: string,
            chapter: string,
            view: string,
            description: string
        }
    ],
    metaData: {
        totalStories: Number,
        totalPages: Number,
        type: [
            {
                id: string,
                type: string
            }
        ],
        state: [
            {
                id: string,
                type: string
            }
        ],
        category: [
            {
                id: string,
                type: string
            }
        ],
    }
}

interface ChapterList {
    createdAt: string,
    id: string,
    name: string,
    path: string,
    view: string,
}
export interface IMangaDetails {
    author: string,
    genres: string[],
    imageUrl: string,
    name: string,
    status: string,
    updated: string,
    view: string,
    chapterList: ChapterList[],
}