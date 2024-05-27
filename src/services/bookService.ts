// src/services/bookService.ts
import axios, {AxiosResponse} from 'axios';
import {BookDTO} from '../interfaces/BookDTO';

export const addBook = async (book: BookDTO, apiEndpoint: string = 'http://127.0.0.0:8080/api/v1/book'): Promise<any> => {
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

export const getBookById = async (id: string, apiEndpoint: string = `http://127.0.0.0:8080/api/v1/book/${id}`): Promise<BookDTO> => {
    try {
        const response: AxiosResponse = await axios.get(apiEndpoint, {timeout: 5000});

        console.log('Server response:', response);

        if (response.status !== 200) {
            throw new Error(`Request failed with status code ${response.status}`);
        }

        const data: BookDTO = response.data;

        if (!data) {
            throw new Error('No data in response');
        }

        return data;
    } catch (error) {
        console.error(`An error occurred while fetching the book with id ${id}.`, error);
        throw error; // re-throw the error to be handled by the caller
    }
};

export const updateBook = async (id: string, book: BookDTO, apiEndpoint: string = `http://127.0.0.0:8080/api/v1/book/${id}`): Promise<BookDTO> => {
    try {
        const response: AxiosResponse = await axios.put(apiEndpoint, book, {timeout: 5000});

        console.log('Server response:', response);

        if (response.status !== 200) {
            throw new Error(`Request failed with status code ${response.status}`);
        }

        const data: BookDTO = response.data;

        if (!data) {
            throw new Error('No data in response');
        }

        return data;
    } catch (error) {
        console.error(`An error occurred while updating the book with id ${id}.`, error);
        throw error; // re-throw the error to be handled by the caller
    }
};

export const deleteBook = async (id: string, apiEndpoint: string = `http://127.0.0.0:8080/api/v1/book/${id}`): Promise<void> => {
    try {
        const response: AxiosResponse = await axios.delete(apiEndpoint, {timeout: 5000});

        console.log('Server response:', response);

        if (response.status !== 200) {
            throw new Error(`Request failed with status code ${response.status}`);
        }

    } catch (error) {
        console.error(`An error occurred while deleting the book with id ${id}.`, error);
        throw error; // re-throw the error to be handled by the caller
    }
};