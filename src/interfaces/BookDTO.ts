import {GenreDTO} from './GenreDTO';
import {AuthorDTO} from './AuthorDTO';

export type BookDTO = {
    id: number | null;
    name: string;
    description: string;
    likeCount: number;
    genreDTOS: GenreDTO[];
    authorDTOS: AuthorDTO[];
    userInfoDTOS: any[];
    lastUpdatedBy: string | null;
    lastUpdateTime: string | null;
    createdBy: string | null;
    creationTime: string | null;
};