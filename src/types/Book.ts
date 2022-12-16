export type Book = {
    id?: string,
    title: string,
    author: 'V.I. Lenin' | 'Karl Marx',
    publishedYear: string,
    image: string,
    level: "basic" | "intermediate" | "advanced",
    shortDescription: string,
    audiobookLink?: string,
    freeBookLink?: string,
    onlineBookLink?: string,
    bookLink?: string
}