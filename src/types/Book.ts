export type Book = {
  id?: string;
  title: string;
  author: string;
  publishedYear: string;
  language: string;
  image: string;
  level: "basic" | "intermediate" | "advanced";
  shortDescription: string;
  audiobookLink?: string;
  freeBookLink?: string;
  onlineBookLink?: string;
  bookLink?: string;
};
