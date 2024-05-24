// src/services/bookService.ts
import axios, {AxiosResponse} from 'axios';
import {Book} from '../interfaces/Book';

export const addBook = async (book: Book, apiEndpoint: string = 'http://127.0.0.0:8080/api/v1/book'): Promise<any> => {
    try {
        const response: AxiosResponse = await axios.post(apiEndpoint, book, {timeout: 5000});

        console.log('Server response:', response);

        if (response.status !== 200 && response.status !== 201) {
            throw new Error(`Request failed with status code ${response.status}`);
        }

        const data = response.data;

        if (!data) {
            throw new Error('No data in response');
        }

        return data;
    } catch (error) {
        console.error('An error occurred while saving the book.', error);
        throw error; // re-throw the error to be handled by the caller
    }
};