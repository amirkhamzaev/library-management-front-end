import {BookDTO} from "./BookDTO";

export type GenreDTO = {
    id: number;
    name: string;
    description: string;
    bookDTOS: BookDTO[];
    lastUpdatedBy: string | null;
    lastUpdateTime: string | null;
    createdBy: string | null;
    creationTime: string | null;
};