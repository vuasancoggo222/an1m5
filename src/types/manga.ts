export interface IMangaList {
    mangaList: [
        {
            id: String,
            image: String,
            title: String,
            chapter: String,
            view: String,
            description: String
        }
    ],
    metaData: {
        totalStories: Number,
        totalPages: Number,
        type: [
            {
                id: String,
                type: String
            }
        ],
        state: [
            {
                id: String,
                type: String
            }
        ],
        category: [
            {
                id: String,
                type: String
            }
        ],
    }
}

interface ChapterList {
    createdAt: String,
    id: String,
    name: String,
    path: String,
    view: String,
}
export interface IMangaDetails {
    author: String,
    genres: String[],
    imageUrl: String,
    name: String,
    status: String,
    updated: String,
    view: String,
    chapterList: ChapterList[],
}