import {BookDTO} from "./BookDTO";

export type AuthorDTO = {
    id: number;
    fullName: string;
    livedYears: string;
    aboutAuthor: string;
    bookDTOS: BookDTO[];
    lastUpdatedBy: string | null;
    lastUpdateTime: string | null;
    createdBy: string | null;
    creationTime: string | null;
};