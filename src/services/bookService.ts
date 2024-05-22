// src/services/bookService.ts
import axios from 'axios';
import { Book } from '../interfaces/Book';

export const addBook = async (book: Book) => {
  try {
    const response = await axios.post('http://your-backend-url.com/books', book);
    return response.data;
  } catch (error) {
    console.error('An error occurred while saving the book.', error);
  }
};