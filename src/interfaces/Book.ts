import { Genre } from './Genre';
import { Author } from './Author';

export interface Book {
    name: string;
    description: string;
    genres: Genre[];
    authors: Author[];
}
export {};